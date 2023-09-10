const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
    },
    reg_start:{
        type: String,
    },
    reg_end:{
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdBy: {
        type: String,
        required: true
    },
    bookedBy: [String],
    tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('event', eventSchema);