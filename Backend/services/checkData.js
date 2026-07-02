//To Update data for every 15mins upto(stock Closing Time) when frontend hits this
const mongoose = require("mongoose");
const { NseIndia } = require("stock-nse-india");
const { stockModel } = require("../models/stocks");
const { INDICES } = require("../services/storeData/Indices");
const { getMarketStatus } = require("../services/marketStatus");
const MARKETSTATUS = getMarketStatus();


function delay(min) {
    const ms = min * 60000;
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateDataFunction() {

    const nseIndia = new NseIndia();
    console.log("MARKETSTATUS:", MARKETSTATUS);
    if (MARKETSTATUS) {
        console.log("Entered into market");
        for (let i = 0; i < 1; i++) {
            //let currIndData = undefined;
            const currIndData = await nseIndia.getEquityStockIndices('NIFTY Media');
            if(!currIndData){
                //console.log("Data undefined:", INDICES[i]);       
            }else{
                console.log("Data of ",INDICES[i],'is',currIndData.data[2]);
            }
        }
    } else {
        //Do low, high to -1
        //day array to []
        //Today st to -1
        //Today pr or loss    
    }
}

async function checkData(req, res) {
    while(1){
        await updateDataFunction();
        await updateDataFunction();
        console.log("Updated data");
        await delay(20);
    }
}

module.exports = {
    checkData,
}