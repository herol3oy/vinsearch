import { requestHarvardData } from '~/utils/request-harvard-data'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const param = String(query.param)

  const data = await requestHarvardData(param)

  return data
})
