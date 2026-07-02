const express = require("express");
const cors = require("cors");
//const URL = 'mongodb://127.0.0.1:27017/Stock-It(21-05-2026)';
const URL = process.env.MONGODBURL;
const connectMongoose = require("./connectMongoose");
const { stockRouter } = require("../routes/stockRoutes");
//const { serviceRouter } = require("../routes/serviceRoutes");
const { triggerUpdateFunction } = require("../services/updateData");
const { checkData } = require('../services/checkData');
const { userRouter } = require('../routes/userRoutes');
require("dotenv").config();


const app = new express();

//Connect to mongoose
connectMongoose(URL);

//cors
//app.use(cors());
const allowedOrigins = process.env.FRONTEND_WEBSITE_URL.split(",").map(origin => origin.trim());
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/stock', stockRouter);
app.use('/user', userRouter);
//app.use('/service', serviceRouter);
//app.get('/f', triggerUpdateFunction);
//triggerUpdateFunction();
//checkData();

app.listen(process.env.PORT, ()=>{ console.log("Server Strated...") });