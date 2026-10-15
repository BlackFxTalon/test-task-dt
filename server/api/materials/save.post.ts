export default defineEventHandler((event) => {
  const { alias } = useRuntimeConfig(event)
  return proxyRequest(event, `https://naukatv.ru/api/test/materials/${alias}/save`)
})
