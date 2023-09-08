import { AiChicagoArtwork } from '~/types/ai-chicago-art-work';
import { GlobalArtWork } from '~/types/global-art-work';

const createAiChicagoApiUrl = (query: string) =>
  `https://api.artic.edu/api/v1/artworks/search?q=${query}&query[term][is_public_domain]=true&limit=100&page=1&fields=title,image_id,id`;

const createImageUrl = (id: string) =>
  `https://artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;

const createArtWorkUrl = (id: number) => `https://www.artic.edu/artworks/${id}`;

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const res = await fetch(createAiChicagoApiUrl(query.param as string));
    const json = await res.json();

    const data: GlobalArtWork[] = json.data.map((item: AiChicagoArtwork) => ({
      title: item.title,
      imageUrl: createImageUrl(item.image_id),
      pageUrl: createArtWorkUrl(item.id),
    }));

    return { data };
  } catch (error) {
    return [];
  }
});
