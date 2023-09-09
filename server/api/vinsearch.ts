import { aiChicago } from './ai-chicago';
import { clevaland } from './cleveland';
import { rijks } from './rijks';

const ALL_API_END_POINTS = [rijks, clevaland, aiChicago];

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const param = query.param as string;

  try {
    const apiRequests = ALL_API_END_POINTS.map(async (api) => await api(param));

    const data = await Promise.all(apiRequests);

    const mergedData = data.reduce((acc, current) => acc.concat(current), []);

    return { data: mergedData };
  } catch (error) {
    return [];
  }
});
