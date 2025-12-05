# 🤖 Kiro AI Integration Guide

## Current Setup: Standalone Demo Mode

The HauntHub frontend currently runs in **standalone demo mode** with:
- ✅ Hardcoded pattern-matching responses
- ✅ Visual light effects (now working!)
- ✅ Predefined commands and Easter eggs
- ❌ No real AI/LLM integration
- ❌ No actual MCP tool calls

## Why Lights Now Work! 🎉

I just fixed the lights! Now when you say:
- **"Ghost, dim the lights"** → Screen dims to 25% brightness
- **"Ghost, brighten the lights"** → Screen brightens to 85%
- **"Ghost, turn lights off"** → Complete darkness (0%)
- **"Ghost, turn lights on"** → Normal brightness (75%)

The entire app's brightness changes with a smooth 1-second transition!

## Two Integration Options

### Option 1: Keep Standalone (Current - No API Key Needed)

**Pros:**
- ✅ Works immediately, no setup
- ✅ No API costs
- ✅ Fast responses
- ✅ Perfect for demos and hackathons
- ✅ Visual effects work (lights, scares, etc.)

**Cons:**
- ❌ Can only respond to predefined patterns
- ❌ Can't handle creative/unexpected questions
- ❌ Doesn't actually call MCP tools (just simulates them)

**Best for:** Demos, presentations, hackathons, showcasing UI/UX

---

### Option 2: Connect to Kiro's AI (Real Integration)

To make the Ghost Butler truly intelligent and use the actual MCP tools:

#### A. Using Kiro's Built-in AI (Recommended)

Kiro IDE has its own AI agent that can:
- Use the MCP tools you've configured
- Respond to any command naturally
- Maintain the Ghost Butler persona via steering docs

**How to use:**
1. Open Kiro IDE
2. Configure the MCP tools (already done in `.kiro/settings/mcp.json`)
3. Chat with Kiro directly - it will use the Ghost Butler persona!
4. The steering document ensures consistent spooky responses

**No API key needed** - Kiro handles the AI backend!

#### B. Connect Frontend to Kiro's API

If you want the web UI to talk to Kiro's AI:

```javascript
// In App.jsx, replace processCommand with:
const processCommand = async (userMessage) => {
  setIsProcessing(true);
  
  const userMsg = {
    id: Date.now(),
    type: 'user',
    content: userMessage,
    timestamp: new Date()
  };
  
  setMessages(prev => [...prev, userMsg]);
  
  try {
    // Call Kiro's API (if exposed)
    const response = await fetch('http://localhost:KIRO_PORT/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        context: 'ghost-butler'
      })
    });
    
    const data = await response.json();
    
    const ghostMsg = {
      id: Date.now() + 1,
      type: 'ghost',
      content: data.response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, ghostMsg]);
  } catch (error) {
    console.error('Error:', error);
    // Fallback to pattern matching
    const ghostMsg = {
      id: Date.now() + 1,
      type: 'ghost',
      content: generateGhostResponse(userMessage),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, ghostMsg]);
  }
  
  setIsProcessing(false);
};
```

**Note:** Kiro's API endpoint depends on your setup. Check Kiro's documentation.

#### C. Use External LLM (OpenAI, Anthropic, etc.)

If you want to use an external LLM:

**Requirements:**
- API key from OpenAI, Anthropic, or other provider
- Backend server to handle API calls (don't expose keys in frontend!)

**Example with OpenAI:**

1. Create a backend server:

```javascript
// backend/server.js
import express from 'express';
import OpenAI from 'openai';

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are the Ghost Butler, a Victorian-era specter...
          [Include full persona from steering doc]`
        },
        {
          role: "user",
          content: req.body.message
        }
      ]
    });
    
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Backend running on port 3001'));
```

2. Update frontend to call your backend (see code above)

**Costs:** ~$0.01-0.03 per conversation with GPT-4

---

## Recommended Approach for Your Use Case

### For Hackathon/Demo: **Keep Current Setup** ✅
- Lights now work visually!
- All effects work perfectly
- No API costs or setup
- Impressive visual experience
- Add more patterns as needed

### For Production App: **Kiro Integration**
- Use Kiro's built-in AI
- Real MCP tool integration
- Natural language understanding
- No external API costs

### For Standalone Product: **External LLM**
- Full control over AI behavior
- Works without Kiro
- Requires API key and backend

---

## Current Capabilities (No API Needed!)

The app already responds intelligently to:

### Commands That Work:
- ✅ "dim the lights" / "brighten the lights" (NOW WITH VISUAL EFFECT!)
- ✅ "show me a pumpkin" / "ascii art"
- ✅ "scare me" (with jump scare animation)
- ✅ "tell me a joke"
- ✅ "who are you"
- ✅ "tell me a story"
- ✅ "what time is it"
- ✅ "what's the weather"
- ✅ "thank you"
- ✅ "hello"

### What It Can't Do (Without LLM):
- ❌ Answer unexpected questions
- ❌ Have contextual conversations
- ❌ Learn from previous messages
- ❌ Actually call MCP tools (just simulates)

---

## Adding More Commands (No API Needed)

To add new commands to the current setup:

```javascript
// In generateGhostResponse function:
if (cmd.includes('your_keyword')) {
  // Add any visual effects
  setLightLevel(50); // or other state changes
  
  return `Your spooky response here with *actions* and emojis! 👻`;
}
```

---

## Summary

**Current Status:** 
- 🎉 Lights now work with visual dimming/brightening!
- ✅ Perfect for demos without any API keys
- ✅ All visual effects functional
- ✅ Responds to ~15 different command patterns

**To Get Real AI:**
- Use Kiro IDE directly (it already has the Ghost Butler persona!)
- Or add OpenAI/Anthropic API (requires key + backend)

**My Recommendation:** 
Keep the current setup for your hackathon - it's impressive, works perfectly, and needs no API keys! The visual light effects now work, making it feel much more real. 👻✨