import type { H3Event } from 'h3';

export const materialsUrl = (event: H3Event, path = '') => {
  const { alias, apiBase } = useRuntimeConfig(event);
  return `${apiBase}/${alias}${path}`;
};
