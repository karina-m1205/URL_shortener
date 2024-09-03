require("dotenv").config();
const express = require("express");
const path = require("path");
const shortener = require(path.join(__dirname, "./api/shortener.js"));
const connectToMongodb = require(path.join(__dirname, "./core/db.js"));

const PORT = process.env.PORT || 3001;
const app = express();

connectToMongodb.then(() => {
    return console.log("connect to mongoDB");
});

app.use(express.json());
app.use("/shortener", shortener);

app.listen(PORT, () => {
    console.log(`app running on htpp://localhost:${PORT}`);
})