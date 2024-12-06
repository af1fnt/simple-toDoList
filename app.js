const express = require('express')
const app = express()
const port = 3000
import authRoutes from './routes/authRoutes.js';

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})