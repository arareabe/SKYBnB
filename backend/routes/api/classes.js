const express = require('express');

const { Spot, Review, SpotImage, Class } = require('../../db/models');

const router = express.Router();
const { Op, Model } = require('sequelize');

// Get All Classes
router.get('/', async (req, res) => {
  const classes = await Class.findAll();

  return res.json({ Classes: classes })
});

// Get All Questions by Class ID


module.exports = router;
