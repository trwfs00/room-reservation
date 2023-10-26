// routes/timeslotRoutes.js
const express = require('express');
const router = express.Router();
const Timeslot = require('../models/Timeslot');

// Create a new timeslot
router.post('/', async (req, res) => {
  try {
    const { StartTime, EndTime } = req.body;
    const timeslot = new Timeslot({ StartTime, EndTime });
    await timeslot.save();
    res.status(201).json(timeslot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the timeslot' });
  }
});

// Get all timeslots
router.get('/', async (req, res) => {
  try {
    const timeslots = await Timeslot.find();
    res.json(timeslots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching timeslots' });
  }
});

// Get a single timeslot by ID
router.get('/:id', async (req, res) => {
  try {
    const timeslot = await Timeslot.findById(req.params.id);
    if (!timeslot) {
      return res.status(404).json({ error: 'Timeslot not found' });
    }
    res.json(timeslot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the timeslot' });
  }
});

// Update a timeslot by ID
router.put('/:id', async (req, res) => {
  try {
    const { StartTime, EndTime } = req.body;
    const timeslot = await Timeslot.findByIdAndUpdate(req.params.id, { StartTime, EndTime }, { new: true });
    if (!timeslot) {
      return res.status(404).json({ error: 'Timeslot not found' });
    }
    res.json(timeslot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the timeslot' });
  }
});

// Delete a timeslot by ID
router.delete('/:id', async (req, res) => {
  try {
    const timeslot = await Timeslot.findByIdAndRemove(req.params.id);
    if (!timeslot) {
      return res.status(404).json({ error: 'Timeslot not found' });
    }
    res.json({ message: 'Timeslot deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the timeslot' });
  }
});

module.exports = router;
