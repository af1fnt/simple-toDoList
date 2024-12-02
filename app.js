const express = require('express')
const app = express()
const port = 3000
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

// Code Here

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})