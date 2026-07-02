const { INDICES } = require("../services/storeData/Indices");
const { stockModel } = require("../models/stocks");
const YearStockModel = require("../models/stockModel");

async function handleStockPage(req, res){
    const stockDataFromDB = await stockModel.find();
    return res.status(200).json({
        indices : INDICES,
        stockData : stockDataFromDB,
    })
}

//Function that returns all stock names of particular section like nifty 50
async function getAllStocksOf(req, res){
    const data = req.body;
    const section = data.section;
    try{
        const stocksData = await YearStockModel.find({stock_in:section}).limit(20);
        return res.json(stocksData);
    }catch(err){
        cosole.log("Error in getAllStocksOf");
        return res.json{msg : "Error in getAllStocksOf"};
    }
    //const stocksData = await stockModel.find({stock_in:section});
    //console.log("Data:", stocksData);    
}

async function getSearchedStock(req, res){
    try {

        const searchedText =
            req.query.searchText
                ?.trim()
                ?.toUpperCase();

        if (!searchedText) {

            return res.status(400).json({
                msg: "Search text missing"
            });
        }

        const ALL_STOCKS =
            await stockModel.find({});

        const rankedStocks = [];

        ALL_STOCKS.forEach((stock) => {

            const stockName =
                stock.stock_name.toUpperCase();

            let score = 0;

            // Exact Match
            if (stockName === searchedText) {

                score += 100;
            }

            // Starts With
            else if (
                stockName.startsWith(searchedText)
            ) {

                score += 80;
            }

            // Includes
            else if (
                stockName.includes(searchedText)
            ) {

                score += 60;
            }

            // Character Similarity
            else {

                let matchedChars = 0;

                for (
                    let i = 0;
                    i < searchedText.length;
                    i++
                ) {

                    if (
                        stockName.includes(
                            searchedText[i]
                        )
                    ) {

                        matchedChars++;
                    }
                }

                score += matchedChars * 10;
            }

            rankedStocks.push({
                stock,
                score
            });
        });

        // Sort by score descending
        rankedStocks.sort((a, b) => {
            return b.score - a.score;
        });

        // Main search results
        const searchedStocks =
            rankedStocks
                .filter((ele) => ele.score > 0)
                .slice(0, 10);

        // Extra stocks
        const extraStocks =
            rankedStocks
                .filter((ele) => ele.score === 0)
                .slice(0, 5);

        return res.json({

            searchedStocks,

            extraStocks
        });

    } catch (error) {

        console.log(
            "Error in getSearchedStock:",
            error
        );

        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}

module.exports = {
    handleStockPage,
    getAllStocksOf,
    getSearchedStock,
}
