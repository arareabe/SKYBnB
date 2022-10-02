const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');

const router = express.Router();

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {

  const allBookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ['description', 'createdAt', 'updatedAt']
        }
      }
    ]
  });

  for (let i = 0; i < allBookings.length; i++) {
    let currBooking = allBookings[i].toJSON();

    const bookingPrev = await SpotImage.findONe({
      where: {
        preview: true,
        spotId: currBooking.spotId
      }
    });

    if (!bookingPrev) {
      currBooking.Spot.previewImage = 'None available!'
    } else {
      currBooking.Spot.previewImage = bookingPrev.url
    }

    allBookings[i] = currBooking;
  };

  return res.json({ Bookings: allBookings });
});
