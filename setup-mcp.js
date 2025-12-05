#!/usr/bin/env node

/**
 * Setup script for HauntHub MCP tools
 * This script helps configure the MCP tools in Kiro
 */

import fs from 'fs/promises';
import path from 'path';

const KIRO_MCP_CONFIG = '.kiro/settings/mcp.json';

async function setupMCP() {
  console.log('👻 Setting up HauntHub MCP tools...\n');

  try {
    // Check if MCP config exists
    const configExists = await fs.access(KIRO_MCP_CONFIG).then(() => true).catch(() => false);
    
    if (configExists) {
      console.log('✅ MCP configuration already exists at:', KIRO_MCP_CONFIG);
      console.log('📝 Please ensure your Kiro MCP settings include the HauntHub tools.\n');
    } else {
      console.log('⚠️  MCP configuration not found.');
      console.log('📋 Please create the MCP configuration manually in Kiro.\n');
    }

    // Make MCP tools executable
    const mcpTools = [
      'mcp-tools/haunted-lights-tool.js',
      'mcp-tools/file-haunting-tool.js', 
      'mcp-tools/spooky-ascii-tool.js',
      'mcp-tools/scare-effect-tool.js'
    ];

    console.log('🔧 Making MCP tools executable...');
    for (const tool of mcpTools) {
      try {
        await fs.chmod(tool, 0o755);
        console.log(`  ✅ ${tool}`);
      } catch (error) {
        console.log(`  ⚠️  ${tool} - ${error.message}`);
      }
    }

    // Create haunted files directory
    console.log('\n📁 Creating haunted files directory...');
    try {
      await fs.mkdir('haunted-files', { recursive: true });
      
      // Create sample files
      await fs.writeFile('haunted-files/notes.txt', 'These are my mortal notes...\nThe spirits whisper secrets here.');
      await fs.writeFile('haunted-files/diary.txt', 'Day 1: Strange things are happening...\nDay 2: The ghost butler appeared today.');
      
      console.log('  ✅ haunted-files directory created with sample files');
    } catch (error) {
      console.log(`  ⚠️  Error creating haunted-files: ${error.message}`);
    }

    console.log('\n🎉 HauntHub setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Configure MCP tools in Kiro settings');
    console.log('2. Run "npm run dev" to start the frontend');
    console.log('3. Test the Ghost Butler with voice or text commands');
    console.log('\n👻 Happy haunting!');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setupMCP();