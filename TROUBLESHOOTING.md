# 🔧 Troubleshooting Guide

## Issue: Getting Generic Responses

If you're getting the same response like "The ghostly realm acknowledges your presence..." every time, it means the command pattern isn't matching. Here's how to fix it:

### ✅ Commands That Should Work Now

Try these **exact phrases** (copy and paste if needed):

#### Lighting Commands
```
dim the lights
brighten the lights
turn lights off
turn lights on
lights dim
lights bright
```

#### ASCII Art
```
show me a pumpkin
ascii art
pumpkin
```

#### Scares
```
scare me
frighten me
```

#### Personality
```
hello
hi
thank you
tell me a joke
who are you
tell me a story
what time is it
what's the weather
```

#### Creative
```
write a poem
tell me a poem
```

#### Files
```
read my notes
show my notes
```

---

## Debug Mode

Open your browser's **Developer Console** (F12) and look for:
```
Processing command: [your command]
```

This shows exactly what the Ghost Butler is receiving.

---

## Common Issues

### 1. Command Not Recognized
**Problem:** Typing something like "please dim lights" or "can you dim the lights"

**Solution:** The pattern matcher looks for specific keywords. Try simpler commands:
- ❌ "Can you please dim the lights for me?"
- ✅ "dim the lights"

### 2. Typos
**Problem:** "dime the lights" or "brighten teh lights"

**Solution:** Check spelling! The matcher is exact.

### 3. Wrong Keywords
**Problem:** "make it darker" or "reduce brightness"

**Solution:** Use the exact keywords:
- For dimming: "dim", "darker", "down"
- For brightening: "bright", "up", "lighter"

---

## Testing Pattern Matching

### Test 1: Lights
Type exactly: `dim the lights`

**Expected:**
- Response mentions "25%"
- Screen actually dims
- Light indicator shows 25%

### Test 2: ASCII Art
Type exactly: `show me a pumpkin`

**Expected:**
- ASCII pumpkin appears
- Formatted in code block

### Test 3: Scare
Type exactly: `scare me`

**Expected:**
- "BOO!" message
- Jump scare animation
- Sound effect

---

## If Commands Still Don't Work

### Check Browser Console
1. Press F12
2. Go to Console tab
3. Type a command
4. Look for: `Processing command: [your text]`
5. Check if the text matches what you typed

### Try Quick Command Buttons
The buttons at the bottom of the chat should always work because they send exact commands.

### Clear Browser Cache
Sometimes old JavaScript is cached:
1. Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Or clear cache in browser settings

---

## Improved Pattern Matching

I just updated the code to:
- ✅ Be more flexible with keywords
- ✅ Show helpful suggestions when commands aren't recognized
- ✅ Log commands to console for debugging
- ✅ Handle more variations (e.g., "art" for ASCII art)

---

## Quick Test Commands

Copy and paste these one at a time:

```
dim the lights
```
(Should dim screen to 25%)

```
brighten the lights
```
(Should brighten to 85%)

```
show me a pumpkin
```
(Should show ASCII art)

```
scare me
```
(Should trigger jump scare)

```
hello
```
(Should give special greeting)

---

## Still Having Issues?

If none of these work:
1. Check the browser console (F12) for errors
2. Make sure the dev server is running
3. Try refreshing the page (Ctrl+R)
4. Check that you're on http://localhost:3000/

The quick command buttons should ALWAYS work - if they don't, there's a bigger issue with the app state.