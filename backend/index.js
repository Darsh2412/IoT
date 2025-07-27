require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mqttHandler = require('./src/mqttHandler');
const dataRoutes = require('./src/routes/dataRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  mqttHandler();
}).catch(err => console.error('MongoDB connection error:', err));