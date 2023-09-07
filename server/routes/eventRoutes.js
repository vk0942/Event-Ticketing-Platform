const express = require('express');

const router = express.Router();

const { auth } = require('../middlewares/auth');

const { allEvents, getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

router.get('/', allEvents);

router.get('/:id', getEvent);

router.post('/create', auth, createEvent);

router.post('/update', updateEvent);

router.delete('/delete/:id', deleteEvent);

module.exports = router;