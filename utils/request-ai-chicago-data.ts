import { AiChicagoData } from '~/types/ai-chicago-data';
import { GlobalArtWork } from '~/types/global-art-work';

import {
  createAiChicagoApiUrl,
  mapAiChicagoToBaseArtWork,
} from './factory/ai-chicago';

export const requestAiChicagoData = async (query: string) => {
  try {
    const json = await fetcher<AiChicagoData>(createAiChicagoApiUrl(query));

    const data: GlobalArtWork[] = mapAiChicagoToBaseArtWork(json.data);

    return data;
  } catch (error) {
    return [];
  }
};
