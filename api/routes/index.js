const cors = require("cors")
const bodyParser = require('body-parser')
const pessoasRouter = require('../routes/pessoasRoute')
const niveisRouter = require('./niveisRoute')
const turmasRouter = require('./turmasRoute')

module.exports = app => {
  app.use(
    cors(),
    bodyParser.json()
  )

  app.use(
    pessoasRouter,
    niveisRouter,
    turmasRouter
  )
}