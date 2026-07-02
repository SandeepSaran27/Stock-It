const { userModel } = require('../models/user');
const { stockModel } = require('../models/stocks');

async function updateAllOrdersOfBuy(user, stockData) {

    try {

        const USER = await userModel.findOne({
            name: user.name,
        });

        if (!USER) {

            console.log("User not found");
            return;
        }

        const newOrderData = {

            stock_name: stockData.stock_name,

            bought_price: stockData.bought_price,

            bought_date: stockData.date,

            qty: stockData.qty,

            sold_price: -1,

            sold_date: null,

            pr_or_loss: -1,
        };

        USER.all_orders.push(newOrderData);

        await USER.save();

        console.log("Buy Order Added");

    } catch (error) {

        console.log(
            "Database error in updateAllOrdersOfBuy:",
            error
        );
    }
}

async function updateAllOrdersOfSold(user, stockData) {

    try {

        const USER = await userModel.findOne({
            name: user.name,
        });

        if (!USER) {

            console.log("User not found");
            return;
        }

        const STOCK = await stockModel.findOne({
            stock_name: stockData.stock_name
        });

        if (!STOCK) {

            console.log("Stock not found");
            return;
        }

        const currentPrice = STOCK.price.currPrice;

        const order = USER.all_orders.find((ele) => {

            const orderBoughtDate =
                new Date(ele.bought_date).getTime();

            const soldHoldingDate =
                new Date(stockData.date).getTime();

            return (

                ele.stock_name === stockData.stock_name &&

                orderBoughtDate === soldHoldingDate &&

                ele.sold_price === -1
            );
        });

        if (!order) {

            console.log("Order not found");
            return;
        }

        order.sold_price = currentPrice;

        order.sold_date = new Date();

        order.pr_or_loss =
            (
                currentPrice -
                order.bought_price
            ) * order.qty;

        await USER.save();

        console.log("Sell Order Updated");

    } catch (error) {

        console.log(
            "Database error in updateAllOrdersOfSold:",
            error
        );
    }
}

module.exports = {
    updateAllOrdersOfBuy,
    updateAllOrdersOfSold,
};