import { Status } from 'https://deno.land/std/http/http_status.ts';
import { serve } from 'https://deno.land/std@0.114.0/http/server.ts';

import { isAuth } from './utils/auth.ts';

import { getChannelPostByTime } from './services/arena.ts';
import { postMessagesFromArena } from './services/telegram.ts';

serve(async (req: Request) => {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);

  const slug = searchParams.get('slug');
  const tgToken = searchParams.get('tgToken');
  const tgChannel = searchParams.get('tgChannel');

  if (!isAuth(req)) return new Response('Unauthorized', {
    status: Status.Unauthorized
  });

  if (!slug || !tgToken || !tgChannel) return new Response('Missing query params', { 
    status: Status.BadRequest 
  });
  
  const posts = await getChannelPostByTime({ slug, diff: 60 });
  await postMessagesFromArena({ posts, tgToken, tgChannel });
  
  return new Response(`Send ${posts.length} posts`);
})