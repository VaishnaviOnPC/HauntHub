# 🎃 HauntHub Setup Guide

Welcome to HauntHub, your spooky AI assistant powered by the Ghost Butler! This guide will help you set up the complete system.

## 📋 Prerequisites

- Node.js (v18 or higher)
- Kiro IDE with MCP support
- Modern web browser with speech recognition support (Chrome/Edge recommended)

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd HauntHub
npm run setup
```

### 2. Configure MCP Tools in Kiro

#### Option A: Workspace Configuration (Recommended)
The MCP configuration is already set up in `.kiro/settings/mcp.json`. Kiro should automatically detect and load the tools.

#### Option B: Manual Configuration
If automatic detection doesn't work, add this to your Kiro MCP settings:

```json
{
  "mcpServers": {
    "haunted-lights": {
      "command": "node",
      "args": ["./mcp-tools/haunted-lights-tool.js"],
      "disabled": false,
      "autoApprove": ["dim_lights", "brighten_lights", "set_light_color"]
    },
    "file-haunting": {
      "command": "node", 
      "args": ["./mcp-tools/file-haunting-tool.js"],
      "disabled": false,
      "autoApprove": ["list_files", "read_file", "rename_file", "create_file"]
    },
    "spooky-ascii": {
      "command": "node",
      "args": ["./mcp-tools/spooky-ascii-tool.js"], 
      "disabled": false,
      "autoApprove": ["generate_ascii"]
    },
    "scare-effects": {
      "command": "node",
      "args": ["./mcp-tools/scare-effect-tool.js"],
      "disabled": false,
      "autoApprove": ["trigger_scare"]
    }
  }
}
```

### 3. Start the Application
```bash
npm run dev
```

This will start the React frontend on `http://localhost:3000`

## 🧪 Testing the Setup

### Test MCP Tools in Kiro
Open Kiro and try these commands to test each tool:

1. **Haunted Lights**: "Ghost, dim the lights"
2. **File Operations**: "Ghost, list my files"
3. **ASCII Art**: "Ghost, show me a spooky pumpkin"
4. **Scare Effects**: "Ghost, scare me"

### Test Frontend
1. Open `http://localhost:3000` in your browser
2. Try the quick command buttons
3. Test voice input (click the microphone icon)
4. Type custom commands in the input field

## 🎭 Demo Commands

Here are the key commands that showcase all features:

### Lighting Control
- "Ghost, dim the lights"
- "Ghost, brighten the lights"
- "Ghost, set the lights to red"

### File Operations
- "Ghost, list my files"
- "Ghost, read notes.txt"
- "Ghost, rename notes.txt to ghost_notes.txt"
- "Ghost, create a new file called spells.txt"

### ASCII Art
- "Ghost, show me a spooky pumpkin"
- "Ghost, generate a skull"
- "Ghost, create a random ASCII art"

### Scare Effects
- "Ghost, scare me"
- "Ghost, give me a jump scare"
- "Ghost, shake the screen"

### Creative Commands
- "Ghost, write a haunted poem"
- "Ghost, tell me a ghost story"
- "Ghost, what's the weather in the spirit realm?"

## 🔧 Troubleshooting

### MCP Tools Not Working
1. Check that Node.js is installed and accessible
2. Verify MCP configuration in Kiro settings
3. Restart Kiro after configuration changes
4. Check Kiro's MCP server status panel

### Frontend Issues
1. Ensure port 3000 is available
2. Check browser console for errors
3. Try refreshing the page
4. Verify all dependencies are installed

### Voice Input Not Working
1. Use Chrome or Edge browser
2. Allow microphone permissions
3. Ensure you're on HTTPS or localhost
4. Check browser's speech recognition support

### File Operations Failing
1. Verify `haunted-files` directory exists
2. Check file permissions
3. Ensure files exist before trying to read them

## 🎨 Customization

### Adding New ASCII Art
Edit `mcp-tools/spooky-ascii-tool.js` and add new patterns to the `ASCII_ART` object.

### Modifying Ghost Responses
Update the steering document at `.kiro/steering/ghost-butler-persona.md` to change the Ghost Butler's personality.

### Adding New Scare Effects
Extend `mcp-tools/scare-effect-tool.js` with new effect types and update the frontend CSS accordingly.

### Customizing the UI
Modify the CSS files in `frontend/src/styles/` to change colors, animations, and layout.

## 📁 Project Structure

```
HauntHub/
├── .kiro/                          # Kiro configuration
│   ├── steering/                   # Agent behavior rules
│   └── settings/                   # MCP tool configuration
├── mcp-tools/                      # MCP server implementations
├── frontend/                       # React application
│   ├── src/
│   │   ├── components/            # React components
│   │   └── styles/                # CSS stylesheets
│   └── package.json
├── haunted-files/                  # Safe file operation directory
├── specs/                          # Project specifications
└── package.json                    # Main project configuration
```

## 🎃 Happy Haunting!

Your HauntHub Ghost Butler is now ready to serve! The spectral realm awaits your commands.

For issues or questions, consult the ethereal documentation or summon the development spirits.