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
router.get('/:classId', async (req, res) => {
  const spots = await Spot.findAll({
    where: {
      classId: req.params.classId
    }
  });

  const spotsRes = [];

  for (let i = 0; i < spots.length; i++) {
    let currSpot = spots[i].toJSON();

    const reviewCount = await Review.count({ where: { spotId: currSpot.id } });
    const starSum = await Review.sum('stars', { where: { spotId: currSpot.id } });

    if (!starSum) {
      currSpot.avgRating = 'New'
    } else {
      currSpot.avgRating = (starSum / reviewCount).toFixed(1);
    }

    const previewImage = await SpotImage.findOne({
      where: {
        [Op.and]: [
          { spotId: currSpot.id },
          { preview: true }
        ]
      }
    });

    if (!previewImage) {
      currSpot.previewImage = 'No images available!'
    } else {
      currSpot.previewImage = previewImage.url
    }

    spotsRes.push(currSpot);
  }

  return res.json({ Spots: spotsRes });
});

module.exports = router;
