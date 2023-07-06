import 'xhr_polyfill';
import { serve } from 'std/server';
import { CreateChatCompletionRequest } from 'openai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const { messages } = await req.json();

  const completionConfig: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
    max_tokens: 2048,
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(completionConfig),
    });

    if (response.ok) {
      return new Response(response.body, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
        },
      });
    } else {
      // Create an error response with appropriate status code and error message
      const errorMessage = `Request failed with status: ${response.status} ${response.statusText}`;
      return new Response(errorMessage, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(error, {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
      },
    });
  }
}

serve(handler);
