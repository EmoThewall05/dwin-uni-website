import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Initialize Gemini client using modern @google/genai SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Robust model fallback cascade to handle 503 high demand or 429 rate limit errors gracefully
async function generateContentWithFallback(params: {
  contents: any;
  config?: any;
}) {
  const models = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
  let lastError: any = null;

  for (const model of models) {
    try {
      console.log(`[Gemini Cascade] Attempting generation with model: ${model}`);
      const response = await ai.models.generateContent({
        model: model,
        contents: params.contents,
        config: params.config,
      });
      console.log(`[Gemini Cascade] Success with model: ${model}`);
      return response;
    } catch (err: any) {
      console.warn(`[Gemini Cascade] Model ${model} failed:`, err.message || err);
      lastError = err;
    }
  }
  throw lastError || new Error("All models in the cascade failed to generate content.");
}

// API Routes
// 1. Emowall AI 2.0 Generator
app.post('/api/emowall-ai', async (req, res) => {
  const { prompt, mode } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await generateContentWithFallback({
      contents: `Generate visual wallpaper parameters and an artistic description for the following input.
Prompt: "${prompt}"
Selected Art Mode: "${mode || 'Synth'}"

You must respond with a strictly formatted JSON object matching this schema:
{
  "cssGradient": "A Tailwind CSS background style or raw CSS linear-gradient/radial-gradient string that beautifully matches this visual description. Use high-contrast modern dark-theme neon cyber colors.",
  "philosophy": "A short, beautiful, empathetic, or poetic quote describing the emotional mood of this visual creation.",
  "particlesColor": "A single hex color code for glowing particles on the wall.",
  "density": 100,
  "styleAnalysis": "A short, 2-sentence description of the visual style and lighting used."
}

Do not include any markdown block wraps (like \`\`\`json) in your final response. Return ONLY raw JSON.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text from Gemini");
    }

    const data = JSON.parse(text.trim());
    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Emowall AI generation failed:", error);
    // Fallback local visual parameter if Gemini fails or API key is not configured
    res.json({
      success: false,
      error: error.message,
      data: {
        cssGradient: "linear-gradient(135deg, #4c1d95 0%, #0c0a09 50%, #06b6d4 100%)",
        philosophy: "In the depth of the cosmic network, your imagination shines like a lone nebula. (Offline mode active)",
        particlesColor: "#06b6d4",
        density: 80,
        styleAnalysis: "A rich ambient deep indigo and cyan vector mesh, optimized for low-fatigue high-contrast dark environments."
      }
    });
  }
});

// 2. Emo AI Pro - Sentiment Analyzer Dashboard
app.post('/api/emo-ai-pro', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text to analyze is required" });
  }

  try {
    const response = await generateContentWithFallback({
      contents: `Analyze the sentiment of the following message in detail.
Message: "${text}"

You must respond with a strictly formatted JSON object matching this schema:
{
  "sentiment": "A primary emotion label, e.g., Joy, Serenity, Melancholy, Anxiety, Confidence, Resentment",
  "valence": "A floating point number between -1.0 (most negative) and 1.0 (most positive)",
  "arousal": "A floating point number between 0.0 (very low energy) and 1.0 (extremely high energy)",
  "confidence": "A percentage score (e.g. '92%') representing model confidence",
  "empatheticResponse": "An extremely warm, human, empathetic reply that directly addresses the user's current feeling, tailored for a wellness dialog system.",
  "colorAccent": "A hex color code representing this emotion (e.g., #10B981 for Joy, #8B5CF6 for Melancholy, #EF4444 for Anger, etc.)"
}

Do not include any markdown block wraps (like \`\`\`json) in your final response. Return ONLY raw JSON.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const resText = response.text;
    if (!resText) {
      throw new Error("No response text from Gemini");
    }

    const data = JSON.parse(resText.trim());
    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Emo AI Pro sentiment analysis failed:", error);
    // Fallback sentiment if offline
    res.json({
      success: false,
      error: error.message,
      data: {
        sentiment: "Curiosity",
        valence: 0.6,
        arousal: 0.5,
        confidence: "85%",
        empatheticResponse: "I see a deep spark of creative exploration in your thoughts. Let's build together!",
        colorAccent: "#8B5CF6"
      }
    });
  }
});

// 3. Project AI Assistant (Interactive Chat Helper)
app.post('/api/project-assistant', async (req, res) => {
  const { projectId, projectName, projectTagline, projectDescription, projectFeatures, projectTechStack, message, history, edgeWorkerUrl, useEdgeWorker } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // If the user requested to route via Cloudflare Edge Worker
  if (useEdgeWorker && edgeWorkerUrl) {
    try {
      console.log(`Forwarding query to Cloudflare Edge Worker: ${edgeWorkerUrl}`);
      const workerResponse = await fetch(edgeWorkerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          projectId,
          projectName,
          projectTagline,
          projectDescription,
          projectFeatures,
          projectTechStack,
          message,
          history
        }),
        signal: AbortSignal.timeout(6000) // 6 seconds timeout
      });

      if (workerResponse.ok) {
        const data = await workerResponse.json() as any;
        const reply = data.reply || data.response || data.message || (typeof data === 'string' ? data : null);
        if (reply) {
          return res.json({ success: true, reply, source: "Cloudflare Edge Worker" });
        }
      }
      console.warn("Cloudflare Worker did not return a standard reply JSON, falling back to Gemini...");
    } catch (workerErr: any) {
      console.error("Cloudflare Worker relay failed, falling back to local Gemini client:", workerErr.message);
    }
  }

  try {
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    const contextPrompt = `You are a highly capable AI Assistant integrated into the dashboard for the project "${projectName}" (Tagline: ${projectTagline}).
Project ID: ${projectId}
Description: ${projectDescription}
Key Features:
${(projectFeatures || []).map((f: string) => `- ${f}`).join('\n')}
Tech Stack: ${(projectTechStack || []).join(', ')}

Instructions:
1. Provide precise, expert-level technical and conceptual details about ${projectName}.
2. Use bullet points and clean paragraphs for readability.
3. Be inspiring, friendly, and direct. Keep responses concise and engaging.
4. If a user asks questions outside this project's scope, answer briefly but guide them back to exploring ${projectName}'s features.

User message: ${message}`;

    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: contextPrompt }] }
    ];

    const response = await generateContentWithFallback({
      contents: contents,
    });

    const reply = response.text || "I apologize, but I could not compute a response right now. Please try again.";
    res.json({ success: true, reply });
  } catch (error: any) {
    console.error("Project Assistant query failed:", error);
    res.json({
      success: false,
      reply: `[OFFLINE CORE] I received your message: "${message}". Currently my connection to the Gemini cognitive model is simulated, but here's some info: "${projectName}" is powered by ${projectTechStack?.join(', ') || 'cutting-edge Tech Stack'} and implements core features like ${projectFeatures?.[0] || 'smart integrations'}. Let me know if you want to know more!`
    });
  }
});

// Integration with Vite dev server
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  // For production: serve static assets from 'dist'
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
