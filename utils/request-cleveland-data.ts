import { ClevelandData } from '~/types/cleveland-data';
import { GlobalArtWork } from '~/types/global-art-work';

import {
  createClevelandApiUrl,
  mapClevelandToBaseArtWork,
} from './factory/cleveland';
import { fetcher } from './fetcher';

export const requestClevalandData = async (query: string) => {
  try {
    const json = await fetcher<ClevelandData>(createClevelandApiUrl(query));

    const data: GlobalArtWork[] = mapClevelandToBaseArtWork(json);

    return data;
  } catch (error) {
    return [];
  }
};
