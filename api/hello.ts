import { Status } from 'https://deno.land/std/http/http_status.ts';

const sanitize = (text: string): string => text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');

const post = (url: string, data: any) => fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  },
);

const get = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });

  return await response.json();
};

const templateTypes = {
  italicUrl: 'italic-url'
};

const getBotUrl = (token: string): string => `https://api.telegram.org/bot${token}/sendMessage`;
const postMessage = (token: string, data: any) => post(getBotUrl(token), data);

const getMessageTemplate = (type: any, data: { title: any, url: string}) => {
  switch (type) {
    default:
    case templateTypes.italicUrl:
      return {
        text: `[_${sanitize(data.title)}_](${data.url})`,
        parse_mode: 'MarkdownV2'
      };
  };
};

const postMessagesFromArena = async ({ posts, tgToken, tgChannel }: any) => {
  await posts.forEach(async (post: any) => {
    const { source } = post;

    if (!source?.url || !source?.title) return;

    await postMessage(tgToken, {
      chat_id: tgChannel,
      ...getMessageTemplate(templateTypes.italicUrl, source)
    });
  });
};

const getChannelUrl = (slug: any) => `https://api.are.na/v2/channels/${slug}/?per=1000`;
const getPostByChannel = async (slug: any): Promise<any> => await get(getChannelUrl(slug));
const getPastDate = (diff: number): any => new Date().setMinutes(new Date().getMinutes() - diff);

const getChannelPostByTime = async ({ slug, diff }: any) => {
  const { contents } = await getPostByChannel(slug);
  if (!contents) return [];

  const pastDate = getPastDate(diff);

  return contents.filter((item: any) => {
    const createdDate = new Date(item.created_at);

    if (createdDate >= pastDate) {
      return item;
    }
  });
};

export default async (req: Request) => {
  const searchParams = new URLSearchParams(req.url);

  const slug = searchParams.get('slug');
  const tgToken = searchParams.get('tgToken');
  const tgChannel = searchParams.get('tgChannel');

  // if (!slug || !tgToken || !tgChannel) return new Response(null, { status: Status.BadRequest });
  const posts = await getChannelPostByTime({ slug: 'good-reads-latvg2mcm4w', diff: 15 });
  await postMessagesFromArena({ posts, tgToken, tgChannel });
  
  return new Response(`Hello, from Deno v${Deno.version.deno}!`)
};