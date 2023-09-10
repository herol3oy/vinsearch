import { GlobalArtWork } from '~/types/global-art-work';

import {
  createAiChicagoApiUrl,
  mapAiChicagoToBaseArtWork,
} from './factory/ai-chicago';

export const requestAiChicagoData = async (query: string) => {
  try {
    const res = await fetch(createAiChicagoApiUrl(query));
    const json = await res.json();

    const data: GlobalArtWork[] = mapAiChicagoToBaseArtWork(json.data);

    return data;
  } catch (error) {
    return [];
  }
};
