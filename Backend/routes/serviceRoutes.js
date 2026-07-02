const express = require("express");
const { updateDataInDB } = require("../controllers/serviceRouter");

const serviceRouter = express.Router();

serviceRouter.get('/updatedata', updateDataInDB);

module.exports = {
    serviceRouter,
};