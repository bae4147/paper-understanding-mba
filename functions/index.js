const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const pdfParse = require("pdf-parse");
const { GoogleAuth } = require("google-auth-library");
const nodemailer = require("nodemailer");
const { fetch: undiciFetch, Agent } = require("undici");

// TTS agent with no timeout — OpenAI TTS generates audio before sending headers
const ttsAgent = new Agent({ headersTimeout: 0, bodyTimeout: 0 });

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

// Define API keys as secrets
const openaiApiKey = defineSecret("OPENAI_API_KEY");
const geminiApiKey = defineSecret("GEMINI_API_KEY");
const gmailUser = defineSecret("GMAIL_USER");
const gmailAppPassword = defineSecret("GMAIL_APP_PASSWORD");

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Admin email for error notifications
const ADMIN_EMAIL = "sh.bae@snu.ac.kr, osu.reading@gmail.com";

// Helper function to send error notification email
async function sendErrorNotification(subject, errorDetails, userEmail = null) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser.value(),
        pass: gmailAppPassword.value()
      }
    });

    const timestamp = new Date().toISOString();
    const mailOptions = {
      from: `"MBA Reading Experiment" <${gmailUser.value()}>`,
      to: ADMIN_EMAIL,
      subject: `[Error] ${subject}`,
      html: `
        <h2>Error Notification</h2>
        <p><strong>Time:</strong> ${timestamp}</p>
        ${userEmail ? `<p><strong>User:</strong> ${userEmail}</p>` : ""}
        <h3>Error Details:</h3>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${errorDetails}</pre>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Error notification sent to ${ADMIN_EMAIL}`);
  } catch (emailError) {
    console.error("Failed to send error notification:", emailError);
  }
}

// Helper function for API calls with retry logic (for rate limits)
async function fetchWithRetry(url, options, maxRetries = 3, baseDelayMs = 5000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.ok) {
      return response;
    }

    // Check for rate limit error (429)
    if (response.status === 429 && attempt < maxRetries) {
      const delayMs = baseDelayMs * Math.pow(2, attempt - 1); // Exponential backoff
      console.log(`Rate limit hit. Retrying in ${delayMs / 1000}s (attempt ${attempt}/${maxRetries})...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
      continue;
    }

    // For other errors or final attempt, return the response
    return response;
  }
}

// OpenAI Chat Completion Proxy
exports.chatCompletion = onRequest(
  {
    secrets: [openaiApiKey]
  },
  async (req, res) => {
    // Set CORS headers for all responses
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight
    if (req.method === "OPTIONS") {
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
    secrets: [openaiApiKey, gmailUser, gmailAppPassword],
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
      const { pdfBase64, duration = 5, userEmail = null } = req.body;

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

      // Log full script for debugging
      console.log("=== FULL SCRIPT START ===");
      console.log(script.substring(0, 2000));
      console.log("=== FULL SCRIPT END ===");

      for (const line of lines) {
        // More robust regex: handles **Alex:**, (Alex):, Alex:, etc.
        // Strips markdown bold, parentheses, and leading whitespace
        const cleanLine = line.replace(/^\s*\**\s*\(?\s*/, '').replace(/\)?\s*\**\s*/, '');

        const alexMatch = cleanLine.match(/^(?:Alex|HOST\s*A)[\s:]+(.+)/i);
        const jordanMatch = cleanLine.match(/^(?:Jordan|HOST\s*B)[\s:]+(.+)/i);

        if (alexMatch) {
          console.log(`[ALEX] Found: "${alexMatch[1].substring(0, 50)}..."`);
          segments.push({ speaker: "alex", text: alexMatch[1].trim(), voice: "onyx" });  // Deep male voice
        } else if (jordanMatch) {
          console.log(`[JORDAN] Found: "${jordanMatch[1].substring(0, 50)}..."`);
          segments.push({ speaker: "jordan", text: jordanMatch[1].trim(), voice: "shimmer" });  // Female voice
        }
      }

      console.log(`Parsed ${segments.length} dialogue segments (Alex: ${segments.filter(s => s.speaker === 'alex').length}, Jordan: ${segments.filter(s => s.speaker === 'jordan').length})`);

      if (segments.length === 0) {
        // Fallback: treat entire script as single segment
        console.log("WARNING: No segments parsed! Using fallback.");
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

        const ttsResponse = await undiciFetch("https://api.openai.com/v1/audio/speech", {
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
          }),
          dispatcher: ttsAgent
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
      await sendErrorNotification(
        "Podcast Generation - Critical Error",
        `Error: ${error.message}\n\nStack: ${error.stack}`,
        userEmail
      );
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  }
);

// Generate Infographic from PDF using Gemini
exports.generateInfographic = onRequest(
  {
    cors: true,
    secrets: [geminiApiKey, gmailUser, gmailAppPassword],
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
      const { pdfBase64, userEmail = null } = req.body;

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

      const prompt = `Create a professional infographic that visually summarizes this research paper.

Design requirements:
- Clean, modern layout with clear visual hierarchy
- Title prominently displayed at the top
- Freely summarize the key points of the paper in a visually engaging way
- Use icons, diagrams, and visual elements to illustrate important concepts
- Professional color scheme
- Ensure all text is readable and well-organized
- Size: suitable for display on screen (portrait/vertical orientation preferred)
- Style: Academic, clean, suitable for conference presentation

Paper content to visualize:
${paperText.substring(0, 15000)}

Generate a visually appealing, informative infographic now.`;

      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${geminiApiKey.value()}`,
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
              responseModalities: ["image", "text"]
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
      await sendErrorNotification(
        "Infographic Generation - Critical Error",
        `Error: ${error.message}\n\nStack: ${error.stack}`,
        userEmail
      );
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  }
);

