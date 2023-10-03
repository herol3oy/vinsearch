import { requestNYPLData } from '~/utils/request-nypl-data'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const param = String(query.param)

  const data = await requestNYPLData(param as string)

  return data
})
