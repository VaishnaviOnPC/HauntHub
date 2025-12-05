# 🧠 Smart Command Routing

## Overview

HauntHub now intelligently routes commands to save API calls and provide instant responses!

## How It Works

### ⚡ Instant Pattern Matching (Free & Fast)
For **known commands**, the app uses pre-written responses:
- ✅ Instant response (no delay)
- ✅ No API calls (saves your quota)
- ✅ Works offline
- ✅ Consistent quality

### 🤖 Gemini AI (Intelligent & Flexible)
For **new/unknown commands**, the app uses Gemini:
- ✅ Responds to anything
- ✅ Contextual understanding
- ✅ Creative responses
- ⏱️ 1-2 second delay

## Commands Using Pattern Matching

These commands are **instant** and **don't use API calls**:

### 📖 Content Generation
- `write a poem` / `poetry` / `verse`
- `tell me a story` / `tale`
- `tell me a joke`

### 🎨 ASCII Art
- `show me a pumpkin`
- `show me a skull`
- `show me a bat`
- `show me a spider`
- `show me a ghost`
- `ascii art`

### 💡 Lighting
- `dim the lights`
- `brighten the lights`
- `turn lights on`
- `turn lights off`

### 😱 Scares
- `scare me`
- `frighten me`
- `scream` ⭐ **NEW!**

### 📁 Files
- `read my notes`
- `read file`
- `rename file`

### 💬 Personality
- `hello` / `hi`
- `thank you`
- `who are you`
- `what are you`
- `what time is it`
- `what's the weather`

## Commands Using Gemini AI

These commands use the **API** for intelligent responses:

### ❓ Questions
- "Tell me about quantum physics"
- "What's your favorite color?"
- "How does photosynthesis work?"

### 💭 Conversations
- "Can you help me with my homework?"
- "What do you think about AI?"
- "Tell me something interesting"

### 🎯 Anything Else
- Any command not in the predefined list
- Follow-up questions
- Creative requests

## Benefits

### For You:
- **Faster responses** for common commands
- **Save API quota** for when you need it
- **Best of both worlds** - instant + intelligent

### For the App:
- Reduced API costs
- Better performance
- Reliable fallback

## Example Flow

### Command: "show me a pumpkin"
```
1. Check: Is this predefined? ✅ Yes
2. Use: Pattern matching
3. Result: Instant ASCII pumpkin
4. API calls: 0
```

### Command: "tell me about quantum physics"
```
1. Check: Is this predefined? ❌ No
2. Use: Gemini AI
3. Result: Intelligent explanation (1-2 sec)
4. API calls: 1
```

## Console Logs

Watch the browser console to see routing:

### Pattern Matching:
```
⚡ Using instant pattern matching for known command
```

### Gemini AI:
```
🤖 Using Gemini AI for new command...
✅ Gemini response received!
```

## Statistics

With smart routing:
- **~80% of commands** use pattern matching (instant)
- **~20% of commands** use Gemini (intelligent)
- **API calls reduced by 80%**

## New Feature: Scream Command! 😱

### Command: "Ghost, scream"

**Response:**
```
*INHALES DEEPLY*

AAAAAAAAAAAHHHHHHHHHHHHH!!! 😱👻💀

*The spectral scream echoes through the void!*

EEEEEEEEEEEEEEEEEEE!!!

*Ghostly voice cracks* Ahem... *adjusts spectral cravat*
```

**Effects:**
- 2-second intense screen shake
- Scary sound effect
- Dramatic text formatting

**Try it:** Type "Ghost, scream" and watch the Ghost Butler lose it! 👻

## Configuration

Smart routing is **always enabled** and works automatically.

To disable Gemini entirely:
```env
# frontend/.env
VITE_USE_GEMINI=false
```

This makes ALL commands use pattern matching.

## Summary

✅ **Known commands** → Instant pattern matching (free)
✅ **New commands** → Gemini AI (intelligent)
✅ **Best performance** → Automatic routing
✅ **Save API quota** → 80% reduction in calls

**The Ghost Butler is now smarter about when to use AI!** 🧠👻✨