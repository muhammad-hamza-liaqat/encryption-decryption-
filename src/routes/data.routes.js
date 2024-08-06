const express = require("express");
const { defaultFunction } = require("../controller/data.controller");
const dataRoutes = express.Router();

dataRoutes.get("/", defaultFunction);

module.exports = dataRoutes