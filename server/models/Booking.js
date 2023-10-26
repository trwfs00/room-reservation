const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  RoomID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // You can define a User model if needed
  },
  BookingDate: String,
  TimeslotID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Timeslot',
  },
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
