#!/usr/bin/env node

/**
 * Haunted Lights MCP Tool
 * Simulates smart lighting controls with spooky responses
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Simulated light state
let lightState = {
  brightness: 75,
  color: 'warm_white',
  isOn: true
};

const server = new Server(
  {
    name: 'haunted-lights',
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
        name: 'dim_lights',
        description: 'Dim the lights to create a spooky atmosphere',
        inputSchema: {
          type: 'object',
          properties: {
            level: {
              type: 'number',
              description: 'Brightness level (0-100)',
              minimum: 0,
              maximum: 100,
              default: 25
            }
          }
        }
      },
      {
        name: 'brighten_lights', 
        description: 'Brighten the lights to banish the shadows',
        inputSchema: {
          type: 'object',
          properties: {
            level: {
              type: 'number',
              description: 'Brightness level (0-100)',
              minimum: 0,
              maximum: 100,
              default: 85
            }
          }
        }
      },
      {
        name: 'set_light_color',
        description: 'Change the color of the lights for atmospheric effect',
        inputSchema: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
              description: 'Light color',
              enum: ['red', 'orange', 'purple', 'green', 'blue', 'warm_white', 'cool_white'],
              default: 'orange'
            }
          },
          required: ['color']
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
      case 'dim_lights': {
        const level = args?.level || 25;
        lightState.brightness = level;
        lightState.isOn = level > 0;
        
        const responses = [
          `The shadows creep closer as the lights dim to ${level}%. The ethereal darkness embraces your chamber.`,
          `Darkness descends... The lights now glow at a mere ${level}%, perfect for summoning spirits.`,
          `The spectral energies respond. Your lights fade to ${level}%, casting eerie shadows on the walls.`
        ];
        
        return {
          content: [
            {
              type: 'text',
              text: responses[Math.floor(Math.random() * responses.length)]
            }
          ]
        };
      }

      case 'brighten_lights': {
        const level = args?.level || 85;
        lightState.brightness = level;
        lightState.isOn = true;
        
        const responses = [
          `The shadows retreat as brilliant light floods the room at ${level}%. Even ghosts need proper illumination.`,
          `Let there be light! The spectral glow now shines at ${level}%, banishing the gloom.`,
          `The ethereal radiance intensifies to ${level}%. The spirits approve of proper lighting.`
        ];
        
        return {
          content: [
            {
              type: 'text', 
              text: responses[Math.floor(Math.random() * responses.length)]
            }
          ]
        };
      }

      case 'set_light_color': {
        const color = args?.color || 'orange';
        lightState.color = color;
        
        const colorDescriptions = {
          red: 'blood-red crimson that would make vampires weep with joy',
          orange: 'haunting pumpkin orange, perfect for All Hallows\' Eve',
          purple: 'mystical violet that channels otherworldly energies',
          green: 'sickly green glow reminiscent of ghostly apparitions',
          blue: 'ethereal blue like moonlight on a graveyard',
          warm_white: 'warm candlelight that flickers like phantom flames',
          cool_white: 'cold white light that chills the very soul'
        };
        
        return {
          content: [
            {
              type: 'text',
              text: `The spectral spectrum shifts... Your lights now bathe the room in ${colorDescriptions[color]}. The atmosphere grows more haunting by the moment.`
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
          text: `Alas, the spectral energies resist this command: ${error.message}`
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
  console.error('Haunted Lights MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});