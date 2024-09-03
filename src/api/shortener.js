const path = require("path");
require("dotenv").config({path:path.join(__dirname,"../../.env")});
const PORT = process.env.PORT;
const express = require("express");
const urlModel = require(path.join(__dirname, "../models/urlSchema.js"));
const randomToken = require(path.join(__dirname, "../core/random.js"));
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const longUrl = req.body.longUrl;
        if (!longUrl) {
            return res.status(400).send("no data to convert");
        }

        let shortUrl = "";
        const findUrl = await urlModel.findOne({ longURL: longUrl });

        if (!findUrl) {
            let token = randomToken();
            shortUrl = `http://localhost:${PORT}/shortener/${token}`;

            const urlDocument = {
                longURL: longUrl,
                shortURL: shortUrl,
                token: token,
            };
            const url = new urlModel(urlDocument);
            await url.save();
            return res.status(201).send(shortUrl);
        }

        shortUrl = findUrl.toObject().shortURL;
        return res.status(200).send(shortUrl);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const token = req.params.id;
        const findUrl = await urlModel.findOne({ token: token });

        if (!findUrl) {
            return res.status(404).send("not found");
        }

        const longUrl = findUrl.toObject().longURL;
        res.redirect(302, `${longUrl}`);
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;