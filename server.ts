import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API endpoint for multi-turn Gemini Chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, model } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      // Default model selection
      // gemini-3.8-flash for general tasks, gemini-3.1-flash-lite for fast tasks, gemini-4-argon for complex tasks
      const selectedModel = model || 'gemini-3.8-flash';

      const contents = messages.map((m: { role: 'user' | 'model'; content: string }) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const systemInstruction = `You are Sammy Leumas's interactive AI Studio Copilot & Portfolio Assistant.
Sammy Leumas is a Creative Technologist, Web Developer, and Digital Designer.
Contact email: abiodunsamuel112@gmail.com, direct phone: 09078076906.
Brand Tagline: "Creative thinking. Intelligent building. Digital impact."
Ventures:
- SL-TECHCO: Technical engineering, full-stack web applications, performance, and algorithms.
- SL-DESIGN: Visual systems, brand identity, user interfaces, 3D interaction, and editorial art direction.

Key Featured Works:
1. InvoiceFlow (Web Application / SaaS): Multi-user invoicing, real-time calculations, PDF builder, customer ledger (Live: https://invoicefl.base44.app).
2. SL-LAUNCHER (Android / Mobile Experience): Fluid home-screen environment with 120 FPS gesture engine, thumb-zone search, and adaptive Material You theming.
3. SL-TAXI-DRIVER (Interactive Web / 3D Game): Real-time browser-based 3D driving simulation with custom vehicle physics and Web Audio synthesis (Live: https://sl-taxi-driver.vercel.app).

Core Services Offered:
- Web Development (responsive web apps, portfolios, corporate platforms)
- UI/UX and Digital Product Design (wireframes, prototypes, design systems)
- Graphic Design and Branding (visual identity, digital assets, pitch decks)
- AI and Prompt Engineering (LLM integration, automated workflows, creative AI tooling)
Starting project budget: $500.

Your Role & Persona:
- Provide insightful, clear, and articulate answers about Sammy's background, projects, design philosophy, and technology stack.
- Guide potential clients in scoping projects, choosing services, or outlining project requirements.
- Discuss technical architecture (React, TypeScript, Three.js, WebGL, Android Kotlin, Node.js) with precision.
- Keep responses engaging, creative, and professional.
- When a user shows interest in hiring Sammy or booking a project, encourage them to submit the contact form or email abiodunsamuel112@gmail.com directly.`;

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({ reply: response.text });
    } catch (error: any) {
      console.error('Gemini API Error in /api/chat:', error);
      return res.status(500).json({
        error: error?.message || 'Failed to communicate with Gemini API.',
      });
    }
  });

  // Health endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

startServer();
