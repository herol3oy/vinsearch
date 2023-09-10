import crypto from 'crypto';

import { AiChicagoArtwork } from '~/types/ai-chicago-art-work';
import { ApiSource } from '~/types/api-source';

export const createAiChicagoApiUrl = (query: string) => {
  return `https://api.artic.edu/api/v1/artworks/search?q=${query}&query[term][is_public_domain]=true&limit=100&page=1&fields=title,image_id,id`;
};

export const createAiChicagoImageUrl = (id: string) => {
  return `https://artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
};

export const createAiChicagoArtWorkUrl = (id: number) => {
  return `https://www.artic.edu/artworks/${id}`;
};

export const mapAiChicagoToBaseArtWork = (
  aiChicagoData: AiChicagoArtwork[],
) => {
  return aiChicagoData.map((item) => ({
    id: crypto.randomUUID(),
    title: item.title,
    imageUrl: createAiChicagoImageUrl(item.image_id),
    pageUrl: createAiChicagoArtWorkUrl(item.id),
    apiSource: ApiSource.ART_INSTITUTE_OF_CHICAGO,
  }));
};
