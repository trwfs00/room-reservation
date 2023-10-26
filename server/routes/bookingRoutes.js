// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');


router.post('/create', async (req, res) => {
    try {
        const { RoomID, UserID, BookingDate, TimeslotID } = req.body;
        const currentDate = new Date();
        const parseDate = new Date(BookingDate)
        // Check if the booking date is in the past
        if (parseDate < currentDate) {
            return res.status(400).json({ error: 'You cannot book for past dates' });
        }

        // Check if a booking already exists for the same date and timeslot
        const existingBooking = await Booking.findOne({ BookingDate, TimeslotID });

        if (existingBooking && existingBooking.RoomID.toString() === RoomID) {
            // A booking with the same date, timeslot, and room already exists
            return res.status(400).json({ error: 'Booking already exists for this timeslot, room, and date' });
        }

        // No duplicate booking found, create a new booking
        const booking = new Booking({ RoomID, UserID, BookingDate, TimeslotID });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the booking' });
    }
});

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('RoomID') // Populate the 'room' field with Room details
            .populate('UserID') // Populate the 'user' field with User details
            .populate('TimeslotID') // Populate the 'timeslot' field with Timeslot details
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching bookings' });
    }
});

router.post('/findByDate', async (req, res) => {
    try {
        // Extract BookingDate from the request body
        const { bookingDate } = req.body;

        // Check if bookingDate is provided in the request body
        if (!bookingDate) {
            return res.status(400).json({ error: 'BookingDate is required in the request body' });
        }

        // Query the database for bookings with the specified BookingDate
        const bookings = await Booking.find({ BookingDate: bookingDate })
            .populate('RoomID')
            .populate('UserID')
            .populate('TimeslotID')
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching bookings' });
    }
});

// Get a single booking by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the booking' });
    }
});

// Update a booking by ID
router.put('/:id', async (req, res) => {
    try {
        const { RoomID, UserID, Date, TimeslotID } = req.body;
        const booking = await Booking.findByIdAndUpdate(req.params.id, { RoomID, UserID, Date, TimeslotID }, { new: true });
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the booking' });
    }
});

// Delete a booking by ID
router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndRemove(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the booking' });
    }
});

module.exports = router;
