import { requestClevalandData } from '~/utils/request-cleveland-data'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const param = String(query.param)

  const data = await requestClevalandData(param)

  return data
})
