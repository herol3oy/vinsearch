import { aiChicago } from './ai-chicago';
import { clevaland } from './cleveland';
import { rijks } from './rijks';

const MUSEUM_END_POINTS = [rijks, clevaland, aiChicago];

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const userSearchQueryParam = String(query.param);

  try {
    const museumApiRequests = MUSEUM_END_POINTS.map(async (museumApi) => {
      return await museumApi(userSearchQueryParam);
    });

    const data = await Promise.all(museumApiRequests);

    const mergedData = data.reduce((acc, current) => acc.concat(current), []);

    return {
      data: mergedData,
    };
  } catch (error) {
    return [];
  }
});
