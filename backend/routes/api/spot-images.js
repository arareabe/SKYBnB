const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { SpotImage } = require('../../db/models');

const router = express.Router();

// Delete a Spot Image

router.delete('/:imageId', requireAuth, async (req, res) => {

  const deleteImage = await SpotImage.findByPk(req.params.imageId);

  if (!deleteImage) {
    return res
      .status(404)
      .json({
        message: "Spot Image couldn't be found",
        statusCode: res.statusCode
      });
  };

  await deleteImage.destroy();

  return res
    .status(200)
    .json({
      message: 'Successfully deleted',
      statusCode: res.statusCode
    });
});

module.exports = router;
