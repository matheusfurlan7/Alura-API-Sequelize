const cors = require("cors")
const bodyParser = require('body-parser')
const pessoasRouter = require('../routes/pessoasRoute')

module.exports = app => {
  app.use(cors())
  app.use(bodyParser.json())

  app.get('/', (req, res) => {
    res.send('OK')
  })

  app.use(pessoasRouter)
}