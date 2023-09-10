import crypto from 'crypto';

import { ApiSource } from '~/types/api-source';
import { ClevelandArtWork } from '~/types/cleveland-art-work';
import { ClevelandData } from '~/types/cleveland-data';

export const createClevelandApiUrl = (query: string) => {
  return `https://openaccess-api.clevelandart.org/api/artworks/?q=${query}&has_image=1&limit=100&cc0`;
};

export const mapClevelandToBaseArtWork = (data: ClevelandData) => {
  return data.data.map((item: ClevelandArtWork) => ({
    id: crypto.randomUUID(),
    title: item.title,
    imageUrl: item.images.web.url,
    pageUrl: item.url,
    apiSource: ApiSource.CLEVELAND_MUSEUM_OF_ART,
  }));
};
