import { requestAiChicagoData } from '~/utils/request-ai-chicago-data'
import { requestClevalandData } from '~/utils/request-cleveland-data'
import { requestNYPLData } from '~/utils/request-nypl-data'
import { requestRijksdata } from '~/utils/request-rijks-data'

const MUSEUM_END_POINTS = [
  requestRijksdata,
  requestClevalandData,
  requestAiChicagoData,
  requestNYPLData,
]

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event)
  const userSearchQuery = String(query)

  try {
    const museumApiRequests = MUSEUM_END_POINTS.map(async (museumApi) => {
      return await museumApi(userSearchQuery)
    })

    const data = await Promise.all(museumApiRequests)

    const mergedData = data.reduce((acc, current) => acc.concat(current), [])

    return {
      data: mergedData,
    }
  } catch (error) {
    return []
  }
})
