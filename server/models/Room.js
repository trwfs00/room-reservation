const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  Room_No: String,
  RoomName: String,
  Description: String,
  Capacity: Number,
  Location: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);
