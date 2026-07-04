const express = require("express");
const { 
        handleUserLogIn, 
        handleUserLogOut,
        handleUserSignUp, 
        buyStock,
        addMoneyInUserValet,
        returnUserData,
        returnUserHoldings,
        soldStock,
        returnUserAllOrders,
        getHistoricData,
        checkAuth,
    } = require('../controllers/userRouter');

const userRouter = express.Router();

userRouter.post('/login', handleUserLogIn);
userRouter.post('/logout', handleUserLogOut);
userRouter.post('/signup', handleUserSignUp);
userRouter.get('/getuserdata', returnUserData);
userRouter.post('/buystock', buyStock);
userRouter.post('/addmoney', addMoneyInUserValet);
userRouter.get('/getholdings', returnUserHoldings);
userRouter.post('/soldstock', soldStock);
userRouter.get('/getallorders', returnUserAllOrders);
userRouter.get("/getHistoricData/:stockName", getHistoricData);
userRouter.get("/checkauth", checkAuth);

module.exports = {
    userRouter,
}
