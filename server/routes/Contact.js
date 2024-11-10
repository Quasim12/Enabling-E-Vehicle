// routes/Contact.js

const express = require('express');
const router = express.Router();
const { Contact } = require('../models');  // Ensure the correct model is imported

// GET route to fetch all contact information
router.get('/', async (req, res) => {
    try {
        const listOfContacts = await Contact.findAll();
        res.json(listOfContacts);
    } catch (error) {
        console.error('Error fetching contact information:', error);
        res.status(500).json({ error: 'Failed to fetch contact information' });
    }
});

// POST route to create new contact information
router.post('/', async (req, res) => {
    const post = req.body;
    try {
        const newContact = await Contact.create(post);
        res.status(201).json(newContact);
    } catch (error) {
        console.error('Error creating contact information:', error);
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ error: 'Validation error', details: error.errors });
        } else {
            res.status(500).json({ error: 'Failed to create contact information' });
        }
    }
});

module.exports = router;