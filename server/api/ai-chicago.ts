import crypto from 'crypto';

import { AiChicagoArtwork } from '~/types/ai-chicago-art-work';
import { ApiSource } from '~/types/api-source';
import { GlobalArtWork } from '~/types/global-art-work';

const createAiChicagoApiUrl = (query: string) =>
  `https://api.artic.edu/api/v1/artworks/search?q=${query}&query[term][is_public_domain]=true&limit=100&page=1&fields=title,image_id,id`;

const createImageUrl = (id: string) =>
  `https://artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;

const createArtWorkUrl = (id: number) => `https://www.artic.edu/artworks/${id}`;

export const aiChicago = async (query: string) => {
  try {
    const res = await fetch(createAiChicagoApiUrl(query));
    const json = await res.json();

    const data: GlobalArtWork[] = json.data.map((item: AiChicagoArtwork) => ({
      id: crypto.randomUUID(),
      title: item.title,
      imageUrl: createImageUrl(item.image_id),
      pageUrl: createArtWorkUrl(item.id),
      apiSource: ApiSource.ART_INSTITUTE_OF_CHICAGO,
    }));

    return data;
  } catch (error) {
    return [];
  }
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const param = query.param;
  const data = await aiChicago(param as string);

  return data;
});
