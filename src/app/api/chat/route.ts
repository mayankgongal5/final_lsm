/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import LangflowClient from '../../lib/langflowClient'; // Assuming it's in 'lib/langflowClient.ts'

const langflowClient = new LangflowClient(
  'https://api.langflow.astra.datastax.com',
  'APP TOKEN'
);

// Handle POST requests for chat
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { inputValue, inputType = 'chat', outputType = 'chat', stream = false } = await req.json();

    if (!inputValue) {
      return NextResponse.json({ message: 'Input value is required' }, { status: 400 });
    }

    // Set the tweaks object if needed
    const tweaks = {
      "ChatInput-yN0fa": {},
        "GoogleSearchAPI-a3smr": {},
        "ParseData-pFgVm": {},
        "Prompt-U12Sa": {},
        "GroqModel-ZwLnb": {},
        "ChatOutput-MR8Az": {},
        "JSONCleaner-ejz70": {},
        "TavilyAISearch-3tT7z": {},
        "ParseData-k2mQU": {},
        "Prompt-xoJSl": {},
        "GroqModel-sCB4G": {},
        "JSONCleaner-r7rsQ": {},
        "CombineText-Gyc1R": {},
        "GleanAPI-6PCqh": {},
        "ExaSearch-VVLYB": {},
        "GoogleSearchAPI-7t0uP": {},
        "OpenAIModel-XAkig": {},
        "Prompt-5MRtn": {}
      
    };

    // Call the LangflowClient's `runFlow` method to initiate the flow
    const response = await langflowClient.runFlow(
      'OrderName', // flowIdOrName
      'LangflowID', // langflowId
      inputValue,
     
    );
    console.log('API Response:', response);  // Log the raw response for debugging

    // If not streaming, return the final output
    if (!stream && response && response.outputs) {
      const flowOutputs = response.outputs[0];
      const firstComponentOutputs = flowOutputs.outputs[0];
      const output = firstComponentOutputs.outputs.message;

      return NextResponse.json({ message: output.message.text }, { status: 200 });
    }

    return NextResponse.json(response); // For streaming, return the initial response
  } catch (error: any) {
    console.error('Error running flow:', error.message);
    return NextResponse.json({ message: 'Error running flow', error: error.message }, { status: 500 });
  }
}

// Optionally, handle other HTTP methods (GET, PUT, DELETE) if needed
export async function GET() {
  return NextResponse.json({ message: 'GET method not supported on this endpoint' }, { status: 405 });
}
