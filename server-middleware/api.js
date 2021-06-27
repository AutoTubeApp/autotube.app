const app = require('express')()
const yaml = require('js-yaml')
const axios = require('axios')
const repoBaseURL = 'https://dppst.s3-website.fr-par.scw.cloud/autotube/'

// local var
const cache = {}

// return last package
app.get('/latest-packages', async (req, res) => {
  const key = 'latestPackages'
  const ttl = 3600

  // in cache
  if (Object.keys(cache).includes(key)) {
    const value = cache[key]
    if (value.data.linux && value.data.mac && value.data.windows && (value.ts + ttl > Math.floor(Date.now() / 1000))) {
      res.json(value.data)
      return
    }
  }

  // pas en cache (ce qui ne devrait pas arriver sauf si le daemon plante)
  try {
    const r = await getAllLatest()
    res.json(r)
  } catch (e) {
    res.status(500).json(`"error": ${e} `)
  }
})

// get all latest and populate cache
const getAllLatest = async () => {
  const key = 'latestPackages'
  const [l, m, w] = await Promise.all([
    getLatest('linux'),
    getLatest('mac'),
    getLatest('windows')]
  )

  const r = {
    linux: l.path,
    mac: m.path,
    windows: w.path
  }

  // put in cache
  cache[key] = {
    ts: Math.floor(Date.now() / 1000),
    data: r
  }
  return r
}

// get latest
const getLatest = async (os) => {
  let filename
  if (os === 'windows') { filename = 'latest.yml' } else { filename = `latest-${os}.yml` }
  const latest = await axios.get(`${repoBaseURL}${filename}`)
  return yaml.load(latest.data)
}

// daemon
getAllLatest().then(() => setInterval(async () => await getAllLatest(), 3000000))

module.exports = app
