import { ClevelandArtWork } from '~/types/cleveland-art-work';
import { GlobalArtWork } from '~/types/global-art-work';

const createClevelandApiUrl = (query: string) =>
  `https://openaccess-api.clevelandart.org/api/artworks/?q=${query}&has_image=1&limit=100&cc0`;

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const res = await fetch(createClevelandApiUrl(query.param as string));
    const json = await res.json();

    const data: GlobalArtWork[] = json.data.map((item: ClevelandArtWork) => ({
      title: item.title,
      imageUrl: item.images.web.url,
      pageUrl: item.url,
    }));

    return { data };
  } catch (error) {
    return [];
  }
});
