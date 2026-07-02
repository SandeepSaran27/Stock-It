// models/yearStockModel.js
require("dotenv").config();
const mongoose = require("mongoose");

// NEW CONNECTION
const yearDB = mongoose.createConnection(
    process.env.MONGODBURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// SUB SCHEMA
const stockDataWithDateSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: true,
    },

    low: {
        type: Number,
        required: true,
    },

    high: {
        type: Number,
        required: true,
    },

    totSharesTradedToday: {
        type: Number,
        default: -1,
    }

}, { _id: false });

// MAIN SCHEMA
const stockSchema = new mongoose.Schema({

    stock_name: {
        type: String,
        required: true,
    },

    stock_in: {
        type: [String],
        required: true,
    },

    price: {

        currPrice: {
            type: Number,
            default: -1,
        },

        todayStart: {
            type: Number,
            default: -1,
        },

        pricesWithDate: {
            type: [stockDataWithDateSchema],
            default: []
        },
    }

}, { versionKey: false });


// COLLECTION NAME = stocklistmodels
const YearStockModel = yearDB.model(
    "stockdataofyearmodels",
    stockSchema
);

module.exports = YearStockModel;