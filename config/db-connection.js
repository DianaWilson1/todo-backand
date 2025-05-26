
const mongoose = require('mongoose');
require('dotenv').config()

const dbConnect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI || "");
  console.log('Connected to MongoDB');
};

const dbDisconnect = async () => {
  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');

  // Close our app, bringing us back to the command line.
  process.exit();
}

module.exports = {
  dbConnect,
  dbDisconnect
}
