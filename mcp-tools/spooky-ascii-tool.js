#!/usr/bin/env node

/**
 * Spooky ASCII MCP Tool
 * Generates Halloween-themed ASCII art
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// ASCII art templates
const ASCII_ART = {
  pumpkin: `
       ___
      /   \\
     | o o |
      \\ ^ /
       |||
      /|||\\
     /_____\\
  `,
  skull: `
      ___
     /   \\
    | o o |
     \\ - /
      |||
     /   \\
    /_____\\
  `,
  ghost: `
      .-""-.
     /      \\
    |  o  o  |
    |    >   |
     \\  ---  /
      '-..-'
        ||
       /||\\
      / || \\
     /_____\\
  `,
  bat: `
    /\\   /\\
   (  . .)
    )   (
   (  v  )
  ^^  |  ^^
     /|\\
    / | \\
  `,
  spider: `
      /\\   /\\
     (  o_o  )
    o_)     (_o
   /           \\
  (  /\\_____/\\  )
   \\_)       (_/
  `,
  cauldron: `
       ___
      /   \\
     | ~~~ |
     | ~~~ |
      \\___/
       |||
      /|||\\
     /_____\\
  `,
  witch_hat: `
        /\\
       /  \\
      /    \\
     /      \\
    /________\\
   /__________\\
  `,
  coffin: `
     _______
    /       \\
   |    RIP  |
   |         |
   |  _____  |
   | |     | |
   | |     | |
   |_|_____|_|
  `
};

const server = new Server(
  {
    name: 'spooky-ascii',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'generate_ascii',
        description: 'Generate spooky ASCII art for Halloween atmosphere',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              description: 'Type of ASCII art to generate',
              enum: ['pumpkin', 'skull', 'ghost', 'bat', 'spider', 'cauldron', 'witch_hat', 'coffin', 'random'],
              default: 'pumpkin'
            }
          }
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'generate_ascii': {
        let artType = args?.type || 'pumpkin';
        
        // Handle random selection
        if (artType === 'random') {
          const types = Object.keys(ASCII_ART);
          artType = types[Math.floor(Math.random() * types.length)];
        }
        
        const art = ASCII_ART[artType];
        if (!art) {
          throw new Error(`Unknown ASCII art type: ${artType}`);
        }
        
        // Spooky descriptions for each art type
        const descriptions = {
          pumpkin: 'Behold, the ancient jack-o\'-lantern, carved by spectral hands and lit by ghostly flames!',
          skull: 'The grinning visage of mortality stares back from beyond the veil...',
          ghost: 'A friendly phantom materializes from the ethereal mist to greet you!',
          bat: 'From the shadowy belfry, a creature of the night spreads its wings!',
          spider: 'An eight-legged weaver of fate spins its web in the corners of reality!',
          cauldron: 'The witch\'s cauldron bubbles with mysterious potions and ancient magic!',
          witch_hat: 'The pointed hat of a sorceress, imbued with centuries of mystical power!',
          coffin: 'Here lies the eternal rest of those who have crossed to the other side...'
        };
        
        return {
          content: [
            {
              type: 'text',
              text: `${descriptions[artType]}\n\n\`\`\`${art}\`\`\`\n\nCrafted by the spectral artisans of the otherworld.`
            }
          ]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `The ethereal artists cannot fulfill this request: ${error.message}`
        }
      ],
      isError: true
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Spooky ASCII MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});