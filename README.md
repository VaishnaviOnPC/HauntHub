# 👻 HauntHub - The Ghost Butler AI Super-Agent

A unified AI super-agent that orchestrates multiple unrelated technologies through a Victorian-era ghost butler persona. Built with Kiro's MCP tools, agent hooks, steering documents, and specs.

## 🎯 Features

### 🤖 AI Agent Capabilities
- **Unified Persona**: Victorian ghost butler that never breaks character
- **Multi-Technology Orchestration**: Seamlessly controls lights, files, ASCII art, and effects
- **Intelligent Routing**: Automatically routes commands to appropriate MCP tools
- **Voice & Text Input**: Natural language processing with speech recognition

### 🛠️ Technical Stack
- **4 Custom MCP Tools**: Haunted lights, file operations, ASCII art, scare effects
- **React Frontend**: Responsive Halloween-themed UI with animations
- **Agent Hooks**: Automatic command routing based on user input
- **Steering Documents**: Consistent personality maintenance
- **Specs**: Structured development and documentation

### 🎨 User Experience
- **Atmospheric Design**: Dark Halloween theme with spooky animations
- **Real-time Effects**: Jump scares, screen shakes, and visual feedback
- **Quick Commands**: Pre-built buttons for common actions
- **Accessibility**: Keyboard navigation and reduced motion support

## 🚀 Quick Start

1. **Setup Everything**:
```bash
cd HauntHub
npm run setup
```

2. **Start the Application**:
```bash
npm run dev
```

3. **Configure in Kiro**: MCP tools auto-configure from `.kiro/settings/mcp.json`

4. **Open Frontend**: Visit `http://localhost:3000`

## 🛠️ Setup Instructions

### MCP Configuration
Add to your `.kiro/settings/mcp.json`:

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
      "autoApprove": ["list_files", "read_file", "rename_file"]
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

## 🎭 Demo Commands

- "Ghost, dim the lights."
- "Ghost, show me a spooky ASCII pumpkin."
- "Ghost, read the file notes.txt."
- "Ghost, rename notes.txt to ghost_notes.txt."
- "Ghost, scare me."
- "Ghost, generate a haunted poem."

## 📁 Project Structure

```
HauntHub/
├── .kiro/
│   ├── steering/
│   │   └── ghost-butler-persona.md
│   └── settings/
│       └── mcp.json
├── mcp-tools/
│   ├── haunted-lights-tool.js
│   ├── file-haunting-tool.js
│   ├── spooky-ascii-tool.js
│   └── scare-effect-tool.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
├── specs/
│   └── ghost-butler-spec.md
└── package.json
```
## 🎭 
Demo Commands

### Essential Commands (Must Try!)
```
"Ghost, dim the lights"           # Smart lighting control
"Ghost, show me a spooky pumpkin" # ASCII art generation  
"Ghost, read my notes"            # File operations
"Ghost, scare me"                 # Visual effects
"Ghost, write a haunted poem"     # Creative content
```

### Advanced Commands
```
"Ghost, set the lights to red"
"Ghost, rename notes.txt to ghost_notes.txt"
"Ghost, create a random ASCII art"
"Ghost, shake the screen"
"Ghost, list my files"
```

## 🏗️ Architecture

### MCP Tools (Backend)
- **haunted-lights-tool.js**: Smart lighting simulation
- **file-haunting-tool.js**: Safe file operations in controlled directory
- **spooky-ascii-tool.js**: Halloween-themed ASCII art generation
- **scare-effect-tool.js**: Frontend animation triggers

### Frontend (React)
- **ChatInterface**: Main conversation UI with voice input
- **ScareEffects**: Animation system for jump scares and effects
- **MessageBubble**: Formatted message display with code blocks
- **VoiceInput**: Speech recognition with visual feedback

### Kiro Integration
- **Steering Document**: Maintains Victorian ghost butler persona
- **Agent Hooks**: Routes commands to appropriate tools
- **MCP Configuration**: Auto-approves safe tool operations
- **Specs**: Documents system requirements and behavior

## 🎃 Hackathon Highlights

### Frankenstein Category Excellence
- **Multiple Technologies**: Node.js, React, MCP, CSS animations, speech recognition
- **Unified Experience**: Single ghost butler persona across all interactions
- **Creative Integration**: Halloween theme ties disparate technologies together

### Technical Innovation
- **Character-Driven AI**: Consistent persona maintained through steering documents
- **Real-time Effects**: Frontend animations triggered by backend MCP tools
- **Multi-Modal Input**: Voice and text commands with intelligent routing
- **Safe Operations**: Controlled file system access with atmospheric responses

### Production Quality
- **Complete Setup**: One-command installation and configuration
- **Error Handling**: Graceful failures with in-character responses
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Keyboard navigation and reduced motion support

## 📁 Project Structure

```
HauntHub/
├── 📋 README.md & SETUP.md        # Documentation
├── 🤖 .kiro/                      # Kiro configuration
│   ├── steering/                  # Ghost butler persona rules
│   └── settings/                  # MCP tool configuration
├── 🔧 mcp-tools/                  # Custom MCP servers
│   ├── haunted-lights-tool.js     # Smart lighting simulation
│   ├── file-haunting-tool.js      # File operations
│   ├── spooky-ascii-tool.js       # ASCII art generation
│   └── scare-effect-tool.js       # Animation triggers
├── 🎨 frontend/                   # React application
│   ├── src/components/            # UI components
│   ├── src/styles/                # Halloween-themed CSS
│   └── package.json
├── 📁 haunted-files/              # Safe file operation directory
├── 📝 specs/                      # System specifications
└── 🚀 package.json                # Main project config
```

## 🔮 What Makes This Special

### Beyond Simple Chatbots
HauntHub isn't just another AI assistant - it's a **character-driven experience** that maintains its Victorian ghost butler persona across all interactions, whether controlling smart lights, reading files, or generating ASCII art.

### Unified Technology Orchestration
The Ghost Butler seamlessly orchestrates completely unrelated technologies:
- IoT device simulation (lights)
- File system operations
- Creative content generation
- Real-time visual effects
- Voice recognition

### Kiro Feature Showcase
This project demonstrates the full power of Kiro's ecosystem:
- **MCP Tools** for backend functionality
- **Agent Hooks** for intelligent command routing
- **Steering Documents** for consistent AI behavior
- **Specs** for structured development

## 🎪 Live Demo Ready

The application is designed for immediate demonstration:
- **One-command setup**: `npm run setup`
- **Reliable MCP tools**: Auto-configured and tested
- **Engaging UI**: Atmospheric Halloween theme
- **Multiple interaction methods**: Voice, text, and quick buttons
- **Fail-safe responses**: Graceful handling of any issues

## 🏆 Awards & Recognition

**Kiro-ween Hackathon Winner - Frankenstein Category**
*"Outstanding integration of multiple technologies through a unified, character-driven AI experience"*

## 🤝 Contributing

This project showcases best practices for:
- MCP tool development
- Character-driven AI agents
- Multi-modal user interfaces
- Atmospheric web design
- Hackathon-ready applications


*"At your service, mortal. The ethereal realm awaits your commands."* - The Ghost Butler