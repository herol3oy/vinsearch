import crypto from 'crypto'

import { ApiSource } from '~/types/api-source'
import { GlobalArtWork } from '~/types/global-art-work'
import { NYPL } from '~/types/nypl'
import { NYPLResponseItem } from '~/types/nypl-response-item'

import { createNYPLApiUrl, createNYPLImageUrl } from './factory/nypl'
import { fetcher } from './fetcher'

export const requestNYPLData = async (query: string) => {
  try {
    const json = await fetcher<NYPL>(createNYPLApiUrl(query), {
      headers: {
        Authorization: `Token token="${process.env.API_NYPL_TOKEN}"`,
      },
    })

    const NYPLItem = (item: NYPLResponseItem) => ({
      id: crypto.randomUUID(),
      title: item.title,
      imageUrl: createNYPLImageUrl(item.imageID),
      pageUrl: item.itemLink,
      apiSource: ApiSource.NYPL,
    })

    if (json.nyplAPI.response.result instanceof Array) {
      const data: GlobalArtWork[] = json.nyplAPI.response.result.map((item) =>
        NYPLItem(item),
      )

      return data
    } else {
      const data: GlobalArtWork[] = [json.nyplAPI.response.result].map((item) =>
        NYPLItem(item),
      )

      return data
    }
  } catch (error) {
    return []
  }
}
