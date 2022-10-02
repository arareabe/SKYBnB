const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { ReviewImage } = require('../../db/models');

const router = express.Router();

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
  const deleteImage = await ReviewImage.findByPk(req.params.imageId);

  if (!deleteImage) {
    return res
      .status(404)
      .json({
        message: "Review image couldn't be found",
        statusCode: res.statusCode
      });
  };

  deleteImage.destroy();

  return res
    .status(200)
    .json({
      message: 'Successfully deleted',
      statusCode: res.statusCode
    });
});

module.exports = router;
