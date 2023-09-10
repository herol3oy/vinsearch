import { requestRijksdata } from '~/utils/request-rijks-data'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const param = String(query.param)

  const data = await requestRijksdata(param as string)

  return data
})
