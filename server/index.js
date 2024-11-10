const express = require('express');
const app = express();
const port = 5001;
const cors = require('cors');

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());

// Import database models
const db = require('./models');

// Import routes
const dealerRoute = require('./routes/Dealers_info'); // Import the dealer route
const contactRoute = require('./routes/Contact');  // Import the contact route
const activationRoute = require('./routes/ActivationCode');  // Import the activation code route
const adminRoute = require('./routes/AdminLogin');  // Import the admin route
const seriesList = require('./routes/SeriesList');  // Import the series list route
const vehicleTable = require('./routes/VehicleTable');  // Import the vehicle list route
const customerTable = require('./routes/CustomerTable');  // Import the customer list route
const createProfile = require('./routes/CreateProfile');  // Import the CreateProfile list route




// Use the routes with base URLs
app.use('/dealer', dealerRoute); // Use the dealer route with base URL `/dealer`
app.use('/contact', contactRoute);  // Use the contact route with base URL `/contacts`
app.use('/ActivationCode', activationRoute);  // Use the activation code route with base URL `/activation`
app.use('/admin', adminRoute);  // Use the admin route with base URL `/admin`
app.use('/SeriesList', seriesList);  // Use the series list route with base URL `/series`
app.use('/VehicleTable', vehicleTable);  // Use the vehicle list route with base URL `/VehicleTable`
app.use('/CustomerTable', customerTable);  // Use the customer list route with base URL `/CustomerTable`
app.use('/CreateProfile', createProfile);  // Use the customer list route with base URL `/CustomerTable`

// Sync Sequelize models with the database and start the server
db.sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });