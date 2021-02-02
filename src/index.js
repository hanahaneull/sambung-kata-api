const { data } = require('../kbbi')
const express = require('express')
const filter = require('lodash.filter')
const app = express()

app.get('/sk', async (req, res) => {
  if (!req.query.q)
    return res.send({
      info: 'Selamat datang di cheat sambung-kata API :vrotttt',
      total: `Kami mengindex ${data.length} kata`,
      tutorial:
        'Gunakan q query untuk mencari kata, dan gunakan l query untuk mencari kata dengan minimal hurufnya',
      contoh: 'https://api.hana.uno/sk?q=bi&l=10',
      author: 'https://github.com/hanahaneull/'
    })
  res.send(
    filter(data, x => x.word.startsWith(req.query.q)).sort(
      (a, b) => b.word.length - a.word.length
    )
  )
})

app.use((req, res) => {
  res.status(404).redirect('/')
})

app.listen(8520, () => {
  console.log('Api started on port 8520')
})
