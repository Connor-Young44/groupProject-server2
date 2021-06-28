require('dotenv').config()
const express = require("express")
const port = 4000

const app = express()
app.use(express.json())



app.listen(port,() => console.log(`server listening on ${port}`))