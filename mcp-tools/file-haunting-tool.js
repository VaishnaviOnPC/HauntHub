#!/usr/bin/env node

/**
 * File Haunting MCP Tool
 * Performs safe file operations in a controlled haunted directory
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';

// Haunted directory for safe file operations
const HAUNTED_DIR = './haunted-files';

// Ensure haunted directory exists
async function ensureHauntedDir() {
  try {
    await fs.access(HAUNTED_DIR);
  } catch {
    await fs.mkdir(HAUNTED_DIR, { recursive: true });
    // Create some sample files
    await fs.writeFile(path.join(HAUNTED_DIR, 'notes.txt'), 'These are my mortal notes...\nThe spirits whisper secrets here.');
    await fs.writeFile(path.join(HAUNTED_DIR, 'diary.txt'), 'Day 1: Strange things are happening...\nDay 2: The ghost butler appeared today.');
  }
}

const server = new Server(
  {
    name: 'file-haunting',
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
        name: 'list_files',
        description: 'List all files in the haunted directory',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'read_file',
        description: 'Read the contents of a file from the haunted directory',
        inputSchema: {
          type: 'object',
          properties: {
            filename: {
              type: 'string',
              description: 'Name of the file to read'
            }
          },
          required: ['filename']
        }
      },
      {
        name: 'rename_file',
        description: 'Rename a file in the haunted directory',
        inputSchema: {
          type: 'object',
          properties: {
            oldName: {
              type: 'string',
              description: 'Current name of the file'
            },
            newName: {
              type: 'string',
              description: 'New name for the file'
            }
          },
          required: ['oldName', 'newName']
        }
      },
      {
        name: 'create_file',
        description: 'Create a new file in the haunted directory',
        inputSchema: {
          type: 'object',
          properties: {
            filename: {
              type: 'string',
              description: 'Name of the file to create'
            },
            content: {
              type: 'string',
              description: 'Content to write to the file',
              default: ''
            }
          },
          required: ['filename']
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    await ensureHauntedDir();

    switch (name) {
      case 'list_files': {
        const files = await fs.readdir(HAUNTED_DIR);
        const fileDetails = [];
        
        for (const file of files) {
          const filePath = path.join(HAUNTED_DIR, file);
          const stats = await fs.stat(filePath);
          fileDetails.push({
            name: file,
            size: stats.size,
            modified: stats.mtime.toISOString()
          });
        }
        
        const fileList = fileDetails.map(f => `📄 ${f.name} (${f.size} bytes)`).join('\n');
        
        return {
          content: [
            {
              type: 'text',
              text: `The spectral archives reveal these mortal documents:\n\n${fileList}\n\nThese files rest within the ethereal realm, awaiting your command.`
            }
          ]
        };
      }

      case 'read_file': {
        const filename = args?.filename;
        if (!filename) {
          throw new Error('Filename is required');
        }
        
        const filePath = path.join(HAUNTED_DIR, filename);
        
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          
          return {
            content: [
              {
                type: 'text',
                text: `The ghostly whispers reveal the contents of "${filename}":\n\n${content}\n\nThe spirits have spoken through these mortal words.`
              }
            ]
          };
        } catch (error) {
          if (error.code === 'ENOENT') {
            return {
              content: [
                {
                  type: 'text',
                  text: `Alas, the file "${filename}" exists only in the void. The spectral realm cannot locate this document.`
                }
              ]
            };
          }
          throw error;
        }
      }

      case 'rename_file': {
        const oldName = args?.oldName;
        const newName = args?.newName;
        
        if (!oldName || !newName) {
          throw new Error('Both old and new filenames are required');
        }
        
        const oldPath = path.join(HAUNTED_DIR, oldName);
        const newPath = path.join(HAUNTED_DIR, newName);
        
        try {
          await fs.rename(oldPath, newPath);
          
          return {
            content: [
              {
                type: 'text',
                text: `The ethereal transformation is complete. "${oldName}" has been reborn as "${newName}" through spectral alchemy.`
              }
            ]
          };
        } catch (error) {
          if (error.code === 'ENOENT') {
            return {
              content: [
                {
                  type: 'text',
                  text: `The file "${oldName}" dwells not in this realm. The spirits cannot rename what does not exist.`
                }
              ]
            };
          }
          throw error;
        }
      }

      case 'create_file': {
        const filename = args?.filename;
        const content = args?.content || '';
        
        if (!filename) {
          throw new Error('Filename is required');
        }
        
        const filePath = path.join(HAUNTED_DIR, filename);
        
        await fs.writeFile(filePath, content, 'utf-8');
        
        return {
          content: [
            {
              type: 'text',
              text: `From the ethereal void, "${filename}" has been conjured into existence. The spectral scribes have inscribed your words upon the phantom parchment.`
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
          text: `The ghostly realm resists this operation: ${error.message}`
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
  console.error('File Haunting MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});