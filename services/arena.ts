import { get } from '../utils/fetch.ts'; 

const getChannelUrl = (slug: any) => `https://api.are.na/v2/channels/${slug}/?per=1000`;
const getPostByChannel = async (slug: string): Promise<any> => await get(getChannelUrl(slug));
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

export { getChannelPostByTime };