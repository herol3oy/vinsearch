import { requestAiChicagoData } from '~/utils/request-ai-chicago-data';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const param = String(query.param);

  const data = await requestAiChicagoData(param);

  return data;
});
