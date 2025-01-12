require('dotenv').config({ path: '../.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const config = require('./config/db');
const tableRoutes = require('./routes/table');
const PORT = process.env.PORT_BACKEND || 3000;
const PORT_FRONTEND = process.env.PORT_FRONTEND || 3005

const app = express();

app.use(express.json());

mongoose.connect(config.uri, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('Succefully connected to MongoDB'))
  .catch((err) => console.error('Error while trying to connect to MongoDB :', err));

app.use(cors({
  origin: `http://localhost:${PORT_FRONTEND}`, 
  methods: ['GET', 'POST', 'DELETE'],
}));

app.use('/table', tableRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
