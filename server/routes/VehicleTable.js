const express = require("express");
const router = express.Router();
const { VehicleTable } = require("../models"); // Ensure the model is correctly imported

// Route to fetch all vehicles
router.get("/", async (req, res) => {
  try {
    const ListOfVehicle = await VehicleTable.findAll();
    res.json(ListOfVehicle);
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    res.status(500).json({ error: "Failed to fetch vehicle data" });
  }
});

// Route to add a new vehicle
router.post("/", async (req, res) => {
  console.log("Request body:", req.body); // Log the request body to check if the charger field is being sent

  try {
    const newVehicle = await VehicleTable.create(req.body);
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error("Error creating vehicle entry:", error);
    res.status(500).json({ error: "Failed to create vehicle entry" });
  }
});



// Delete an Vehicleinfo code by ID (or whatever field is used in your database)
router.delete("/:id", async (req, res) => {
  const idToDelete = req.params.id; // Change 'code' to 'id' if necessary

  try {
    const deletedCount = await VehicleTable.destroy({
      where: { id: idToDelete }, // Use 'id' instead of 'code' if needed
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "vehicle code not found" });
    }

    res.status(200).json({ message: "vehicle code deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle code:", error);
    res.status(500).json({ error: "Failed to delete vehicle code" });
  }
});


// chassisNumber match 
router.post("/chassis-validate", async (req, res) => {
  const { chassisNumber } = req.body;

  // Validate chassisNumber format
  if (!chassisNumber || typeof chassisNumber !== 'string') {
    return res.status(400).json({ error: "Invalid chassis number" });
  }

  try {
    // Check if the chassis number exists in the VehicleTable
    const vehicle = await VehicleTable.findOne({ where: { chassisNumber } });

    if (!vehicle) {
      return res.status(404).json({ error: "Chassis number not found" });
    }

    // Check if the chassis number has already been validated
    if (vehicle.isUsed) {
      return res.status(400).json({ error: "Chassis number has already been validated" });
    }

    // Mark the chassis number as used
    vehicle.isUsed = true;
    await vehicle.save();

    res.status(200).json({ message: "Chassis number is valid", exists: true });
  } catch (error) {
    console.error(`Error validating chassis number ${chassisNumber}:`, error);
    res.status(500).json({ error: "Failed to validate chassis number" });
  }
});



// GET route to get the dealer information based on chassis number
router.get("/dealerCode", async (req, res) => {
  const { chassisNumber } = req.query;

  try {
    const vehicle = await VehicleTable.findOne({
      where: { chassisNumber },
    });

    if (vehicle) {
      const dealerInfo = vehicle.dealerNameDealerCode;
      return res.status(200).json({ dealerNameDealerCode: dealerInfo });
    } else {
      return res.status(404).json({ error: "Chassis number not found" });
    }
  } catch (error) {
    console.error("Error fetching dealer information:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});







module.exports = router;