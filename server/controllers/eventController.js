const Event = require('../models/events');
const mongoose = require('mongoose');

const allEvents = async (req, res) => {
    const events = await Event.find({}).sort({ createdAt : -1 });

    // events.forEach(event => {
    //     let id = (event._id).toString();
    //     console.log(id);
    // });

    res.status(201).json({ events });
};

const getEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            "message" : "No such event"
        });
    }

    const event = await Event.findById(id);

    if(!event){
        return res.status(404).json({
            "message" : "No such event"
        });
    }

    res.status(201).json({ event });
};

const createEvent = async (req, res) => {

    const { title, start, end, reg_start, reg_end, venue, description } = req.body;

    const eventExists = await Event.findOne({ title });

    if(eventExists){
        return res.status(401).json({
            "message" : "An Event with the same title already exists"
        });
    }

    const event = new Event({
        title, start, end, reg_start, reg_end, venue, description, createdBy: req.user._id
    });

    await event.save();

    res.status(201).json({
        "message" : "Event Created Successfully"
    });
};

const updateEvent = async (req, res) => {
    const { oldtitle, newtitle, start, end, reg_start, reg_end, venue, description } = req.body;

    const event = await Event.findOne({ title: oldtitle });

    if(!event){
        return res.status(401).json({
            "message" : "No such event found"
        });
    }

    event.title = newtitle; 
    if(start) event.start = start; 
    if(end) event.end = end; 
    if(reg_start) event.reg_start = reg_start; 
    if(reg_end) event.reg_end = reg_end; 
    if(venue) event.venue = venue; 
    if(description) event.description = description; 

    await event.save();

    res.status(201).json({
        "message" : "Event Updated Successfully"
    });
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;

    await Event.findByIdAndDelete(id);

    res.status(201).json({
        "message" : "Event Deleted Successfully"
    });
};


module.exports = {
    allEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
}