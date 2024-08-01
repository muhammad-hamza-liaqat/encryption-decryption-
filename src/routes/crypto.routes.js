const express = require("express");
const { encryptFunction, decryptFunction, defaultFunction } = require("../controller/crypto.controller");
const cryptoRoutes = express.Router();

cryptoRoutes.post("/en", encryptFunction);
cryptoRoutes.post("/de", decryptFunction);
cryptoRoutes.get("/", defaultFunction);

module.exports = cryptoRoutes