const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

router.get('/', async (req, res) => {
  const data = await Data.find().sort({ timestamp: -1 }).limit(1000);
  res.json(data);
});

module.exports = router;