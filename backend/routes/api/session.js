const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential').exists({ checkFalsy: true }).notEmpty().withMessage('Please provide a valid email or username.'),
  check('password').exists({ checkFalsy: true }).withMessage('Please provide a password.'),
  handleValidationErrors
];

// Login user
router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    return res
      .status(401)
      .json({
        message: 'Invalid Credentials',
        statusCode: res.statusCode,
        errors: ['The provided credentials were invalid!']
      });
  };

  const token = await setTokenCookie(res, user);

  const userRes = user.toJSON();

  userRes.token = token;

  return res.json(userRes);
});

router.delete('/', (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject()
    });
  } else {
    return res.json({});
  }
});

module.exports = router;
