const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    stock_name : {
        type : String,
        require : true,
    },
    stock_in : {
        type : [ String ],
        require : true,
    },
    price : {
        low : {
            type : Number,
            default : -1,
        },
        high : {
            type : Number,
            default : -1,
        },
        yearlyLow : {
            type : Number,
            default : -1,
        },
        yearlyHigh : {            
            type : Number,
            default : -1,            
        },
        currPrice : {
            type : Number,
            default : -1,
        },
        todayStart : {
            type : Number,
            default : -1,
        },
        todayPrOrLoss : {
            pricePrOrLoss : {
                type : Number,
                default : -1,
            },
            percentagePrOrLoss : {
                type : Number,
                default : -1,
            }
        },
        day : {
            prevUpdatedDate : {
                type : Number,
                default : -1,
            },
            data :{
                type : [Number],
                default : [],
            }
        },
        week : {
            prevUpdatedDate : {
                type : Number,
                default : -1,
            },
            data :{
                type : [Number],
                default : [],
            }
        },
        month : {
            prevUpdatedDate : {
                type : Number,
                default : -1,
            },
            data :{
                type : [Number],
                default : [],
            }
        },
        year : {
            prevUpdatedDate : {
                type : Number,
                default : -1,
            },
            data :{
                type : [Number],
                default : [],
            }
        },
    }
}, { versionKey: false });

const stockModel = mongoose.model('stocklistmodels', stockSchema);

module.exports = {
    stockModel,
}