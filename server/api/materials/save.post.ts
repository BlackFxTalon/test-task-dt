export default defineEventHandler((event) => {
  const { alias, apiBase } = useRuntimeConfig(event);
  return proxyRequest(event, `${apiBase}/${alias}/save`);
});
