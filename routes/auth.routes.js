const router = require('express').Router();

const {
  register,
  login
} = require('../controllers/auth.controller');

const {
  body
} = require('express-validator');

const validate =
require('../middleware/validate.middleware');

router.post(
  '/register',
  [
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('username').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({
      min: 6
    })
  ],
  validate,
  register
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  validate,
  login
);

module.exports = router;