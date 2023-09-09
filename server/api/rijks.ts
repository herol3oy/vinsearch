import crypto from 'crypto';

import { ApiSource } from '~/types/api-source';
import { GlobalArtWork } from '~/types/global-art-work';
import { RijksArtwork } from '~/types/rijks-art-work';

const createRijksApiUrl = (query: string) =>
  `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.API_RIJKS_TOKEN}&q=${query}&imgonly=true&ps=50`;

export const rijks = async (query: string) => {
  try {
    const res = await fetch(createRijksApiUrl(query));
    const json = await res.json();

    const withAvailableImages: RijksArtwork[] = json.artObjects.filter(
      (artItem: RijksArtwork) => !!artItem.permitDownload,
    );

    const data: GlobalArtWork[] = withAvailableImages.map(
      (item: RijksArtwork) => ({
        id: crypto.randomUUID(),
        title: item.title,
        imageUrl: item.webImage.url,
        pageUrl: item.links.web,
        apiSource: ApiSource.RIJKSMUSEUM,
      }),
    );

    return data;
  } catch (error) {
    return [];
  }
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const param = query.param;
  const data = await rijks(param as string);

  return data;
});
