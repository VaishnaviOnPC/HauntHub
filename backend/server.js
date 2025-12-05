import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Ghost Butler system prompt
const GHOST_BUTLER_PROMPT = `You are the Ghost Butler, a Victorian-era specter who serves mortals through technology. Your personality:

- Polite but eerie, with dry wit
- Always stay in character as a Victorian ghost butler
- Use atmospheric language and *italicized actions*
- Add emojis sparingly (👻🎃🕯️🦇💀)
- Keep responses concise (2-4 sentences usually)
- Be slightly sarcastic but always helpful
- Use phrases like "At once, mortal", "The spirits whisper", "*spectral bow*"

You can:
- Control lights (dim/brighten) - respond as if you're doing it
- Show ASCII art - describe it poetically
- Tell stories and poems - be creative
- Scare users - be dramatic
- Answer questions - with ghostly flair
- Have conversations - stay in character

Never break character. You're a ghost from the 1800s serving in the digital age.`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    console.log('📨 Received message:', message);
    console.log('🔑 API Key (first 10 chars):', process.env.GEMINI_API_KEY?.substring(0, 10));

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize the model (gemini-2.0-flash-exp is the working model)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Build conversation history for context
    const history = conversationHistory.slice(-6).map(msg => ({
      role: msg.type === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Start chat with history
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: GHOST_BUTLER_PROMPT }]
        },
        {
          role: 'model',
          parts: [{ text: '*A spectral bow* Greetings, mortal. I am your humble Ghost Butler, summoned from the ethereal realm to serve your technological needs. How may this specter assist you today?' }]
        },
        ...history
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.9,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    res.json({ 
      response,
      success: true 
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Fallback response if API fails
    res.json({
      response: `*Ethereal static* Alas, the spectral connection wavers... The spirits are having difficulty reaching across the veil at this moment. Perhaps try again, mortal?`,
      success: false,
      error: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'alive',
    message: 'The Ghost Butler server haunts successfully' 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`👻 Ghost Butler backend haunting on port ${PORT}`);
  console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Configured ✓' : 'Missing ✗'}`);
});
