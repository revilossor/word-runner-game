const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/images', express.static('images'))
app.use('/fonts', express.static('fonts'))

const port = 8000

app.listen(port, () => {
  console.log(`asset server listening on ${port}`)
  console.log('\t/images')
  console.log('\t/fonts')
})
