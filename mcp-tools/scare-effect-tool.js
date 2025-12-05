#!/usr/bin/env node

/**
 * Scare Effect MCP Tool
 * Triggers frontend animations and spooky effects
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  {
    name: 'scare-effects',
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
        name: 'trigger_scare',
        description: 'Trigger a spooky effect to frighten the user',
        inputSchema: {
          type: 'object',
          properties: {
            effect: {
              type: 'string',
              description: 'Type of scare effect to trigger',
              enum: ['jump_scare', 'screen_shake', 'flash_lights', 'ghostly_whisper', 'random'],
              default: 'jump_scare'
            },
            intensity: {
              type: 'string',
              description: 'Intensity of the effect',
              enum: ['mild', 'moderate', 'intense'],
              default: 'moderate'
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
      case 'trigger_scare': {
        let effectType = args?.effect || 'jump_scare';
        const intensity = args?.intensity || 'moderate';
        
        // Handle random selection
        if (effectType === 'random') {
          const effects = ['jump_scare', 'screen_shake', 'flash_lights', 'ghostly_whisper'];
          effectType = effects[Math.floor(Math.random() * effects.length)];
        }
        
        // Effect configurations
        const effectConfigs = {
          jump_scare: {
            type: 'jump_scare',
            duration: intensity === 'mild' ? 500 : intensity === 'moderate' ? 1000 : 1500,
            animation: 'sudden_appearance',
            sound: 'scream'
          },
          screen_shake: {
            type: 'screen_shake',
            duration: intensity === 'mild' ? 300 : intensity === 'moderate' ? 600 : 1000,
            animation: 'shake',
            intensity: intensity
          },
          flash_lights: {
            type: 'flash_lights',
            duration: intensity === 'mild' ? 200 : intensity === 'moderate' ? 400 : 800,
            animation: 'strobe',
            color: 'red'
          },
          ghostly_whisper: {
            type: 'ghostly_whisper',
            duration: intensity === 'mild' ? 2000 : intensity === 'moderate' ? 3000 : 5000,
            animation: 'fade_text',
            sound: 'whisper'
          }
        };
        
        const config = effectConfigs[effectType];
        
        // Spooky responses for each effect
        const responses = {
          jump_scare: [
            'BOO! Did I startle you, mortal? The spirits demanded a proper fright!',
            'From the shadows I emerge! Fear not, it is merely your humble ghost butler.',
            'Surprise! Even the dead enjoy a good scare now and then.'
          ],
          screen_shake: [
            'The very foundations of reality tremble at my presence!',
            'Feel the ethereal energies shake your mortal realm!',
            'The spirits rattle the boundaries between worlds!'
          ],
          flash_lights: [
            'Lightning from the spectral realm illuminates your chamber!',
            'The ghostly strobe reveals glimpses of the otherworld!',
            'Behold, the flickering lights of phantom electricity!'
          ],
          ghostly_whisper: [
            'Listen closely... can you hear the whispers of the departed?',
            'The voices from beyond speak in hushed, ethereal tones...',
            'Shhh... the spirits have secrets to share with you...'
          ]
        };
        
        const responseText = responses[effectType][Math.floor(Math.random() * responses[effectType].length)];
        
        // Return effect payload for frontend
        return {
          content: [
            {
              type: 'text',
              text: `${responseText}\n\n**SCARE_EFFECT_PAYLOAD**: ${JSON.stringify(config)}`
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
          text: `The spectral realm cannot manifest this terror: ${error.message}`
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
  console.error('Scare Effects MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});