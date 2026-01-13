const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const pdfParse = require("pdf-parse");

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

// Define API keys as secrets
const openaiApiKey = defineSecret("OPENAI_API_KEY");
const geminiApiKey = defineSecret("GEMINI_API_KEY");

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// OpenAI Chat Completion Proxy
exports.chatCompletion = onRequest(
  {
    cors: true,
    secrets: [openaiApiKey]
  },
  async (req, res) => {
    // Handle preflight
    if (req.method === "OPTIONS") {
      res.set(corsHeaders);
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const { messages, model = "gpt-4o-mini", max_tokens = 200, temperature = 0.7 } = req.body;

      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "messages array is required" });
        return;
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiApiKey.value()}`
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens,
          temperature
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("OpenAI API error:", error);
        res.status(response.status).json({ error: "OpenAI API error", details: error });
        return;
      }

      const data = await response.json();
      res.set(corsHeaders);
      res.json(data);

    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  }
);

// Generate Podcast from PDF
// This function takes PDF content, generates a script, and returns TTS audio
exports.generatePodcast = onRequest(
  {
    cors: true,
    secrets: [openaiApiKey],
    timeoutSeconds: 540, // 9 minutes
    memory: "1GiB"
  },
  async (req, res) => {
    // Handle preflight
    if (req.method === "OPTIONS") {
      res.set(corsHeaders);
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const { pdfBase64, duration = 5 } = req.body;

      if (!pdfBase64) {
        res.status(400).json({ error: "pdfBase64 is required" });
        return;
      }

      console.log("Starting podcast generation...");

      // Step 1: Parse PDF
      console.log("Step 1: Parsing PDF...");
      const pdfBuffer = Buffer.from(pdfBase64, "base64");
      const pdfData = await pdfParse(pdfBuffer);
      const paperText = pdfData.text;
      console.log(`Extracted ${paperText.length} characters from PDF`);

      // Step 2: Generate podcast script with GPT-4o
      console.log("Step 2: Generating podcast script...");
      const scriptPrompt = `You are a podcast script writer. Create a conversational podcast script based on this academic paper.

The podcast should be approximately ${duration} minutes long when read aloud (about ${duration * 150} words).

Format the script as a dialogue between two hosts:
- Host A (Alex): Curious, asks good questions, represents the listener
- Host B (Jordan): Expert, explains concepts clearly, knows the paper well

Rules:
- Start with a brief intro about the paper topic
- Cover the main findings and methodology
- Make it engaging and accessible to a general audience
- End with key takeaways
- Use natural conversational language
- Mark each line with the speaker name like "Alex:" or "Jordan:"

Paper content:
${paperText.substring(0, 30000)}

Generate the podcast script now:`;

      const scriptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiApiKey.value()}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "You are a professional podcast script writer." },
            { role: "user", content: scriptPrompt }
          ],
          max_tokens: 4000,
          temperature: 0.7
        })
      });

      if (!scriptResponse.ok) {
        const error = await scriptResponse.text();
        console.error("Script generation error:", error);
        res.status(500).json({ error: "Failed to generate script", details: error });
        return;
      }

      const scriptData = await scriptResponse.json();
      const script = scriptData.choices[0].message.content;
      console.log("Script generated successfully");

      // Step 3: Parse script into segments
      console.log("Step 3: Parsing script into segments...");
      const lines = script.split("\n").filter(line => line.trim());
      const segments = [];

      for (const line of lines) {
        const alexMatch = line.match(/^(?:Alex|HOST A|Host A)[:\s]+(.+)/i);
        const jordanMatch = line.match(/^(?:Jordan|HOST B|Host B)[:\s]+(.+)/i);

        if (alexMatch) {
          segments.push({ speaker: "alex", text: alexMatch[1].trim(), voice: "alloy" });
        } else if (jordanMatch) {
          segments.push({ speaker: "jordan", text: jordanMatch[1].trim(), voice: "nova" });
        }
      }

      console.log(`Parsed ${segments.length} dialogue segments`);

      if (segments.length === 0) {
        // Fallback: treat entire script as single segment
        segments.push({ speaker: "jordan", text: script.substring(0, 4000), voice: "nova" });
      }

      // Step 4: Generate TTS for each segment and collect as base64
      console.log("Step 4: Generating TTS audio...");
      const audioChunks = [];

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        console.log(`Generating audio for segment ${i + 1}/${segments.length}...`);

        // Limit text length for TTS (max 4096 chars)
        const text = segment.text.substring(0, 4000);

        const ttsResponse = await fetch("https://api.openai.com/v1/audio/speech", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiApiKey.value()}`
          },
          body: JSON.stringify({
            model: "tts-1",
            input: text,
            voice: segment.voice,
            response_format: "mp3"
          })
        });

        if (!ttsResponse.ok) {
          const error = await ttsResponse.text();
          console.error(`TTS error for segment ${i + 1}:`, error);
          continue; // Skip failed segments
        }

        const audioBuffer = await ttsResponse.arrayBuffer();
        audioChunks.push(Buffer.from(audioBuffer));
      }

      console.log(`Generated ${audioChunks.length} audio chunks`);

      // Step 5: Concatenate audio chunks (simple MP3 concatenation)
      // Note: This is a basic concatenation. For production, use proper audio merging
      const combinedAudio = Buffer.concat(audioChunks);
      const audioBase64 = combinedAudio.toString("base64");

      console.log("Podcast generation complete!");

      res.set(corsHeaders);
      res.json({
        success: true,
        audioBase64: audioBase64,
        audioType: "audio/mpeg",
        script: script,
        segmentCount: segments.length
      });

    } catch (error) {
      console.error("Podcast generation error:", error);
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  }
);

