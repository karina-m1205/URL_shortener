const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const mongoose = require("mongoose");
const URI = process.env.mongodbURI;

const connectToMongodb = mongoose.connect(URI);

module.exports = connectToMongodb;

