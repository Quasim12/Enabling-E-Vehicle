const express = require("express");
const router = express.Router();
const { CreateProfile } = require("../models");

// Route to get all profiles for admin
router.get("/all", async (req, res) => {
  try {
    const listOfCreateProfiles = await CreateProfile.findAll();
    res.json(listOfCreateProfiles);
  } catch (error) {
    console.error("Error retrieving profiles:", error);
    res.status(500).json({ error: "Failed to retrieve profiles" });
  }
});




// Route to get specific profile based on userId and password
router.get("/", async (req, res) => {
  try {
    const { userId} = req.query;

    // Ensure both userId and password are provided
    if (!userId ) {
      return res.status(400).json({ error: "userId and password must be provided" });
    }

    // Fetch profiles that match the userId and password
    const matchingProfiles = await CreateProfile.findAll({
      where: {
        userId: userId,
        // password: password 
      }
    });

    // Check if any profiles were found
    if (matchingProfiles.length === 0) {
      return res.status(404).json({ error: "No profiles found matching userId and password" });
    }

    // Return the fetched profiles
    res.json(matchingProfiles);
  } catch (error) {
    console.error("Error retrieving profiles:", error);
    res.status(500).json({ error: "Failed to retrieve profiles" });
  }
});




// Get user data based on userId and password
router.get("/CreateProfile", async (req, res) => {
  try {
    // Extract userId and password from query parameters
    const { userId, password } = req.query;

    // Ensure both userId and password are provided
    if (!userId || !password) {
      return res.status(400).json({ error: "userId and password must be provided" });
    }

    // Fetch profiles that match the userId and password
    const matchingProfiles = await CreateProfile.findAll({
      where: {
        userId: userId,
        password: password // Ensure you are hashing passwords in production!
      }
    });

    // Check if any profiles were found
    if (matchingProfiles.length === 0) {
      return res.status(404).json({ error: "No profiles found matching userId and password" });
    }

    // Return the fetched profiles
    res.json(matchingProfiles);
  } catch (error) {
    console.error("Error retrieving profiles:", error);
    res.status(500).json({ error: "Failed to retrieve profiles" });
  }
});




// Create a new CreateProfile
router.post("/", async (req, res) => {
  const post = req.body;

  // Validate request body
  if (!post || Object.keys(post).length === 0) {
    return res.status(400).json({ error: "Profile data is required" });
  }

  // Add custom validations (example: phone and email required)
  const { fullName, mobileNumber, email } = post;
  if (!fullName || !mobileNumber || !email) {
    return res.status(400).json({ error: "Full name, mobileNumber, and email are required" });
  }

  try {
    const newCreateProfile = await CreateProfile.create(post);
    res.status(201).json(newCreateProfile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: "Failed to create profile" });
  }
});



// Login subAdmin by checking userId and password
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;  // Get userId and password from request body

  try {
      // Find a matching record with the provided userId and password
      const createProfile = await CreateProfile.findOne({
          where: {
              userId: userId,
              password: password,
          },
      });

      if (createProfile) {
          // If a match is found, return success message
          res.status(200).json({ message: 'Login successful', user: createProfile });
      } else {
          // If no match is found, return an error message
          res.status(401).json({ message: 'Invalid userId or password' });
      }
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Login failed' });
  }
});




// Delete a CreateProfile by ID
router.delete("/:id", async (req, res) => {
  const idToDelete = parseInt(req.params.id, 10);

  if (isNaN(idToDelete)) {
    return res.status(400).json({ error: "Invalid profile ID" });
  }

  try {
    const deletedCount = await CreateProfile.destroy({ where: { id: idToDelete } });
    if (deletedCount === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ error: "Failed to delete profile" });
  }
});

module.exports = router;