// Generate Infographic from PDF using Gemini
exports.generateInfographic = onRequest(
  {
    cors: true,
    secrets: [geminiApiKey],
    timeoutSeconds: 120,
    memory: "512MiB"
  },
  async (req, res) => {
    // Handle preflight
    if (req.method === "OPTIONS") {
      res.set(corsHeaders);
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const { pdfBase64 } = req.body;

      if (!pdfBase64) {
        res.status(400).json({ error: "pdfBase64 is required" });
        return;
      }

      console.log("Starting infographic generation...");

      // Step 1: Parse PDF to extract text
      console.log("Step 1: Parsing PDF...");
      const pdfBuffer = Buffer.from(pdfBase64, "base64");
      const pdfData = await pdfParse(pdfBuffer);
      const paperText = pdfData.text;
      console.log(`Extracted ${paperText.length} characters from PDF`);

      // Step 2: Generate infographic with Gemini
      console.log("Step 2: Generating infographic with Gemini...");

      const prompt = `Create a professional academic infographic that visually summarizes this research paper.

Design requirements:
- Clean, modern layout with clear visual hierarchy
- Title prominently displayed at the top
- Organize into clear sections: Research Question, Methods, Key Findings, Implications
- Use simple icons and diagrams to illustrate concepts
- Include visual representations of key statistics or data
- Professional color scheme (blues, teals, grays)
- Make it suitable for academic presentation or poster session
- Ensure all text is readable and well-organized
- Balance between visual elements and text
- Size: suitable for display on screen (landscape orientation preferred)

Paper content to visualize:
${paperText.substring(0, 15000)}

Generate a visually appealing, informative infographic now.`;

      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey.value()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              responseModalities: ["image", "text"],
              responseMimeType: "image/png"
            }
          })
        }
      );

      if (!geminiResponse.ok) {
        const error = await geminiResponse.text();
        console.error("Gemini API error:", error);
        res.status(500).json({ error: "Failed to generate infographic", details: error });
        return;
      }

      const geminiData = await geminiResponse.json();
      console.log("Gemini response received");

      // Extract image from response
      let imageBase64 = null;
      let mimeType = "image/png";

      if (geminiData.candidates && geminiData.candidates[0]) {
        const parts = geminiData.candidates[0].content?.parts || [];
        for (const part of parts) {
          if (part.inlineData) {
            imageBase64 = part.inlineData.data;
            mimeType = part.inlineData.mimeType || "image/png";
            break;
          }
        }
      }

      if (!imageBase64) {
        console.error("No image in Gemini response:", JSON.stringify(geminiData));
        res.status(500).json({ error: "No image generated", details: "Gemini did not return an image" });
        return;
      }

      console.log("Infographic generation complete!");

      res.set(corsHeaders);
      res.json({
        success: true,
        imageBase64: imageBase64,
        mimeType: mimeType
      });

    } catch (error) {
      console.error("Infographic generation error:", error);
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  }
);
