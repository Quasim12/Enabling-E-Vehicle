const express = require('express');
const router = express.Router();
const { CustomerTable } = require('../models');  // Ensure your model is properly defined
const { Op } = require("sequelize"); // Import Sequelize Op for operators or dealer Customer fetch data



// Get all customers data in admin dash
router.get('/admin', async (req, res) => {
    try {
        const listOfCustomers = await CustomerTable.findAll(); 
        res.json(listOfCustomers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve customers' });
    }
});



// Get customers by dealerCode
router.get("/", async (req, res) => {
  const { dealerCode } = req.query; // Get dealerCode from query parameter

  try {
    // Check if dealerCode is provided and at least 7 characters long
    if (dealerCode && dealerCode.length >= 7) {
      const last7Digits = dealerCode.slice(-7); // Get the last 7 digits of the dealerCode

      // Use the Sequelize "like" operator to find matches for the last 7 digits
      const listOfCustomers = await CustomerTable.findAll({
        where: {
          dealerCode: {
            [Op.like]: `%${last7Digits}` // Match the last 7 digits
          }
        }
      });

      res.json(listOfCustomers);
    } else {
      res.status(400).json({ error: "Dealer code is required and should be at least 7 characters long" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve customers" });
  }
});
  


// Create a new customer
router.post('/', async (req, res) => {
    const post = req.body;
    try {
        const newCustomer = await CustomerTable.create(post);  
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create customer info' });
    }
});



// Delete row in your database
router.delete('/:id', async (req, res) => {
    const idToDelete = req.params.id; // Change 'code' to 'id' if necessary

    try {
        const deletedCount = await CustomerTable.destroy({
            where: { id: idToDelete } // Use 'id' instead of 'code' if needed
        });

        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Activation code not found' });
        }

        res.status(200).json({ message: 'Activation code deleted successfully' });
    } catch (error) {
        console.error("Error deleting activation code:", error);
        res.status(500).json({ error: 'Failed to delete activation code' });
    }
});



module.exports = router;