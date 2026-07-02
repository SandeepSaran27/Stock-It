const mongoose = require("mongoose");

const holdingsSchema = new mongoose.Schema({
    stock_name: {
        type: String,
        required: true,
    },
    bought_price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        default : 1,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const allOrderSchema = new mongoose.Schema({
    stock_name: {
        type: String,
        required: true,
    },
    bought_price: {
        type: Number,
        requiredd: true,
    },
    bought_date: {
        type: Date,
        default: Date.now,
    },
    qty:{
        type: Number,
        default:0,
    },
    sold_price: {
        type: Number,
        default: -1,
    },
    sold_date: {
        type: Date,
        default: null,
    },
    pr_or_loss: {
        type: Number,
        default: -1,
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile_no: {
        type: Number,
        default: 9999999999,
    },
    email: {
        type: String,
        default: 'user@gmail.com',
    },
    valet_balance: {
        type: Number,
        default: -1,
    },
    holdings: {
        type: [holdingsSchema],
        default: [],
    },
    watch_list : {
        type : [String],
        default : [],
    },
    pr_or_loss_graph : {
        type : [Number],
        default : [],
    },
    all_orders: {
        type: [allOrderSchema],
        default: [],
    },
    dark_mode : {
        type : Boolean,
        default : true,
    },
});

const userModel = mongoose.model('userdatamodel', userSchema);

module.exports = {
    userModel,
}