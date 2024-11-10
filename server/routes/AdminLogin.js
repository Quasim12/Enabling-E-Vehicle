const express = require('express');
const router = express.Router();
const { AdminLogin } = require('../models');  // Importing the model

// GET: Fetch all admin login records
router.get('/', async (req, res) => {
    try {
        const adminLogins = await AdminLogin.findAll();  // Retrieve all records
        res.status(200).json(adminLogins);
    } catch (error) {
        console.error('Error fetching admin logins:', error);
        res.status(500).json({ error: 'Failed to fetch admin logins' });
    }
});

// POST: Create a new admin login record with default values
router.post('/', async (req, res) => {
    try {
        const adminLogin = await AdminLogin.create();  // This will use default values if not provided
        res.status(201).json(adminLogin);
    } catch (error) {
        console.error('Error creating new admin login:', error);
        res.status(500).json({ error: 'Failed to create new admin login' });
    }
});

// POST: Login by checking userId and password
router.post('/login', async (req, res) => {
    const { userId, password } = req.body;  // Get userId and password from request body

    try {
        // Find a matching record with the provided userId and password
        const adminLogin = await AdminLogin.findOne({
            where: {
                userId: userId,
                password: password,
            },
        });

        if (adminLogin) {
            // If a match is found, return success message
            res.status(200).json({ message: 'Login successful', user: adminLogin });
        } else {
            // If no match is found, return an error message
            res.status(401).json({ message: 'Invalid userId or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
