//To Update data for every 15mins upto(stock Closing Time) when frontend hits this
const mongoose = require("mongoose");
const { NseIndia } = require("stock-nse-india");
const YearStockModel = require("../models/stockModel");
const { stockModel } = require("../models/stocks");
const { INDICES } = require("../services/storeData/Indices");
const { getMarketStatus } = require("../services/marketStatus");
const MARKETSTATUS = getMarketStatus();


function delay(min) {
    const ms = min * 60000;
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDate() {
    const D = new Date();
    let min, hour, date, month, year, fullYear, dateStr, FINALDATE;
    if (D.getMinutes() < 10) {
        min = '0' + (D.getMinutes());
    } else {
        min = D.getMinutes();
    }
    if (D.getHours() < 10) {
        hour = '0' + (D.getHours());
    } else {
        hour = D.getHours();
    }
    if (D.getDate() < 10) {
        date = '0' + D.getDate();
    } else {
        date = D.getDate();
    }
    if (D.getMonth() + 1 < 10) {
        month = '0' + (D.getMonth() + 1);
    } else {
        month = D.getMonth() + 1;
    }
    fullYear = D.getFullYear().toString();
    year = fullYear.slice(2, 4);
    dateStr = '' + year + month + date + hour + min;
    FINALDATE = Number(dateStr);
    return FINALDATE;
}

async function updateDataFunction() {

    const nseIndia = new NseIndia();
    console.log("MARKETSTATUS:", MARKETSTATUS);
    if (MARKETSTATUS) {
        console.log("Entered into market");
        for (let i = 0; i < INDICES.length; i++) {
            const currIndData = await nseIndia.getEquityStockIndices(INDICES[i]);
            //console.log("currIndData", currIndData);

            //console.log(currIndData.name);
            //console.log(currIndData.data[0].symbol);
            //console.log(currIndData.data[0].open);
            //console.log(currIndData.data[0].lastPrice);
            for (let j = 0; j < currIndData.data.length; j++) {
                const stockData = await YearStockModel.findOne({
                    stock_name: currIndData.data[j].symbol,
                });
                //console.log("stockData:", isStockExisist);
                if (stockData) {
                    //Update stock indices
                    stockInArr = stockData.stock_in;
                    if( !stockInArr.includes(INDICES[i]) ){
                        stockInArr.push(INDICES[i]);
                        stockData.stock_in = stockInArr;
                    }
                    //Update Current price
                    stockData.price.currPrice = currIndData.data[j].lastPrice;
                    //Update low and high prices
                    if (stockData.price.low != -1) {
                        if (stockData.price.low > stockData.price.currPrice) {
                            stockData.price.low = stockData.price.currPrice;
                        }
                    } else {
                        stockData.price.low = stockData.price.currPrice;
                    }
                    if (stockData.price.high != -1) {
                        if (stockData.price.high < stockData.price.currPrice) {
                            stockData.price.high = stockData.price.currPrice;
                        }
                    } else {
                        stockData.price.high = stockData.price.currPrice;
                    }
                    //Update Yealy low and high prices
                    stockData.price.yearlyLow = -1;
                    stockData.price.yearlyHigh = -1;
                    //Update today st price
                    if (stockData.price.todayStart == -1) {
                        stockData.price.todayStart = currIndData.data[0].open;
                    }
                    //Update pr or loss of today
                    stockData.price.todayPrOrLoss.pricePrOrLoss = currIndData.data[j].lastPrice - currIndData.data[0].open;
                    stockData.price.todayPrOrLoss.percentagePrOrLoss = -1;
                    //Update day array
                    const prevUpdateOfDay = stockData.price.day.prevUpdatedDate;
                    //BUG of 100mins
                    if ((prevUpdateOfDay + 100) < getDate()) {
                        let dayArr = stockData.price.day.data;
                        while (dayArr.length > 10) {
                            dayArr.pop();
                        }
                        dayArr.push(stockData.price.currPrice);
                        stockData.price.day.data = dayArr;

                        stockData.price.day.prevUpdatedDate = getDate();
                    }
                    //Update week array
                    const prevUpdateOfWeek = stockData.price.week.prevUpdatedDate;
                    //BUG of 7Days
                    if ((prevUpdateOfDay + 70000) < getDate()) {
                        let weekArr = stockData.price.week.data;
                        while (weekArr.length > 7) {
                            weekArr.pop();
                        }
                        weekArr.push(stockData.price.currPrice);
                        stockData.price.week.data = weekArr;

                        stockData.price.week.prevUpdatedDate = getDate();
                    }
                    //Update month array
                    const prevUpdateOfMonth = stockData.price.month.prevUpdatedDate;
                    //BUG
                    if ((prevUpdateOfMonth + 1000000) < getDate()) {
                        let monthArr = stockData.price.month.data;
                        while (monthArr.length > 31) {
                            monthArr.pop();
                        }
                        monthArr.push(stockData.price.currPrice);
                        stockData.price.month.data = monthArr;

                        stockData.price.month.prevUpdatedDate = getDate();
                    }
                    //Update year array
                    const prevUpdateOfYear = stockData.price.year.prevUpdatedDate;
                    //BUG
                    if ((prevUpdateOfYear + 100000000) < getDate()) {
                        let yearArr = stockData.price.year.data;
                        while (yearArr.length > 12) {
                            yearArr.pop();
                        }
                        yearArr.push(stockData.price.currPrice);
                        stockData.price.year.data = yearArr;

                        stockData.price.year.prevUpdatedDate = getDate();
                    }
                    if (stockData) {
                        await stockData.save();
                    }
                } else {
                    try{
                        const result = await YearStockModel.create({
                            stock_name: currIndData.data[j].symbol,
                            stock_in: [currIndData.name],
                        });
                        //updateDataFunction(req, res);
                    }catch(e){
                        console.log("Error Msg:", err.message);
                    }
                }
            }
        }
    } else {
        //Do low, high to -1
        //day array to []
        //Today st to -1
        //Today pr or loss    
    }
    //return res.json({ msg: 'hii' })

    /*//while(1){
        const data = await nseIndia.getEquityStockIndices("NIFTY 100");
        const INFYdata = await nseIndia.getEquityDetails("INFY");
        //getIndices

        const range = {
            start : new Date('2024-01-01'), 
            end : new Date('2024-01-02')
        };
        const hist = await nseIndia.getEquityHistoricalData("TCS", range);
        //const status = await nseIndia.getMarketStatus();
        //console.log("Name INFY:",INFYdata.info.companyName);
        //console.log("INFY Open price:", INFYdata.priceInfo.open);
        //console.log("INFY yesterday close price:", INFYdata.priceInfo.previousClose);
        //console.log("INFY current price:", INFYdata.priceInfo.lastPrice);
        //console.log("TCS opening price on 2024-01-01:",hist[0].data[0].CH_OPENING_PRICE);
        //console.log("TCS opening price on 2024-01-02:",hist[0].data[1].CH_OPENING_PRICE);
        
        //console.log("n100:", data);
        await delay(0.25);
    //}
    //return res.json({mgs : 'Bye'});*/
}

async function triggerUpdateFunction(req, res) {
    while(1){
        await updateDataFunction();
        await updateDataFunction();
        console.log("Updated data");
        await delay(20);
    }
}

module.exports = {
    triggerUpdateFunction,
}