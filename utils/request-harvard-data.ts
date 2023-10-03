import { GlobalArtWork } from '~/types/global-art-work'
import { HarvardData } from '~/types/harvard-data'
import { HarvardRecord } from '~/types/harvard-record'

import { createHardvarApiUrl, mapHarvardToBaseArtWork } from './factory/harvard'
import { fetcher } from './fetcher'

export const requestHarvardData = async (query: string) => {
  try {
    const json = await fetcher<HarvardData>(createHardvarApiUrl(query))

    const withAvailableImages: HarvardRecord[] = json.records.filter(
      (item) => item.images.length,
    )

    const data: GlobalArtWork[] = mapHarvardToBaseArtWork(withAvailableImages)

    return data
  } catch (error) {
    return []
  }
}
