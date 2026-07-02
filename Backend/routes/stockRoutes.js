const express = require('express');
const { handleStockPage, getAllStocksOf, getSearchedStock } = require('../controllers/stockRouter');
const { restrictToLoggedinUserOnly } = require('../middlewares/auth');

const stockRouter = express.Router();

//stockRouter.get('/loadPage', handleStockPage);
stockRouter.post('/get-all-stock-of', getAllStocksOf);
stockRouter.get('/get-searched-stock', getSearchedStock);

module.exports = {
    stockRouter,
}