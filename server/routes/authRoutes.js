const express = require('express');
const router = express.Router();

const { signup, signin, forgotPassword, resetPassword, emailVerification } = require('../controllers/authController');

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/forgot-password', forgotPassword);

router.post('/email-verification/:verificationToken', emailVerification);

router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;