import { ApiSource } from '~/types/api-source';

import { aiChicago } from './ai-chicago';
import { clevaland } from './cleveland';
import { rijks } from './rijks';

const ALL_API_END_POINTS = {
  [ApiSource.ALL_SOURCES]: [rijks, clevaland, aiChicago],
  [ApiSource.ART_INSTITUTE_OF_CHICAGO]: [aiChicago],
  [ApiSource.CLEVELAND_MUSEUM_OF_ART]: [clevaland],
  [ApiSource.RIJKSMUSEUM]: [rijks],
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const [param, apiSource] = String(query.param).split(',') as [
    string,
    ApiSource,
  ];
  try {
    let apiEndpoints = [];

    if (apiSource === ApiSource.ALL_SOURCES) {
      apiEndpoints = ALL_API_END_POINTS[apiSource];
    } else if (ALL_API_END_POINTS[apiSource]) {
      apiEndpoints = ALL_API_END_POINTS[apiSource];
    } else {
      return [];
    }

    const apiRequests = apiEndpoints.map(async (api) => await api(param));

    const data = await Promise.all(apiRequests);

    const mergedData = data.reduce((acc, current) => acc.concat(current), []);

    return { data: mergedData };
  } catch (error) {
    return [];
  }
});
