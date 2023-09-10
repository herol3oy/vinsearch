import { ApiSource } from '~/types/api-source';
import { RijksArtwork } from '~/types/rijks-art-work';

export const createRijksApiUrl = (query: string) => {
  return `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.API_RIJKS_TOKEN}&q=${query}&imgonly=true&ps=50`;
};

export const mapRijksToGlobalArtWork = (data: RijksArtwork[]) => {
  return data.map((item: RijksArtwork) => ({
    id: crypto.randomUUID(),
    title: item.title,
    imageUrl: item.webImage.url,
    pageUrl: item.links.web,
    apiSource: ApiSource.RIJKSMUSEUM,
  }));
};
