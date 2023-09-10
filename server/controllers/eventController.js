const Event = require('../models/events');
const mongoose = require('mongoose');

let errors = "";

const allEvents = async (req, res) => {
    
    const events = await Event.find({}).sort({ createdAt : -1 });

    res.status(200).json({ events });
};

const getEvent = async (req, res) => {
    
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        errors = "No such event";
        return res.status(404).json({ errors });
    }

    const event = await Event.findById(id);

    if(!event){
        errors = "No such event";
        return res.status(404).json({ errors });
    }

    res.status(200).json({ event });
};

const createEvent = async (req, res) => {

    const { title, start, end, reg_start, reg_end, venue, description } = req.body;

    const eventExists = await Event.findOne({ title, start, end, reg_start, reg_end, venue, description });

    if(eventExists){
        errors = "An Event with the same details already exists";
        return res.status(401).json({ errors });
    }

    const event = new Event({
        title, start, end, reg_start, reg_end, venue, description, createdBy: req.user._id
    });

    await event.save();

    res.status(200).json({ event, message: "Event Created Successfully" });
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

    res.status(200).json({
        "message" : "Event Updated Successfully"
    });
};

const deleteEvent = async (req, res) => {

    const { id } = req.params;

    await Event.findByIdAndDelete(id);

    res.status(200).json({
        message : "Event Deleted Successfully"
    });

};

const bookEvent = async (req, res) => {
    const { event_id, user_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(event_id)) {
        errors = "No such event";
        return res.status(404).json({ errors });
    }

    const event = await Event.findById(event_id);

    if (!event) {
        errors = "No such event";
        return res.status(404).json({ errors });
    }

    event.bookedBy.push(user_id);
    await event.save();

    res.status(200).json({
        message: "Event Ticket Booked Successfully"
    });

}


module.exports = {
    allEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    bookEvent,
}