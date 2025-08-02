import Groq from 'groq-sdk';
import { groqConfig } from '../config/groq';

const groq = new Groq({
  apiKey: groqConfig.apiKey,
  dangerouslyAllowBrowser: true
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class GroqService {
  private static instance: GroqService;
  
  private constructor() {}
  
  public static getInstance(): GroqService {
    if (!GroqService.instance) {
      GroqService.instance = new GroqService();
    }
    return GroqService.instance;
  }

  async generateStreamResponse(
    messages: ChatMessage[], 
    onChunk: (chunk: string) => void,
    onComplete: () => void,
    onError: (error: string) => void
  ): Promise<void> {
    try {
      const systemMessage: ChatMessage = {
        role: 'system',
        content: `You are Sparks GPT, an advanced AI assistant created by Websparks AI. You are helpful, knowledgeable, and provide accurate, detailed responses. You can assist with coding, writing, analysis, creative tasks, and general questions. Always be professional, friendly, and comprehensive in your responses.`
      };

      const stream = await groq.chat.completions.create({
        messages: [systemMessage, ...messages],
        model: groqConfig.model,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        stream: true
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          onChunk(content);
        }
      }
      
      onComplete();
    } catch (error) {
      console.error('Groq Streaming Error:', error);
      onError('Failed to generate response. Please check your connection and try again.');
    }
  }
}

export const groqService = GroqService.getInstance();