// Generate Video from PDF using Veo 2 with narration
exports.generateVideo = onRequest(
  {
    cors: true,
    secrets: [openaiApiKey],
    timeoutSeconds: 540, // 9 minutes (video generation can take time)
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
      const { pdfBase64 } = req.body;

      if (!pdfBase64) {
        res.status(400).json({ error: "pdfBase64 is required" });
        return;
      }

      console.log("Starting video generation with narration...");

      // Step 1: Parse PDF to extract text
      console.log("Step 1: Parsing PDF...");
      const pdfBuffer = Buffer.from(pdfBase64, "base64");
      const pdfData = await pdfParse(pdfBuffer);
      const paperText = pdfData.text;
      console.log(`Extracted ${paperText.length} characters from PDF`);

      // Step 2: Generate video prompt AND narration script with GPT-4o
      console.log("Step 2: Generating video prompt and narration script...");
      const promptGenerationRequest = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiApiKey.value()}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are an expert at creating video content. You need to create TWO things:
1. A video generation prompt for an 8-second educational video
2. A narration script that takes exactly 8 seconds to read (about 20-25 words)

The video and narration should complement each other - the visuals should match what's being narrated.

Return your response in this exact JSON format:
{
  "videoPrompt": "detailed cinematic prompt for video generation",
  "narrationScript": "short 8-second narration script (20-25 words)"
}`
            },
            {
              role: "user",
              content: `Based on this research paper, create a video prompt and narration script that summarizes the key finding.

Paper content:
${paperText.substring(0, 10000)}

Return ONLY the JSON, nothing else.`
            }
          ],
          max_tokens: 800,
          temperature: 0.7
        })
      });

      if (!promptGenerationRequest.ok) {
        const error = await promptGenerationRequest.text();
        console.error("GPT prompt generation error:", error);
        res.status(500).json({ error: "Failed to generate prompts", details: error });
        return;
      }

      const promptData = await promptGenerationRequest.json();
      let content = promptData.choices[0].message.content.trim();
      // Remove markdown code blocks if present
      content = content.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();

      const { videoPrompt, narrationScript } = JSON.parse(content);
      console.log("Generated video prompt:", videoPrompt);
      console.log("Generated narration:", narrationScript);

      // Step 3: Generate narration audio with TTS (run in parallel with video)
      console.log("Step 3: Starting narration generation...");
      const ttsPromise = fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiApiKey.value()}`
        },
        body: JSON.stringify({
          model: "tts-1-hd",
          input: narrationScript,
          voice: "onyx", // Professional, warm voice
          response_format: "mp3"
        })
      });

      // Step 4: Get Google Cloud access token
      console.log("Step 4: Getting access token...");
      const auth = new GoogleAuth({
        scopes: ["https://www.googleapis.com/auth/cloud-platform"]
      });
      const client = await auth.getClient();
      const accessToken = await client.getAccessToken();

      // Step 5: Call Veo 2 API
      console.log("Step 5: Calling Veo 2 API...");
      const projectId = process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT;

      const veoResponse = await fetch(
        `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/veo-2.0-generate-001:predictLongRunning`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            instances: [{
              prompt: videoPrompt
            }],
            parameters: {
              aspectRatio: "16:9",
              sampleCount: 1
            }
          })
        }
      );

      if (!veoResponse.ok) {
        const error = await veoResponse.text();
        console.error("Veo 2 API error:", error);
        res.status(500).json({ error: "Failed to start video generation", details: error });
        return;
      }

      const veoData = await veoResponse.json();
      console.log("Veo 2 response:", JSON.stringify(veoData));

      const operationName = veoData.name;

      if (!operationName) {
        console.error("No operation name in response:", veoData);
        res.status(500).json({ error: "No operation started", details: veoData });
        return;
      }

      // Step 6: Wait for TTS to complete
      console.log("Step 6: Waiting for narration audio...");
      const ttsResponse = await ttsPromise;
      let audioBase64 = null;

      if (ttsResponse.ok) {
        const audioBuffer = await ttsResponse.arrayBuffer();
        audioBase64 = Buffer.from(audioBuffer).toString("base64");
        console.log("Narration audio generated successfully");
      } else {
        console.error("TTS failed:", await ttsResponse.text());
        // Continue without narration
      }

      // Step 7: Poll for video completion using fetchPredictOperation
      console.log("Step 7: Polling for video completion...");
      let videoResult = null;
      const maxAttempts = 60; // 5 minutes with 5-second intervals

      for (let i = 0; i < maxAttempts; i++) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

        const statusResponse = await fetch(
          `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/veo-2.0-generate-001:fetchPredictOperation`,
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${accessToken.token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              operationName: operationName
            })
          }
        );

        if (!statusResponse.ok) {
          console.error("Status check failed:", await statusResponse.text());
          continue;
        }

        const statusData = await statusResponse.json();
        console.log(`Poll ${i + 1}: done=${statusData.done}`);

        if (statusData.done) {
          if (statusData.error) {
            console.error("Operation failed:", statusData.error);
            res.status(500).json({ error: "Video generation failed", details: statusData.error });
            return;
          }
          videoResult = statusData.response;
          break;
        }
      }

      if (!videoResult) {
        res.status(500).json({ error: "Video generation timed out" });
        return;
      }

      // Step 8: Extract video from result
      console.log("Step 8: Extracting video...");
      let videoBase64 = null;
      let videoUri = null;

      // Veo 2 returns videos array with bytesBase64Encoded (direct video data)
      if (videoResult.videos && videoResult.videos[0]) {
        if (videoResult.videos[0].bytesBase64Encoded) {
          videoBase64 = videoResult.videos[0].bytesBase64Encoded;
          console.log("Video returned as base64, length:", videoBase64.length);
        } else if (videoResult.videos[0].gcsUri) {
          videoUri = videoResult.videos[0].gcsUri;
          console.log("Video returned as GCS URI:", videoUri);
        }
      } else if (videoResult.predictions && videoResult.predictions[0]) {
        if (videoResult.predictions[0].bytesBase64Encoded) {
          videoBase64 = videoResult.predictions[0].bytesBase64Encoded;
        } else if (videoResult.predictions[0].videoUri) {
          videoUri = videoResult.predictions[0].videoUri;
        }
      }

      if (!videoBase64 && !videoUri) {
        console.error("No video in response:", JSON.stringify(videoResult).substring(0, 1000));
        res.status(500).json({ error: "No video generated", details: "Could not extract video from response" });
        return;
      }

      console.log("Video generation complete!");

      res.set(corsHeaders);
      res.json({
        success: true,
        videoBase64: videoBase64,
        videoUri: videoUri,
        audioBase64: audioBase64,
        narrationScript: narrationScript,
        prompt: videoPrompt
      });

    } catch (error) {
      console.error("Video generation error:", error);
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  }
);

