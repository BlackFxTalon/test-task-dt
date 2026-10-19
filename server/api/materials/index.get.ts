export default defineEventHandler((event) => {
  return sendProxy(event, materialsUrl(event));
});
