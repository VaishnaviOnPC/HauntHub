import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testAPI() {
  console.log('🔑 API Key:', process.env.GEMINI_API_KEY?.substring(0, 20) + '...');
  
  try {
    // Try different model names
    const models = ['gemini-1.5-pro', 'gemini-pro', 'gemini-1.5-flash', 'gemini-1.0-pro'];
    
    for (const modelName of models) {
      console.log(`\n🧪 Testing model: ${modelName}`);
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say hello in one word');
        const response = await result.response;
        const text = response.text();
        console.log(`✅ ${modelName} works! Response: ${text}`);
        break;
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.message}`);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();
