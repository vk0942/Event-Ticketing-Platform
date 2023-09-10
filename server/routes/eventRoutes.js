const express = require('express');

const router = express.Router();

const { auth } = require('../middlewares/auth');

const { allEvents, getEvent, createEvent, updateEvent, deleteEvent, bookEvent } = require('../controllers/eventController');

router.get('/', allEvents);

router.get('/:id', getEvent);

router.post('/create', auth, createEvent);

router.post('/update', updateEvent);

router.delete('/delete/:id', deleteEvent);

router.post('/book-event/:event_id/:user_id', bookEvent);

module.exports = router;