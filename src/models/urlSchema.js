const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    longURL: {
        type: String,
        required: true,
    },
    shortURL: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

const urlModel = mongoose.model("urls", schema);

module.exports = urlModel;