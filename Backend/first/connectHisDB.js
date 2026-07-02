const mongoose = require("mongoose");

const historicDB =
    mongoose.createConnection(
        "mongodb://127.0.0.1:27017/Stock-It-Data-Year"
    );

module.exports = {
    historicDB
};