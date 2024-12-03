const express = require('express')
const app = express()
const port = 3000
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

app.use('/api/auth', authRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`)
})