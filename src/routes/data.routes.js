const express = require("express");
const { defaultFunction, encryptFunction, decryptFunction } = require("../controller/data.controller");
const dataRoutes = express.Router();

dataRoutes.get("/", defaultFunction);

module.exports = dataRoutes