// Generate Video Slideshow (1-minute whiteboard-style video with narration)
// Pipeline: Gemini Brain → Imagen 3 → TTS → Video Assembly
exports.generateVideoSlideshow = onRequest(
  {
    cors: true,
    secrets: [openaiApiKey, geminiApiKey, gmailUser, gmailAppPassword],
    timeoutSeconds: 540, // 9 minutes
    memory: "2GiB"
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
      const { pdfBase64, userEmail } = req.body;

      if (!pdfBase64) {
        res.status(400).json({ error: "pdfBase64 is required" });
        return;
      }

      console.log("Starting video slideshow generation...");

      // Step 1: Parse PDF to extract text
      console.log("Step 1: Parsing PDF...");
      const pdfBuffer = Buffer.from(pdfBase64, "base64");
      const pdfData = await pdfParse(pdfBuffer);
      const paperText = pdfData.text;
      console.log(`Extracted ${paperText.length} characters from PDF`);

      // Step 2: Generate scene breakdown with Gemini Brain
      console.log("Step 2: Generating scene breakdown with Gemini...");
      const brainPrompt = `# Role
You are a video content architect specializing in educational whiteboard-style explainer videos, specifically mimicking the "NotebookLM" visual aesthetic.

# Goal
Based on the provided article, create a JSON structure for a **4.5-minute video** (EXACTLY 30 scenes, each 9 seconds). You MUST generate EXACTLY 30 scenes.

# Output Format (return ONLY valid JSON, no markdown):
{
  "title": "Video title",
  "scenes": [
    {
      "scene_number": 1,
      "duration_sec": 9,
      "narration": "Conversational, engaging, and paced for a 9-second scene. (2-3 sentences, about 25-30 words)",
      "visual_prompt": "Detailed prompt for 'Nano Banana' image generation focusing on minimalist line art.",
      "key_text_elements": ["Main Keyword", "Statistic"],
      "layout_description": "Description of where icons and text should be placed on the 16:9 canvas"
    }
  ]
}

# Narration Style (OpenAI Shimmer)
- Single female voice: Warm, professional, yet deeply conversational (like a friendly expert).
- Structure (for EXACTLY 30 scenes):
  1. Hook (Scenes 1-2): Problem or surprising fact to grab attention.
  2. Background & Context (Scenes 3-7): Set up the problem space and why it matters.
  3. Main Content - Part 1 (Scenes 8-13): First major theme/finding from the article.
  4. Main Content - Part 2 (Scenes 14-19): Second major theme/finding from the article.
  5. Main Content - Part 3 (Scenes 20-25): Third major theme/implications.
  6. Conclusion & Call to Action (Scenes 26-30): Summary, key takeaways, and thought-provoking closing.
- Pacing: Avoid rushing. Use 25-30 words per 9-second scene.

# Visual Style (NotebookLM Aesthetic)
- Background: Solid cream/off-white (#F9F7F2). Clean, no patterns.
- Art: Hand-drawn black ink line art (#1A1A1A). Sketch-like, slightly imperfect lines.
- Accent: Strategic use of Orange (#FF8C00) and Yellow (#FFD700) for highlights, circles, or arrows.
- Text: Hand-written style typography embedded within the illustration.
- Composition: Minimalist, plenty of white space (negative space). No 3D, no gradients, no photorealism.

# Article:
${paperText.substring(0, 25000)}

Return ONLY the JSON, no markdown code blocks.`;

      const brainResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey.value()}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: brainPrompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 16000,
              response_mime_type: "application/json"
            }
          })
        }
      );

      if (!brainResponse.ok) {
        const error = await brainResponse.text();
        console.error("Gemini Brain error:", error);
        res.status(500).json({ error: "Failed to generate scene breakdown", details: error });
        return;
      }

      const brainData = await brainResponse.json();
      let scenesContent = brainData.candidates[0].content.parts[0].text;
      // Clean up markdown if present
      scenesContent = scenesContent.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();

      let scenesJson;
      try {
        scenesJson = JSON.parse(scenesContent);
      } catch (parseError) {
        console.error("Failed to parse Gemini JSON (first attempt):", parseError.message);
        console.error("Raw content:", scenesContent.substring(0, 500));
        // Retry once with lower temperature
        const parseRetryResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey.value()}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: brainPrompt }] }],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 16000,
                response_mime_type: "application/json"
              }
            })
          }
        );
        if (!parseRetryResponse.ok) {
          res.status(500).json({ error: "Failed to generate valid scene breakdown JSON" });
          return;
        }
        const parseRetryData = await parseRetryResponse.json();
        let parseRetryContent = parseRetryData.candidates[0].content.parts[0].text;
        parseRetryContent = parseRetryContent.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        scenesJson = JSON.parse(parseRetryContent);
        console.log("JSON parse succeeded on retry");
      }
      let scenes = scenesJson.scenes;
      console.log(`Generated ${scenes.length} scenes (first attempt)`);

      // Limit to exactly 30 scenes
      if (scenes.length > 30) {
        scenes = scenes.slice(0, 30);
        console.log("Trimmed to 30 scenes");
      } else if (scenes.length < 30) {
        console.log("Not enough scenes, regenerating with explicit count...");
        const retryPrompt = `${brainPrompt}

CRITICAL: You generated only ${scenes.length} scenes last time. This is NOT ENOUGH.
I need EXACTLY 30 scenes for a 4.5-minute video. Each scene is 9 seconds.
Do NOT generate fewer than 30 scenes. Count your scenes before responding.`;

        const retryResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey.value()}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: retryPrompt }] }],
              generationConfig: {
                temperature: 0.5,
                maxOutputTokens: 16000,
                response_mime_type: "application/json"
              }
            })
          }
        );

        if (retryResponse.ok) {
          const retryData = await retryResponse.json();
          let retryContent = retryData.candidates[0].content.parts[0].text;
          retryContent = retryContent.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
          let retryJson;
          try {
            retryJson = JSON.parse(retryContent);
          } catch (e) {
            console.error("Failed to parse Gemini JSON on scene count retry:", e.message);
            retryJson = null;
          }
          if (retryJson && retryJson.scenes && retryJson.scenes.length > scenes.length) {
            scenes = retryJson.scenes;
            scenesJson = retryJson;
            console.log(`Retry generated ${scenes.length} scenes`);
          }
        }
        // Limit to 30 after retry as well
        if (scenes.length > 30) {
          scenes = scenes.slice(0, 30);
          console.log("Trimmed to 30 scenes after retry");
        }
      }

      console.log(`Final scene count: ${scenes.length}`);

      // Step 3: Generate images for each scene with Nano Banana (Gemini native image generation)
      // Process in batches of 10 to avoid rate limiting (10 requests per minute)
      console.log("Step 3: Generating images with Nano Banana (in batches)...");

      const generateImageForScene = async (scene, index) => {
        const imagePrompt = `NotebookLM-style educational whiteboard illustration. 16:9 aspect ratio.

Style specifications:
- Background: Solid cream/off-white (#F9F7F2), clean with no patterns
- Art: Hand-drawn black ink line art (#1A1A1A), sketch-like with slightly imperfect lines
- Accents: Orange (#FF8C00) and Yellow (#FFD700) for highlights, circles, arrows
- Composition: Minimalist with plenty of white space. No 3D, no gradients, no photorealism.

Embedded text (hand-written style): ${scene.key_text_elements.join(", ")}

Layout: ${scene.layout_description || "Centered composition with balanced elements"}

${scene.visual_prompt}`;

        console.log(`Generating image for scene ${index + 1}...`);

        const nanoBananaResponse = await fetchWithRetry(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${geminiApiKey.value()}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: imagePrompt }] }],
              generationConfig: {
                responseModalities: ["image", "text"]
              }
            })
          },
          3, // maxRetries
          5000 // baseDelayMs
        );

        if (!nanoBananaResponse.ok) {
          const errorText = await nanoBananaResponse.text();
          console.error(`Image generation error for scene ${index + 1}:`, errorText);
          return null;
        }

        const nanoBananaData = await nanoBananaResponse.json();

        // Extract image from Gemini response
        const parts = nanoBananaData.candidates?.[0]?.content?.parts || [];
        const imagePart = parts.find(p => p.inlineData?.mimeType?.startsWith("image/"));

        if (imagePart) {
          return {
            sceneNumber: scene.scene_number,
            imageBase64: imagePart.inlineData.data,
            duration: scene.duration_sec,
            narration: scene.narration
          };
        }
        return null;
      };

      // Process in batches of 10 with 30 second delay between batches
      // (500 RPM quota - 30s delay provides safety margin for 25 concurrent users)
      const BATCH_SIZE = 10;
      const BATCH_DELAY_MS = 30000; // 30 seconds (balanced speed & safety)
      const allImageResults = [];

      for (let i = 0; i < scenes.length; i += BATCH_SIZE) {
        const batch = scenes.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(scenes.length / BATCH_SIZE);

        console.log(`Processing batch ${batchNum}/${totalBatches} (scenes ${i + 1}-${i + batch.length})...`);

        const batchPromises = batch.map((scene, batchIndex) =>
          generateImageForScene(scene, i + batchIndex)
        );

        const batchResults = await Promise.all(batchPromises);
        allImageResults.push(...batchResults);

        console.log(`Batch ${batchNum} complete. ${allImageResults.filter(r => r !== null).length} images so far.`);

        // Wait before next batch (except for the last batch)
        if (i + BATCH_SIZE < scenes.length) {
          console.log(`Waiting ${BATCH_DELAY_MS / 1000} seconds before next batch to avoid rate limit...`);
          await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
        }
      }

      const validImages = allImageResults.filter(img => img !== null);
      console.log(`Generated ${validImages.length} images total`);

      if (validImages.length === 0) {
        await sendErrorNotification(
          "Video Slideshow - No Images Generated",
          `All ${scenes.length} image generation attempts failed.\nPaper text length: ${paperText.length} chars`
        );
        res.status(500).json({ error: "Failed to generate any images" });
        return;
      }

      // Step 4: Generate TTS narration for each scene
      console.log("Step 4: Generating TTS narration...");
      const ttsPromises = validImages.map(async (scene, index) => {
        const ttsResponse = await fetch("https://api.openai.com/v1/audio/speech", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiApiKey.value()}`
          },
          body: JSON.stringify({
            model: "tts-1-hd",
            input: scene.narration,
            voice: "shimmer", // Female narrator
            response_format: "mp3"
          })
        });

        if (!ttsResponse.ok) {
          console.error(`TTS error for scene ${index + 1}:`, await ttsResponse.text());
          return null;
        }

        const audioBuffer = await ttsResponse.arrayBuffer();
        return {
          ...scene,
          audioBase64: Buffer.from(audioBuffer).toString("base64")
        };
      });

      const scenesWithAudio = await Promise.all(ttsPromises);
      const completeScenes = scenesWithAudio.filter(s => s !== null && s.audioBase64);
      console.log(`Generated ${completeScenes.length} complete scenes with audio`);

      // Step 5: Save to Firebase Storage and return URL (response too large to return directly)
      console.log("Step 5: Saving to Firebase Storage...");

      const resultData = {
        success: true,
        title: scenesJson.title,
        scenes: completeScenes.map(scene => ({
          sceneNumber: scene.sceneNumber,
          imageBase64: scene.imageBase64,
          audioBase64: scene.audioBase64,
          duration: scene.duration,
          narration: scene.narration
        })),
        totalScenes: completeScenes.length,
        generatedAt: new Date().toISOString()
      };

      // Generate a unique filename
      const filename = `video-slideshow/${Date.now()}_${Math.random().toString(36).substring(7)}.json`;
      const bucket = admin.storage().bucket();
      const file = bucket.file(filename);

      await file.save(JSON.stringify(resultData), {
        contentType: 'application/json',
        metadata: {
          cacheControl: 'public, max-age=3600'
        }
      });

      // Make file publicly accessible
      await file.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      console.log("Video slideshow saved to:", publicUrl);
      console.log("Video slideshow generation complete!");

      res.set(corsHeaders);
      res.json({
        success: true,
        dataUrl: publicUrl,
        totalScenes: completeScenes.length
      });

    } catch (error) {
      console.error("Video slideshow generation error:", error);
      await sendErrorNotification(
        "Video Slideshow - Critical Error",
        `Error: ${error.message}\n\nStack: ${error.stack}`,
        userEmail
      );
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  }
);

// Send Login Email (custom email instead of Firebase's built-in)
exports.sendLoginEmail = onRequest(
  {
    cors: true,
    secrets: [gmailUser, gmailAppPassword],
    timeoutSeconds: 30,
    memory: "256MiB"
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
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: "email is required" });
        return;
      }

      console.log(`Generating sign-in link for ${email}`);

      // Generate sign-in link using Firebase Admin SDK
      const actionCodeSettings = {
        url: 'https://bae4147.github.io/paper-understanding-mba/login.html',
        handleCodeInApp: true
      };

      const signInLink = await admin.auth().generateSignInWithEmailLink(
        email,
        actionCodeSettings
      );

      console.log("Sign-in link generated successfully");

      // Create email transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser.value(),
          pass: gmailAppPassword.value()
        }
      });

      // Build email HTML content
      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .button { display: inline-block; background: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .button:hover { background: #1d4ed8; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <h1>📖 Sign in to Reading Assignment</h1>

  <p>Hello,</p>

  <p>Click the button below to sign in to your reading assignment:</p>

  <a href="${signInLink}" class="button">Sign In</a>

  <p>Or copy and paste this link into your browser:</p>
  <p style="word-break: break-all; color: #2563eb; font-size: 14px;">${signInLink}</p>

  <p><strong>Note:</strong> This link will expire in 1 hour and can only be used once.</p>

  <div class="footer">
    <p>If you didn't request this email, you can safely ignore it.</p>
  </div>
</body>
</html>
      `;

      // Send email
      const mailOptions = {
        from: `"MBA Reading Assignment" <${gmailUser.value()}>`,
        to: email,
        subject: "Sign in to Reading Assignment",
        html: emailHtml
      };

      await transporter.sendMail(mailOptions);

      console.log(`✅ Login email sent to ${email}`);

      res.set(corsHeaders);
      res.json({
        success: true,
        message: `Email sent to ${email}`
      });

    } catch (error) {
      console.error("Login email error:", error);
      res.status(500).json({ error: "Failed to send email", message: error.message });
    }
  }
);

