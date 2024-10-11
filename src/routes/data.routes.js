const express = require("express");
const { defaultFunction, getData } = require("../controller/data.controller");
const dataRoutes = express.Router();

dataRoutes.get("/", defaultFunction);
dataRoutes.get("/data", getData);

module.exports = dataRoutes