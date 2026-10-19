export default defineEventHandler(async (event) => {
  return sendProxy(event, materialsUrl(event, '/save'), {
    fetchOptions: {
      method: 'POST',
      body: await readRawBody(event),
      headers: { 'content-type': 'application/json' }
    }
  });
});
