import User from '../../../models/user';
import dbConnect from '../../../utils/dbConnect';
import handler from '../../../utils/handler';

handler.post(createUser);

async function createUser(req, res) {
  try {
    dbConnect();
    
    const { email, password, fullName, tel } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new user
    const user = await User.create(req.body);

    res.status(201).json({ message: 'Created user!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default handler;
