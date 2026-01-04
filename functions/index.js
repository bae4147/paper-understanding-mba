const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

// Define the OpenAI API key as a secret
const openaiApiKey = defineSecret("OPENAI_API_KEY");

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
