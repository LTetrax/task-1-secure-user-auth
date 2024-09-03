const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
})

const User = mongoose.model('User', userSchema)

app.use(express.json())

const SECRET_KEY = 'SecurityIsReallyImportant'; // Secret key for JWT

// Get all users (in a real application, you wouldn't expose this)
app.get('/users', (req, res) => {  
    User.find() // Fetch all users from the database
        .then(users => res.json(users))
        .catch(err => res.status(500).send('Error fetching users'))
})

// POST Request to register a new user
app.post('/users', async (req, res) => {
    try {
        // Hash the user's password with a salt
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        // Create a new user and save it to the database
        const user = new User({ name: req.body.name, password: hashedPassword, role: req.body.role || 'user' })
        await user.save()
        res.status(201).send('User registered')
    } catch {
        res.status(500).send('Error registering user')
    }
})

// POST Request to login a user and generate a JWT
app.post('/users/login', async (req, res) => {
    try {
        // Find the user in the database
        const user = await User.findOne({ name: req.body.name })
        if (user == null) {
            return res.status(400).send('Cannot find user')
        }
        // Compare the provided password with the hashed password
        if (await bcrypt.compare(req.body.password, user.password)) {
            // Generate a JWT token
            const accessToken = jwt.sign({ name: user.name, role: user.role }, SECRET_KEY)
            console.log('Generated Token:', accessToken) // Log the token to the console
            res.json({ accessToken }); // Send the token back to the client
        } else {
            res.status(403).send('Invalid credentials')
        }
    } catch {
        res.status(500).send('Error logging in')
    }
})

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err)
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

// Middleware to authorize user roles
function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Access denied')
        }
        next()
    }
}

// Protected routes
app.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.send('Admin content')
})

app.get('/user', authenticateToken, authorizeRoles('user', 'admin'), (req, res) => {
    res.send('User content')
})

app.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route')
})

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

// Concepts covered
// - What a password salt is
// - How to properly hash a password
// - How to store passwords
// - Basic express server setup
// - User login
// - User role-based access control (RBAC)
// - Connecting to MongoDB with Mongoose
