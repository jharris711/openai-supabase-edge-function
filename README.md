# openai-supabase-edge-function

A function that returns OpenAI Chat Completions. Deployable to Supabase Edge Functions. Uses Deno Javascript runtime env.

# To deploy this function

- Sign up for a Supabase account at [the Supabase homepage](https://supabase.com/)

## Local

- Clone the repo
- Create a `.env.local` in the `supabase` dir
- Run the following command:

  `supabase functions serve --env-file ./supabase/.env.local --no-verify-jwt`

- Use cURL or Postman to make a POST request to [http://localhost:54321/functions/v1/openai](http://localhost:54321/functions/v1/openai)

  ```
    curl -i --location --request POST http://localhost:54321/functions/v1/openai \
  --header 'Content-Type: application/json' \
  --data '{ "messages": [ {"role": "user", "content": "Hello!"} ] }'
  ```

## Deploy to Supabase

- Deploy your function to the Supabase cloud by running:
  ```
  supabase functions deploy --no-verify-jwt openai
  supabase secrets set --env-file ./supabase/.env.local
  ```
- Then, check the function's dashboard for a URL to make `fetch` or other client requests.
- To make things even easier, you can utilize one of the Supabase clients to access and invoke the functions.
