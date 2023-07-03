import 'xhr_polyfill';
import { serve } from 'std/server';
import { CreateCompletionRequest } from 'openai';

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

  const completionConfig: CreateCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
  };

  return await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      ...corsHeaders,
      Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'text/event-stream',
    },
    body: JSON.stringify(completionConfig),
  });
}

serve(handler);
