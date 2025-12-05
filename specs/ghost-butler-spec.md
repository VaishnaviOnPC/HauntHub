# 👻 Ghost Butler Agent Specification

## Overview
The Ghost Butler is a unified AI super-agent that orchestrates multiple technologies through a spooky Victorian-era persona, capable of handling lighting, file operations, ASCII art generation, and scare effects.

## Core Requirements

### 1. Agent Persona
- **Character**: Victorian-era ghost butler
- **Tone**: Polite but eerie, slightly sarcastic, atmospheric
- **Behavior**: Always stays in character, routes commands appropriately
- **Response Pattern**: Acknowledgment → Tool execution → Atmospheric conclusion

### 2. MCP Tool Integration
The agent must seamlessly integrate with four custom MCP tools:

#### Haunted Lights Tool
- **Purpose**: Simulate smart lighting controls
- **Actions**: dim, brighten, set_color
- **Input**: Action type and optional parameters (brightness level, color)
- **Output**: Confirmation message with atmospheric description

#### File Haunting Tool  
- **Purpose**: Safe file operations in controlled directory
- **Actions**: list_files, read_file, rename_file
- **Safety**: Limited to designated haunted directory
- **Output**: File contents or operation confirmations

#### Spooky ASCII Tool
- **Purpose**: Generate Halloween-themed ASCII art
- **Supported**: pumpkin, skull, bat, ghost, spider, cauldron
- **Output**: ASCII art with spooky descriptions

#### Scare Effect Tool
- **Purpose**: Trigger frontend animations and effects
- **Effects**: jump_scare, screen_shake, flash_lights, ghostly_whisper
- **Output**: Effect payload for frontend consumption

### 3. Command Routing Logic
The agent must intelligently parse user commands and route to appropriate tools:

```
"dim lights" → haunted_lights_tool(action: "dim")
"show pumpkin" → spooky_ascii_tool(type: "pumpkin") 
"read file.txt" → file_haunting_tool(action: "read_file", filename: "file.txt")
"scare me" → scare_effect_tool(effect: "jump_scare")
```

### 4. Frontend Integration
- React-based UI with dark Halloween theme
- Input methods: text and voice commands
- Response display with tool outputs
- Animation system for scare effects
- Atmospheric sound effects (optional)

## Implementation Details

### Agent Hooks Configuration
```yaml
hooks:
  - trigger: user_message_contains("light")
    action: route_to_haunted_lights
  - trigger: user_message_contains("file|read|rename")  
    action: route_to_file_haunting
  - trigger: user_message_contains("ascii|pumpkin|skull")
    action: route_to_spooky_ascii
  - trigger: user_message_contains("scare|frighten")
    action: route_to_scare_effects
```

### Error Handling
- Graceful failures with in-character responses
- Safety confirmations for destructive operations
- Fallback to creative responses when tools unavailable

### Performance Requirements
- Response time < 2 seconds for simple commands
- Smooth animations without blocking UI
- Efficient tool routing without unnecessary calls

## Success Criteria
1. All demo commands work flawlessly
2. Agent never breaks character
3. Tools integrate seamlessly
4. Frontend provides engaging user experience
5. System is hackathon-demo ready

## Future Enhancements
- Voice recognition improvements
- Additional MCP tools (weather, calendar, etc.)
- Multi-room lighting support
- Persistent haunted file system
- Multiplayer ghost interactions