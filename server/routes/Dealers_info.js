const express = require("express");
const router = express.Router();
const { DealersInfo } = require("../models"); // Use the correct model name

// Route for login authentication
router.post("/login", async (req, res) => {
    const { dealerCode, mobileNo } = req.body;
  
    try {
      // Find the dealer by dealerCode and mobileNo in the same row
      const dealer = await DealersInfo.findOne({ 
        where: { dealerCode, mobileNo }  // Check both dealerCode and mobileNo together
      });
  
      // If no dealer is found, return an error
      if (!dealer) {
        return res.status(401).json({ error: "Invalid dealer code or mobile number" });
      }
  
      // Successful login
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to authenticate dealer" });
    }
  });


// Route to get list of dealers (existing route)
router.get("/", async (req, res) => {
  const ListOfDealer = await DealersInfo.findAll(); // Fetch all dealers
  res.json(ListOfDealer);
});


// Function to generate a unique dealerCode
const generateUniqueDealerCode = async (activationCodePrefix) => {
  let dealerCode;
  let isUnique = false;

  while (!isUnique) {
    // Generate a 4-digit random number
    const randomNum = Math.floor(1000 + Math.random() * 9000);

    // Fetch the current highest auto-increment number and increment it by 1
    const currentMaxCounter = await DealersInfo.max('id') || 0;
    const newCounter = currentMaxCounter + 1;

    // Format the random number and counter to be 4 digits long
    const formattedRandomNum = String(randomNum).padStart(4, '0');
    const formattedCounter = String(newCounter).padStart(4, '0');

    // Generate dealerCode
    dealerCode = `${activationCodePrefix}${formattedRandomNum}${formattedCounter}`;

    // Check if the generated dealerCode already exists in the database
    const existingDealer = await DealersInfo.findOne({ where: { dealerCode } });
    if (!existingDealer) {
      isUnique = true;
    }
  }

  return dealerCode;
};

// Route to create a new dealer (existing route)
router.post("/", async (req, res) => {
  const post = req.body;
  try {
    const activationCodePrefix = post.activationCode.substring(0, 2);

    // Generate a unique dealerCode
    const dealerCode = await generateUniqueDealerCode(activationCodePrefix);

    // Generate LOI and RQ reference IDs
    const current_Date = new Date()
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .slice(0, 8);
    const newCounter = (await DealersInfo.count()) + 1; // Increment counter
    const LOIreference_ID = `LOI${current_Date}/${newCounter}`;
    const RQreference_ID = `RQ${current_Date}/${newCounter}`;

    post.dealerCode = dealerCode;
    post.LOIreferenceId = LOIreference_ID;
    post.RQreferenceId = RQreference_ID;

    // Save the new dealer record
    const newDealer = await DealersInfo.create(post);
    res.status(201).json(newDealer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create dealer info" });
  }
});


// New route to get only dealerCode and name for dropdown of vehicle form
router.get("/minimal", async (req, res) => {
  try {
    const dealers = await DealersInfo.findAll({
      attributes: ['dealerCode', 'name'], // Fetch only specific fields
    });

    res.status(200).json(dealers); // Send the filtered data
  } catch (error) {
    console.error("Error fetching dealer data:", error);
    res.status(500).json({ error: "Failed to fetch dealer data" });
  }
});


// New route to get full dealer data
router.get("/full", async (req, res) => {
  try {
    const dealers = await DealersInfo.findAll(); // Fetch all fields of dealers
    res.status(200).json(dealers); // Send the full dealer data
  } catch (error) {
    console.error("Error fetching full dealer data:", error);
    res.status(500).json({ error: "Failed to fetch full dealer data" });
  }
});


// Delete row in your database
router.delete('/:id', async (req, res) => {
  const idToDelete = req.params.id; // Change 'code' to 'id' if necessary

  try {
      const deletedCount = await DealersInfo.destroy({
          where: { id: idToDelete } // Use 'id' instead of 'code' if needed
      });

      if (deletedCount === 0) {
          return res.status(404).json({ error: 'row code not found' });
      }

      res.status(200).json({ message: ' row deleted successfully' });
  } catch (error) {
      console.error("Error deleting activation code:", error);
      res.status(500).json({ error: 'Failed to delete activation code' });
  }
});



module.exports = router;