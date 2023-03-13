const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();
const { Op, Model } = require('sequelize');

// Get all Spots from search results
router.get('/search/:searchWord', async (req, res) => {
  const spots = await Spot.findAll({
    where: {
      [Op.or]: [
        { address: req.params.searchWord},
        { city: req.params.searchWord},
        { state: req.params.searchWord},
        { name: req.params.searchWord}
      ]
    }
  })

  const spotsRes = [];

  for (let i = 0; i < spots.length; i++) {
    let currSpot = spots[i].toJSON();

    const reviewCount = await Review.count({ where: { spotId: currSpot.id } });
    const starSum = await Review.sum('stars', { where: { spotId: currSpot.id } });

    if (!starSum) {
      currSpot.avgRating = 'Not yet rated'
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
})

module.exports = router;
