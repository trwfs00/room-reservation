// pages/api/auth/check-email.js
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/user';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      res.status(200).json({ used: !!user });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
