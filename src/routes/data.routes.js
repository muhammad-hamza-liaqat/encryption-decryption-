const express = require("express");
const { defaultFunction, encryptFunction, decryptFunction } = require("../controller/data.controller");
const dataRoutes = express.Router();

dataRoutes.get("/", defaultFunction);
dataRoutes.post("/en", encryptFunction);
dataRoutes.post("/de", decryptFunction);

module.exports = dataRoutes