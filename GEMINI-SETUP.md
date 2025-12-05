# 🤖 Gemini AI Integration Guide

## Overview

HauntHub can now use Google's Gemini AI to respond to **ANY command** while maintaining the Ghost Butler's spooky persona!

### Two Modes Available:

1. **Pattern Matching Mode** (Default) - No API key needed
2. **Gemini AI Mode** - Responds intelligently to anything!

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

**It's FREE!** Gemini has a generous free tier.

### Step 2: Install Backend Dependencies

```bash
cd HauntHub/backend
npm install
```

### Step 3: Configure API Key

Create `.env` file in the `backend` folder:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your key:
```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3001
```

### Step 4: Start the Backend

```bash
npm start
```

You should see:
```
👻 Ghost Butler backend haunting on port 3001
🔑 Gemini API Key: Configured ✓
```

### Step 5: Enable Gemini in Frontend

Create `.env` file in the `frontend` folder:

```bash
cd ../frontend
cp .env.example .env
```

Edit `.env`:
```
VITE_USE_GEMINI=true
VITE_API_URL=http://localhost:3001
```

### Step 6: Restart Frontend

Stop the frontend (Ctrl+C) and restart:
```bash
npm run dev
```

### Step 7: Test It!

Open http://localhost:3000 and try:
```
"Tell me about quantum physics"
"What's your favorite movie?"
"Can you help me with my homework?"
"Make me a sandwich"
```

The Ghost Butler will respond to ANYTHING while staying in character! 👻

---

## 🎭 How It Works

### With Gemini AI:
1. You type a message
2. Frontend sends it to backend
3. Backend asks Gemini with Ghost Butler persona
4. Gemini responds in character
5. Response shown in UI

### System Prompt:
The backend tells Gemini to be the Ghost Butler with:
- Victorian-era language
- Polite but eerie tone
- Atmospheric descriptions
- *Italicized actions*
- Spooky emojis

### Conversation Memory:
- Keeps last 6 messages for context
- Gemini remembers what you talked about
- More natural conversations

---

## 💰 Cost & Limits

### Gemini Free Tier:
- **60 requests per minute**
- **1,500 requests per day**
- **Completely FREE**

For HauntHub usage, this is more than enough!

### If You Exceed Limits:
The app automatically falls back to pattern matching mode.

---

## 🔄 Switching Modes

### Use Gemini AI:
```env
# frontend/.env
VITE_USE_GEMINI=true
```

### Use Pattern Matching:
```env
# frontend/.env
VITE_USE_GEMINI=false
```

No need to restart - just refresh the browser!

---

## 🎯 What Works Better with Gemini

### Pattern Matching (Current):
✅ Fast responses
✅ No API costs
✅ Works offline
❌ Limited to predefined commands
❌ Can't have real conversations

### Gemini AI:
✅ Responds to ANYTHING
✅ Real conversations
✅ Contextual understanding
✅ Creative responses
❌ Requires internet
❌ Slight delay (~1-2 seconds)

---

## 🛠️ Running Both Servers

### Terminal 1 - Backend:
```bash
cd HauntHub/backend
npm start
```

### Terminal 2 - Frontend:
```bash
cd HauntHub/frontend
npm run dev
```

Or use the main package.json:
```bash
cd HauntHub
npm run dev:backend    # Terminal 1
npm run dev:frontend   # Terminal 2
```

---

## 🧪 Testing

### Test Backend Health:
```bash
curl http://localhost:3001/api/health
```

Should return:
```json
{
  "status": "alive",
  "message": "The Ghost Butler server haunts successfully"
}
```

### Test Chat Endpoint:
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello Ghost!"}'
```

---

## 🐛 Troubleshooting

### "Gemini API unavailable"
- Check backend is running on port 3001
- Verify API key in `backend/.env`
- Check internet connection

### "API Key Missing"
- Make sure `.env` file exists in `backend` folder
- Check the key is correct (no quotes needed)
- Restart the backend server

### Backend Won't Start
```bash
cd backend
npm install
npm start
```

### Frontend Can't Connect
- Check `VITE_USE_GEMINI=true` in `frontend/.env`
- Verify backend is running
- Check browser console for errors

---

## 🎨 Customizing the Persona

Edit `backend/server.js` to change the Ghost Butler's personality:

```javascript
const GHOST_BUTLER_PROMPT = `You are the Ghost Butler...
// Modify this to change behavior!
`;
```

You can make it:
- More scary
- More funny
- More formal
- More casual
- Different character entirely!

---

## 📊 Comparison

| Feature | Pattern Matching | Gemini AI |
|---------|-----------------|-----------|
| Setup Time | 0 minutes | 5 minutes |
| API Key | Not needed | Free from Google |
| Response Speed | Instant | 1-2 seconds |
| Understands Anything | ❌ | ✅ |
| Conversations | ❌ | ✅ |
| Works Offline | ✅ | ❌ |
| Cost | Free | Free (with limits) |
| Best For | Demos | Real usage |

---

## 🎉 Example Conversations

### With Pattern Matching:
```
You: "What's the weather?"
Ghost: *Peers through the ethereal veil* The weather in 
       the spirit realm? Perpetually foggy...
```

### With Gemini AI:
```
You: "What's the weather?"
Ghost: *Gazes through spectral windows* Ah, you wish to 
       know of the mortal realm's atmospheric conditions? 
       Alas, I cannot perceive the weather from this 
       digital domain, but I sense a chill in the air 
       wherever you may be, mortal. Perfect for haunting! 🌫️

You: "Can you check for me?"
Ghost: *Adjusts spectral monocle* I'm afraid my ethereal 
       abilities don't extend to weather forecasting in 
       your specific location, dear mortal. However, I 
       recommend looking out your window or consulting 
       one of those modern weather applications. Even 
       ghosts must admit technology has its uses! ⛈️
```

See the difference? Gemini understands context and has real conversations!

---

## 🔐 Security Notes

- Never commit `.env` files to git
- Keep your API key private
- The backend validates all requests
- CORS is configured for localhost only

---

## 🚀 Production Deployment

For deploying to production:

1. Use environment variables (not .env files)
2. Add rate limiting
3. Implement authentication
4. Use HTTPS
5. Set proper CORS origins

---

## 📝 Summary

**Without Gemini:** Great for demos, fast, works offline
**With Gemini:** Responds to anything, real conversations, slight delay

Both modes maintain the Ghost Butler's spooky persona perfectly!

Choose based on your needs:
- **Demo/Hackathon:** Pattern matching is perfect
- **Real Usage:** Gemini AI is amazing

---

**Happy haunting with AI!** 👻🤖✨