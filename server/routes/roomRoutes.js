const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Create a new room
router.post('/', async (req, res) => {
  try {
    const { Room_No, RoomName, Description, Capacity, Location } = req.body;
    const room = new Room({ Room_No, RoomName, Description, Capacity, Location });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the room' });
  }
});

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching rooms' });
  }
});

// Get a single room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the room' });
  }
});

// Update a room by ID
router.put('/:id', async (req, res) => {
  try {
    const { Room_No, RoomName, Description, Capacity, Location } = req.body;
    const room = await Room.findByIdAndUpdate(req.params.id, { Room_No, RoomName, Description, Capacity, Location }, { new: true });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the room' });
  }
});

// Delete a room by ID
router.delete('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndRemove(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the room' });
  }
});

module.exports = router;
