require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.raw({ type: 'application/json' }));
app.use(cors());

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}/`)
});