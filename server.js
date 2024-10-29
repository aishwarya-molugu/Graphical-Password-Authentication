const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User } = require('./database'); // Ensure your database configuration is correct

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // To parse JSON bodies

// Route to sign up a new user
app.post('/signup', async (req, res) => {
    const { userId, sequence } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { userId } });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "User ID already exists." });
    }

    // Create new user with graphical password sequence
    await User.create({ userId, sequence: JSON.stringify(sequence) });
    console.log(`Created user: ${userId} with sequence: ${JSON.stringify(sequence)}`);
    res.status(201).json({ success: true, message: "Sign up successful!" });
});

// Route to log in a user
app.post('/login', async (req, res) => {
    const { userId, sequence } = req.body;

    // Find user in the database
    const user = await User.findOne({ where: { userId } });
    if (!user) {
        return res.status(404).json({ success: false, message: "User ID not found." });
    }

    // Validate the sequence
    if (JSON.stringify(sequence) === user.sequence) {
        console.log(`User ${userId} logged in successfully.`);
        res.status(200).json({ success: true, message: "Login successful!" });
    } else {
        res.status(401).json({ success: false, message: "Invalid sequence." });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
