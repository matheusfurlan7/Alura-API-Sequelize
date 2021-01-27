const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/teste', (req, res) => res
  .status(200)
  .send({
    mensagem: "boas-vindas á API"
  }))

let port = process.env.PORT || 3000
app.listen(port, () => {console.log(`API rodando na porta ${port}`)})