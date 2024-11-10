const express = require('express');
const router = express.Router();
const { ActivationCode } = require('../models');  // Use the same model name as defined

// Updated GET route to return only valid activation codes
router.get('/', async (req, res) => {
  try {
    const activationCodes = await ActivationCode.findAll({
      where: { isValid: true } // Fetch only valid activation codes
    });
    res.json(activationCodes);
  } catch (error) {
    console.error('Error occurred while fetching activation codes:', error);
    res.status(500).json({ error: 'Failed to fetch activation codes' });
  }
});


// New POST route to add activation code
router.post('/', async (req, res) => {
  const { code, isValid } = req.body;
  try {
    const newActivationCode = await ActivationCode.create({ code, isValid });
    res.status(201).json(newActivationCode);
  } catch (error) {
    console.error('Error occurred while adding activation code:', error);
    res.status(500).json({ error: 'Failed to add activation code' });
  }
});


// New GET route to verify and invalidate activation code
router.get('/verify/:code', async (req, res) => {
  const { code } = req.params;
  try {
    // Find the activation code in the database
    const activationCode = await ActivationCode.findOne({ where: { code, isValid: true } });

    // If the activation code is found and valid, update isValid to false
    if (activationCode) {
      activationCode.isValid = false;
      await activationCode.save(); // Update the isValid flag to false
      res.json({ isValid: true });
    } else {
      res.json({ isValid: false });
    }
  } catch (error) {
    console.error('Error occurred while verifying and invalidating activation code:', error);
    res.status(500).json({ error: 'Failed to verify or invalidate activation code' });
  }
});


/// DELETE: Remove an activation code by code column
router.delete('/:code', async (req, res) => {
  const { code } = req.params;
  
  try {
    // Perform the delete operation
    const result = await ActivationCode.destroy({
      where: { code }  // Ensure 'code' matches the database field name exactly
    });
    
    if (result > 0) {  // 'result' will be the number of rows deleted
      res.status(200).json({ message: 'Activation code deleted successfully' });
    } else {
      res.status(404).json({ message: 'Activation code not found' });
    }
  } catch (error) {
    console.error('Error occurred while deleting activation code:', error);
    res.status(500).json({ error: 'Failed to delete activation code' });
  }
});

// PUT: Update an activation code by code column
router.put('/:code', async (req, res) => {
  const { code } = req.params;
  const { isValid } = req.body;

  try {
    // Update the activation code's isValid field
    const [updated] = await ActivationCode.update(
      { isValid }, 
      { where: { code } }
    );

    if (updated) {
      const updatedCode = await ActivationCode.findOne({ where: { code } });
      res.status(200).json(updatedCode); // Respond with the updated code
    } else {
      res.status(404).json({ message: 'Activation code not found' });
    }
  } catch (error) {
    console.error('Error occurred while updating activation code:', error);
    res.status(500).json({ error: 'Failed to update activation code' });
  }
});

module.exports = router;