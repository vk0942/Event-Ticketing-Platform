const express = require('express');

const router = express.Router();

const { allEvents, getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

router.get('/', allEvents);

router.get('/:id', getEvent);

router.post('')

router.post('/create', createEvent);

router.post('/update', updateEvent);

router.delete('/delete/:id', deleteEvent);

module.exports = router;