// Send Completion Email with student's responses
exports.sendCompletionEmail = onRequest(
  {
    cors: true,
    secrets: [gmailUser, gmailAppPassword],
    timeoutSeconds: 30,
    memory: "256MiB"
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
      const { uid, sessionId } = req.body;

      if (!uid || !sessionId) {
        res.status(400).json({ error: "uid and sessionId are required" });
        return;
      }

      console.log(`Sending completion email for user ${uid}, session ${sessionId}`);

      // Fetch user profile and session data from Firestore
      const db = admin.firestore();

      const [userDoc, sessionDoc] = await Promise.all([
        db.collection("users").doc(uid).get(),
        db.collection("users").doc(uid).collection("sessions").doc(sessionId).get()
      ]);

      if (!userDoc.exists || !sessionDoc.exists) {
        res.status(404).json({ error: "User or session not found" });
        return;
      }

      const userData = userDoc.data();
      const sessionData = sessionDoc.data();

      const recipientEmail = userData.email;
      const recipientName = userData.fullName || "Student";
      const paperTitle = sessionData.paperMetadata?.title || "Your Reading Assignment";

      // Extract post-task responses
      const postTask = sessionData.postTask || {};
      const contextTranslation = postTask.contextTranslation || [];
      const strategies = postTask.strategies || [];
      const newStrategyConfidence = postTask.newStrategyConfidence;
      const implementationLikelihood = postTask.implementationLikelihood;

      // Create email transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser.value(),
          pass: gmailAppPassword.value()
        }
      });

      // Build email HTML content
      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    h1 { color: #2563eb; }
    h2 { color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-top: 30px; }
    .response-box { background: #f9fafb; border-left: 4px solid #2563eb; padding: 15px; margin: 10px 0; }
    .rating { background: #ecfdf5; padding: 10px 15px; border-radius: 8px; display: inline-block; margin: 5px 0; }
    ul { padding-left: 20px; }
    li { margin: 8px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <h1>📚 Your Reading Assignment Summary</h1>

  <p>Hi ${recipientName},</p>

  <p>Thank you for completing the reading assignment! Here's a summary of your responses for your records.</p>

  <p><strong>Paper:</strong> ${paperTitle}</p>
  <p><strong>Completed:</strong> ${new Date().toLocaleString("en-US", { timeZone: "America/New_York", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true })} (ET)</p>

  <h2>Q1. Context Differences</h2>
  <p><em>Key differences between the research context and your own situation:</em></p>
  ${contextTranslation.length > 0 ? `
    <ul>
      ${contextTranslation.map(item => `<li class="response-box">${item}</li>`).join("")}
    </ul>
  ` : "<p><em>No responses recorded</em></p>"}

  <h2>Q2. Practical Takeaways</h2>
  <p><em>What you could realistically implement or test in your workplace:</em></p>
  ${strategies.length > 0 ? `
    <ul>
      ${strategies.map((item, idx) => `<li class="response-box"><strong>${idx + 1}.</strong> ${item}</li>`).join("")}
    </ul>
  ` : "<p><em>No responses recorded</em></p>"}

  <h2>Self-Assessment</h2>
  ${newStrategyConfidence ? `
    <p><strong>Confidence in takeaways being effective:</strong></p>
    <div class="rating">⭐ ${newStrategyConfidence} / 7</div>
  ` : ""}
  ${implementationLikelihood ? `
    <p><strong>Likelihood to implement changes:</strong></p>
    <div class="rating">📊 ${implementationLikelihood} / 7</div>
  ` : ""}

  <div class="footer">
    <p>This email was automatically generated as part of your MBA reading assignment.</p>
    <p>If you have any questions, please contact your instructor.</p>
  </div>
</body>
</html>
      `;

      // Send email
      const mailOptions = {
        from: `"MBA Reading Assignment" <${gmailUser.value()}>`,
        to: recipientEmail,
        subject: `Your Reading Assignment Summary: ${paperTitle}`,
        html: emailHtml
      };

      await transporter.sendMail(mailOptions);

      console.log(`✅ Completion email sent to ${recipientEmail}`);

      res.set(corsHeaders);
      res.json({
        success: true,
        message: `Email sent to ${recipientEmail}`
      });

    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ error: "Failed to send email", message: error.message });
    }
  }
);
