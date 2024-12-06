const express = require('express')
const app = express()
const port = 3000
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})