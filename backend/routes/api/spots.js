const express = require('express');

const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {

  const userId = req.user.id;

  const spots = await Spot.findAll({
    where: {
      ownerId: userId
    }
  });

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
});

// Get details of a Spot from an ID
router.get('/:spotId', async (req, res) => {
  const spotDetails = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview']
      }
    ]
  });

  if (!spotDetails) {
    return res
      .status(404)
      .json({
        message: "Spot couldn't be found",
        statueCode: res.statusCode
      })
  };

  const reviewCount = await Review.count({ where: { spotId: spotDetails.id } });

  const starSum = await Review.sum('stars', {
    where: { spotId: spotDetails.id }
  });

  const detailsRes = spotDetails.toJSON();

  if (!starSum) {
    detailsRes.avgRating = 'Not yet rated'
  } else {
    detailsRes.avgRating = (starSum / reviewCount).toFixed(1);
    detailsRes.numReviews = reviewCount;
  }

  return res.json(detailsRes)
});

// Get all Reviews by a Spot's ID
router.get('/:spotId/reviews', async (req, res) => {
  const findSpot = await Spot.findByPk(req.params.spotId);

  if (!findSpot) {
    return res
      .status(404)
      .json({
        message: "Spot couldn't be found",
        statusCode: res.statusCode
      });
  };

  const allReviews = await Review.findAll({
    where: {
      spotId: findSpot.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });

  return res.json({ Reviews: allReviews });
});

// Get all Bookings for a Spot based on the Spot's ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const findSpot = await Spot.findByPk(req.params.spotId);

  if (!findSpot) {
    return res
      .status(404)
      .json({
        message: "Spot couldn't be found",
        statusCode: res.statusCode
      });
  };

  const ownAllBookings = await Booking.findAll({
    where: {
      spotId: findSpot.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });

  const guestAllBookings = await Booking.findAll({
    where: {
      spotId: findSpot.id
    },
    attributes: ['spotId', 'startDate', 'endDate']
  });

  if (req.user.id === findSpot.ownerId) {
    return res.json ({ Bookings: ownAllBookings })
  } else {
    return res.json ({ Bookings: guestAllBookings })
  };
});


// Create a Booking from a Spot based on the Spot's ID
router.post('/:spotId/bookings', requireAuth, async (req, res) =>{
  const { startDate, endDate } = req.body;

  const findSpot = await Spot.findByPk(req.params.spotId);

  if (!findSpot) {
    return res
      .status(404)
      .json({
        message: "Spot couldn't be found",
        statusCode: res.statusCode
      });
  };

  const allBookings = await Booking.findAll({
    where: {
      spotId: findSpot.id
    }
  });

  if (endDate <= startDate) {
    return res
      .status(400)
      .json({
        message: 'Validation Error',
        statusCode: res.statusCode,
        errors: [{
          endDate: 'endDate cannot be on or before startDate'
        }]
      })
  };

  for (let i = 0; i < allBookings.length; i++) {
    if (allBookings[i].startDate >= startDate && allBookings[i].endDate <= endDate || allBookings[i].startDate <= startDate && allBookings[i].endDate >= endDate) {
      return res
        .status(403)
        .json({
          message: 'Sorry, this spot is already booked for the specified dates',
          statusCode: 403,
          errors: [{
            startDate: 'Start date conflicts with an already existing booking',
            endDate: 'End date conflicts with an already existing booking'
          }]
        })
    }
  };

  const createBooking = await Booking.create({
    spotId: findSpot.id,
    userId: req.user.id,
    startDate,
    endDate
  });

  return res.json(createBooking);
});

// Create a Review for a Spot based on the Spot's ID

// Add an Image to a Spot based on the Spot's ID
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res
      .status(404)
      .json({
        message: "Spot couldn't be found",
        statusCode: res.statusCode
      });
  };

  const newImage = await SpotImage.create({
    spotId: spot.id,
    url,
    preview
  });

  return res.json({
    id: newImage.id,
    url,
    preview
  });
});

// Create a Spot
router.post('/', requireAuth, async (req, res, next) => {

  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
    return res
      .status(400)
      .json({
        message: 'Validation Error',
        statusCode: 400,
        errors: [{
          address: 'Street address is required',
          city: 'City is required',
          state: 'State is required',
          country: 'Country is required',
          lat: 'Latitude is not valid',
          lng: 'Longitude is not valid',
          name: 'Name must be less than 50 characters',
          description: 'Description is required',
          price: 'Price per day is required'
        }]
    });
  };

  const createdSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  });

  return res.json(createdSpot);
});

// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  if (!spot) {
    return res
      .status(404)
      .json({
        message: "Spot couldn't be found",
        statueCode: res.statusCode
      })
  };

  if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
    return res.status(400).json({
      message: 'Validation Error',
      statusCode: 400,
      errors: [{
        address: 'Street address is required',
        city: 'City is required',
        state: 'State is required',
        country: 'Country is required',
        lat: 'Latitude is not valid',
        lng: 'Longitude is not valid',
        name: 'Name must be less than 50 characters',
        description: 'Description is required',
        price: 'Price per day is required'
      }]
    });
  };

  spot.address = address
  spot.city = city
  spot.state = state
  spot.country = country
  spot.lat = lat
  spot.lng = lng
  spot.name = name
  spot.description = description
  spot.price = price
  spot.save();

  return res.json(spot);
});

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const deleteSpot = await Spot.findByPk(req.params.spotId);
  if (!deleteSpot) {
    return res
      .status(404)
      .json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }

  await deleteSpot.destroy();

  return res
    .status(200)
    .json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
})

module.exports = router;
