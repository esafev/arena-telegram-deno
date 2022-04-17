import { post } from '../utils/fetch.ts';
import { sanitize } from '../utils/text.ts';

const getBotUrl = (token: string): string => `https://api.telegram.org/bot${token}/sendMessage`;
const postMessage = (token: string, data: any) => post(getBotUrl(token), data);

enum TemplateTypes {
  ItalicUrl = 'italic-url'
};

const getMessageTemplate = (type: any, data: { title: any, url: string}) => {
  switch (type) {
    default:
    case TemplateTypes.ItalicUrl:
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
      ...getMessageTemplate(TemplateTypes.ItalicUrl, source)
    });
  });
};

export { postMessagesFromArena };