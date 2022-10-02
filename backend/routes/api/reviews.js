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


// Add an Image to a Review based on the Review's ID
router.post('/:reviewId/images', requireAuth, async (req, res) => {

  const { url } = req.body;

  const findReview = await Review.findByPk(req.params.reviewId);

  if (!findReview) {
    return res
      .status(404)
      .json({
        message: "Review couldn't be found",
        statusCode: res.statusCode
      });
  };

  const images = await ReviewImage.findAll({
    where: {
      reviewId: findReview.id
    }
  });

  if(images.length >= 10) {
    return res
      .status(403)
      .json({
        message: 'Maximum number of images for this resource was reached',
        statusCode: res.statusCode
      })
  };

  const newImage = await ReviewImage.create({
    reviewId: findReview.id,
    url
  });

  return res.json({
    id: newImage.id,
    url
  });
});

// Edit a Review
router.put('/:reviewId', requireAuth, async (req, res) => {

  const findReview = await Review.findByPk(req.params.reviewId);
  const { review, stars } = req.body;

  if (!findReview) {
    return res
      .status(404)
      .json({
        message: "Review couldn't be found",
        statusCode: res.statusCode
      });
  };

  if (!review || !stars) {
    return res
      .status(400)
      .json({
        message: 'Validation Error',
        statusCode: res.statusCode,
        errors: [{
          review: 'Review text is required',
          stars: 'Stars must be an integer from 1 to 5'
        }]
      });
  };

  findReview.review = review;
  findReview.stars = stars;
  findReview.save();

  return res.json(findReview);
});

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {

  const findReview = await Review.findByPk(req.params.reviewId);

  if (!findReview) {
    return res
      .status(404)
      .json({
        message: "Review couldn't be found",
        statusCode: res.statusCode
      });
  };

  await findReview.destroy();

  return res
    .status(200)
    .json({
      message: 'Successfully deleted',
      statusCode: res.statusCode
    });
});



module.exports = router;
