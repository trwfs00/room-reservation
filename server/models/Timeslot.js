const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
    StartTime: String,
    EndTime: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Timeslot', timeslotSchema);