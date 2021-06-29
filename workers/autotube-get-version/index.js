const yaml = require('js-yaml')
const repoBaseURL = 'https://dppst.s3-website.fr-par.scw.cloud/autotube/'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest (event) {
  // in cache
  const cacheKey = repoBaseURL
  const cache = caches.default
  // await cache.delete(cacheKey)
  let response = await cache.match(cacheKey)
  // let response = false

  if (!response) {
    /* const now = new Date()
    now.setHours(now.getHours() + 1)
    const expires = now.toUTCString()
     */
    const version = await getLatestVersion()
    const r = { version }

    response = new Response(JSON.stringify(r), {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS'
      }
    })
    event.waitUntil(cache.put(cacheKey, response.clone()))
  }
  return response
}

// get latest
const getLatestVersion = async () => {
  const latest = await fetch(`${repoBaseURL}latest.yml`)
    .then(res => res.blob())
    .then(blob => blob.text())
    .then((yamlAsString) => { return yamlAsString })
  const j = yaml.load(latest)
  return j.version
}
