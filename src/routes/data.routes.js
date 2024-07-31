const express = require("express");
const { defaultFunction, encryptFunction } = require("../controller/data.controller");
const dataRoutes = express.Router();

dataRoutes.get("/", defaultFunction);
dataRoutes.post("/en", encryptFunction)

module.exports = dataRoutes