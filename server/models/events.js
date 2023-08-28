const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
    },
    reg_start:{
        type: Date,
    },
    reg_end:{
        type: Date,
        required: true
    },
    tags: [String],
    venue: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    booked: {
        type: Number
    }
});

module.exports = mongoose.model('event', eventSchema);