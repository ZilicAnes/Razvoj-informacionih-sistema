const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/database');
const User = require('./models/User');
const Reservation = require('./models/Reservation');

const app = express();
const port = 3001;
const SECRET_KEY = 'your-secret-key';

app.use(cors());
app.use(express.json());

// Function to create an admin user if none exists
async function ensureAdminUser() {
    try {
        const adminUser = await User.findOne({ where: { type: 'admin' } });
        if (!adminUser) {
            const hashedPassword = await bcrypt.hash('admin', 10); // Default password is 'admin'
            await User.create({
                username: 'admin',
                firstName: 'Admin',
                lastName: 'User',
                password: hashedPassword,
                email: 'admin@example.com',
                type: 'admin'
            });
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error ensuring admin user:', error);
    }
}

sequelize.sync() // Sync the database without altering the schema
    .then(() => {
        console.log('Database & tables updated!');
        ensureAdminUser(); // Ensure an admin user exists after database sync
    })
    .catch(err => console.log('Error: ' + err));

// Middleware to verify JWT and extract user info
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Reservation Route
app.post('/reserve', authenticateJWT, async (req, res) => {
    try {
        const { listingId, bookingId, bookingDate, bookingStart, bookingEnd, username } = req.body;
        const userId = req.user.id; // Extracted from JWT

        // Associate the reservation with the user who made it
        const newReservation = await Reservation.create({
            listingId,
            bookingId,
            bookingDate,
            bookingStart,
            bookingEnd,
            username,
            userId // Associate the reservation with the user
        });

        res.status(201).json({ message: 'Reservation created successfully', reservation: newReservation });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Failed to create reservation' });
    }
});

// Fetch Reservations Route
app.get('/reservations', authenticateJWT, async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            include: [{ model: User, attributes: ['firstName', 'lastName'] }]
        });
        res.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
});

// Registration Route
app.post('/register', async (req, res) => {
    console.log('Register endpoint hit');
    try {
        const { username, firstName, lastName, password, email } = req.body;
        console.log('Received data:', { username, firstName, lastName, password, email });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            firstName,
            lastName,
            password: hashedPassword,
            email,
            type: 'user'
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: user.id, username: user.username, type: user.type }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, role: user.type });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
