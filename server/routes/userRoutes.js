const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to update user information
router.put('/update/:userId', async (req, res) => {
  const { userId } = req.params;
  const { fullName, tel } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's fullName and tel fields
    user.fullName = fullName;
    user.tel = tel;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User information updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating user information' });
  }
});

router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  });

module.exports = router;
