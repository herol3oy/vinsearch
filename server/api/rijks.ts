import { GlobalArtWork } from '~/types/global-art-work';
import { RijksArtwork } from '~/types/rijks-art-work';

const createRijksApiUrl = (query: string) =>
  `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.API_RIJKS_TOKEN}&q=${query}&imgonly=true&ps=50`;

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const res = await fetch(createRijksApiUrl(query.param as string));
    const json = await res.json();

    const withAvailableImages: RijksArtwork[] = json.artObjects.filter(
      (artItem: RijksArtwork) => !!artItem.permitDownload,
    );

    const data: GlobalArtWork[] = withAvailableImages.map(
      (item: RijksArtwork) => ({
        title: item.title,
        imageUrl: item.webImage.url,
        pageUrl: item.links.web,
      }),
    );

    return { data };
  } catch (error) {
    return [];
  }
});
