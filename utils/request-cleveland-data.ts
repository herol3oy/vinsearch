import { ClevelandData } from '~/types/cleveland-data';
import { GlobalArtWork } from '~/types/global-art-work';

import {
  createClevelandApiUrl,
  mapClevelandToBaseArtWork,
} from './factory/cleveland';

export const requestClevalandData = async (query: string) => {
  try {
    const res = await fetch(createClevelandApiUrl(query));
    const json: ClevelandData = await res.json();

    const data: GlobalArtWork[] = mapClevelandToBaseArtWork(json);

    return data;
  } catch (error) {
    return [];
  }
};
