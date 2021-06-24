const app = require('express')()
const yaml = require('js-yaml')
const axios = require('axios')
const repoBaseURL = 'https://dppst.s3-website.fr-par.scw.cloud/autotube/'
const cache = {}

// return last package
app.get('/latest-packages', async (req, res) => {
  const key = 'latestPackages'
  const ttl = 3600
  // in cache
  if (Object.keys(cache).includes(key)) {
    const value = cache[key]
    if (value.ts + ttl > Math.floor(Date.now() / 1000)) {
      res.json(value.data)
      return
    }
  }
  // pas en cache
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

  res.json(r)
})

// get latest
const getLatest = async (os) => {
  let filename
  if (os === 'windows') { filename = 'latest.yml' } else { filename = `latest-${os}.yml` }
  const latest = await axios.get(`${repoBaseURL}${filename}`)
  return yaml.load(latest.data)
}

module.exports = app
