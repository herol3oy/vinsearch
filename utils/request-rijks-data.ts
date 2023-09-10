import { ArtObject } from '~/types/art-object'
import { GlobalArtWork } from '~/types/global-art-work'
import { RijksArtwork } from '~/types/rijks-art-work'

import { createRijksApiUrl, mapRijksToGlobalArtWork } from './factory/rijks'
import { fetcher } from './fetcher'

export const requestRijksdata = async (query: string) => {
  try {
    const json = await fetcher<ArtObject>(createRijksApiUrl(query))

    const withAvailableImages: RijksArtwork[] = json.artObjects.filter(
      (artItem: RijksArtwork) => !!artItem.permitDownload,
    )

    const data: GlobalArtWork[] = mapRijksToGlobalArtWork(withAvailableImages)

    return data
  } catch (error) {
    return []
  }
}
