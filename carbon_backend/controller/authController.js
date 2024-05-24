import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

const register = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, emailAddress, password } = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({ emailAddress });
        if (existingUser) {
            res.status(401).json({ message: 'EmailAddress already exists' });
            return;
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ firstName, lastName, phoneNumber, emailAddress, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const login = async (req, res) => {
    try {
        const { emailAddress, password } = req.body;
        // Find the user by username
        const user = await User.findOne({ emailAddress });
        if (!user) {
            res.status(401).json({ message: 'invalid Email' });
            return;
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'invalid Password' });
            return;
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1d' });
        res.setHeader('Authorization', token);
        res.status(200).json({ token: token, user, message: 'Login successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
}

export default { register, login }