const express = require('express');

const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;

  const allReviews = await Review.findAll({
    where: {
      userId: userId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'description']
        },
        include: {
          model: SpotImage,
          where: { preview: true },
          attributes: ['url']
        }
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })

  for (let i = 0; i < allReviews.length; i++) {
    let previewReview = allReviews[i].toJSON();

    let previewImageUrl = previewReview.Spot.SpotImages[0];

    if (!previewImageUrl) {
      previewReview.Spot.previewImage = 'None available!'
    } else {
      previewReview.Spot.previewImage = previewImageUrl.url
    }

    delete previewReview.Spot.SpotImages;

    allReviews[i] = previewReview;
  };

  return res.json({ Reviews: allReviews });
});
