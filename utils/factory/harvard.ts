import crypto from 'crypto'

import { ApiSource } from '~/types/api-source'
import { HarvardRecord } from '~/types/harvard-record'

export const createHardvarApiUrl = (query: string) => {
  return `https://api.harvardartmuseums.org/object?apikey=${process.env.API_HARVARD_TOKEN}&q=${query}&hasimage=1&size=100`
}

export const mapHarvardToBaseArtWork = (data: HarvardRecord[]) => {
  return data.map((item) => ({
    id: crypto.randomUUID(),
    title: item.title,
    imageUrl: item.images[item.images.length - 1].baseimageurl,
    pageUrl: item.url,
    apiSource: ApiSource.HARVARD,
  }))
}
