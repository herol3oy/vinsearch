import { GlobalArtWork } from '~/types/global-art-work';
import { RijksArtwork } from '~/types/rijks-art-work';

import { createRijksApiUrl, mapRijksToGlobalArtWork } from './factory/rijks';

export const requestRijksdata = async (query: string) => {
  try {
    const res = await fetch(createRijksApiUrl(query));
    const json = await res.json();

    const withAvailableImages: RijksArtwork[] = json.artObjects.filter(
      (artItem: RijksArtwork) => !!artItem.permitDownload,
    );

    const data: GlobalArtWork[] = mapRijksToGlobalArtWork(withAvailableImages);

    return data;
  } catch (error) {
    return [];
  }
};
