const express = require('express');
const router = express.Router();
const { SeriesList } = require('../models');  // Importing from models/index.js

// GET: Fetch all series names
router.get('/', async (req, res) => {
  console.log('Received GET request to fetch all series names');
  try {
    // Fetch only the seriesName column from all rows
    const seriesLists = await SeriesList.findAll({
      attributes: ['seriesName']  // Only select the seriesName column
    });
    res.json(seriesLists);
  } catch (error) {
    console.error('Error occurred while fetching series names:', error);
    res.status(500).json({ error: 'Failed to fetch series names' });
  }
});


// POST: Add a new series list
router.post('/', async (req, res) => {
  const { seriesName, isValid } = req.body;
  try {
    const seriesList = await SeriesList.create({ seriesName, isValid });
    res.status(201).json(seriesList);
  } catch (error) {
    console.error('Error occurred while adding series list:', error);
    res.status(500).json({ error: 'Failed to add series list' });
  }
});

// PUT: Update an existing series list
router.put('/:seriesName', async (req, res) => {
  const { seriesName: oldSeriesName } = req.params; // Old series name in the URL
  const { newSeriesName, isValid } = req.body;      // New series name and other fields in the body

  try {
    const [updated] = await SeriesList.update(
      { seriesName: newSeriesName, isValid },        // Update with new series name and validity status
      { where: { seriesName: oldSeriesName } }       // Match the old series name
    );
    
    if (updated) {
      const updatedSeriesList = await SeriesList.findOne({ where: { seriesName: newSeriesName } });
      res.status(200).json(updatedSeriesList);       // Return updated series list
    } else {
      res.status(404).json({ message: 'Series list not found' });
    }
  } catch (error) {
    console.error('Error occurred while updating series list:', error);
    res.status(500).json({ error: 'Failed to update series list' });
  }
});


// DELETE: Remove a series list
router.delete('/:seriesName', async (req, res) => {
  const { seriesName } = req.params;
  try {
    const deleted = await SeriesList.destroy({ where: { seriesName } });
    if (deleted) {
      res.status(204).send();  // No content
    } else {
      res.status(404).json({ message: 'Series list not found' });
    }
  } catch (error) {
    console.error('Error occurred while deleting series list:', error);
    res.status(500).json({ error: 'Failed to delete series list' });
  }
});

module.exports = router;
