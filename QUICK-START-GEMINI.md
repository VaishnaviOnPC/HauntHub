# ⚡ Quick Start with Gemini AI

## 5-Minute Setup

### 1. Get API Key (1 minute)
Go to: https://makersuite.google.com/app/apikey
Click "Create API Key" → Copy it

### 2. Install Backend (1 minute)
```bash
cd HauntHub/backend
npm install
```

### 3. Add API Key (1 minute)
Create `backend/.env`:
```
GEMINI_API_KEY=paste_your_key_here
PORT=3001
```

### 4. Start Backend (30 seconds)
```bash
npm start
```

### 5. Enable in Frontend (30 seconds)
Create `frontend/.env`:
```
VITE_USE_GEMINI=true
```

### 6. Restart Frontend (1 minute)
```bash
cd ../frontend
npm run dev
```

## ✅ Done!

Now try asking the Ghost Butler ANYTHING:
- "Tell me about quantum physics"
- "What's your favorite color?"
- "Can you help me with my homework?"
- "Write me a haiku about ghosts"

The Ghost Butler will respond to everything while staying in character! 👻🤖

---

## 🔄 To Switch Back to Pattern Matching

Edit `frontend/.env`:
```
VITE_USE_GEMINI=false
```

Refresh browser. Done!

---

## 💡 Pro Tip

Run both servers at once from the main folder:
```bash
cd HauntHub
npm run dev
```

This starts both frontend AND backend automatically!

---

**That's it! You now have AI-powered Ghost Butler!** 🎉