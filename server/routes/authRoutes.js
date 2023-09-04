const express = require('express');
const router = express.Router();

const { signup, signin, forgotPassword, resetPassword, emailVerification, deleteAccount } = require('../controllers/authController');

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/forgot-password', forgotPassword);

router.post('/email-verification/:verificationToken', emailVerification);

router.post('/reset-password/:resetToken', resetPassword);

router.delete('/delete-account/:id', deleteAccount);

module.exports = router;