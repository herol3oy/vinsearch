import crypto from 'crypto';

import { ApiSource } from '~/types/api-source';
import { ClevelandArtWork } from '~/types/cleveland-art-work';
import { GlobalArtWork } from '~/types/global-art-work';

const createClevelandApiUrl = (query: string) =>
  `https://openaccess-api.clevelandart.org/api/artworks/?q=${query}&has_image=1&limit=100&cc0`;

export const clevaland = async (query: string) => {
  try {
    const res = await fetch(createClevelandApiUrl(query));
    const json = await res.json();

    const data: GlobalArtWork[] = json.data.map((item: ClevelandArtWork) => ({
      id: crypto.randomUUID(),
      title: item.title,
      imageUrl: item.images.web.url,
      pageUrl: item.url,
      apiSource: ApiSource.CLEVELAND_MUSEUM_OF_ART,
    }));

    return data;
  } catch (error) {
    return [];
  }
};
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const param = query.param;
  const data = await clevaland(param as string);

  return data;
});
