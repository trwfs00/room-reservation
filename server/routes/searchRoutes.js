const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Timeslot = require('../models/Timeslot');
const User = require('../models/User');

router.post('/available-rooms', async (req, res) => {
    try {
        const { date, timeslotId } = req.body;

        // Find bookings for the specified date and timeslot
        const existingBookings = await Booking.find({ BookingDate: date, TimeslotID: timeslotId });

        // Get all rooms
        const allRooms = await Room.find();

        // Create a Set to store the booked room IDs
        const bookedRoomIds = new Set(existingBookings.map((booking) => booking.RoomID.toString()));

        // Filter available rooms
        const availableRooms = allRooms.filter((room) => {
            // Check if the room is not booked for the specified date and timeslot
            return !bookedRoomIds.has(room._id.toString());
        });

        // Sort available rooms by RoomName (A to Z)
        availableRooms.sort((a, b) => a.RoomName.localeCompare(b.RoomName));

        res.json(availableRooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while finding available rooms' });
    }
});

// Import necessary models and libraries

router.post('/available-timeslots', async (req, res) => {
    try {
        const { date, roomId } = req.body;

        // Find bookings for the specified date and room
        const existingBookings = await Booking.find({ BookingDate: date, RoomID: roomId });

        // Get all available timeslots
        const allTimeslots = await Timeslot.find();

        // Create a Set to store the booked timeslot IDs
        const bookedTimeslotIds = new Set(existingBookings.map((booking) => booking.TimeslotID.toString()));

        // Filter available timeslots
        const availableTimeslots = allTimeslots.filter((timeslot) => {
            // Check if the timeslot is not booked for the specified date and room
            return !bookedTimeslotIds.has(timeslot._id.toString());
        });

        // Sort available timeslots by StartTime
        availableTimeslots.sort((a, b) => a.StartTime.localeCompare(b.StartTime));

        res.json(availableTimeslots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while finding available timeslots' });
    }
});


router.post('/history', async (req, res) => {
    try {
        const { userId } = req.body;

        // Find bookings for the specified user and populate RoomID, TimeslotID, and UserID
        const userBookings = await Booking.find({ UserID: userId })
            .populate('RoomID')
            .populate('TimeslotID')
            .populate('UserID')
            .sort({ createdAt: -1 });

        if (!userBookings) {
            return res.status(404).json({ error: 'No bookings found for the user' });
        }

        // Sort userBookings by BookingDate in ascending order
        userBookings.sort((a, b) => {
            const dateA = new Date(a.BookingDate);
            const dateB = new Date(b.BookingDate);
            return dateB - dateA;
        });

        res.json(userBookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user bookings' });
    }
});


  

module.exports = router;