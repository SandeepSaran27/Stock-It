
const jwt = require('jsonwebtoken');

const { userModel } = require('../models/user');
//const { stockModel } = require('../models/stocks');
//const { historicStockModel } = require("../models/stockModel");
const YearStockModel = require("../models/stockModel");
const { setUser, getUser } = require('../services/auth');
const { updateAllOrdersOfBuy, updateAllOrdersOfSold } = require('../services/updateUserAllOrders');
const { NseIndia } = require("stock-nse-india");
const nseIndia = new NseIndia();

const YahooFinance =
    require("yahoo-finance2").default;

// IMPORTANT
// Create instance for latest yahoo-finance2 versions

const yahooFinance =
    new YahooFinance();

//Without yahoo
async function getHistoricData(req, res) {

    try {

        const { stockName } = req.params;

        const stock = await YearStockModel.findOne({
            stock_name: {
                $regex: new RegExp(`^${stockName}$`, "i")
            }
        });

        if (!stock) {
            return res.status(404).json({
                success: false,
                message: "Stock not found"
            });
        }

        // =========================
        // SORT DATA
        // =========================

        const allData = [...stock.price.pricesWithDate].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );

        const currentDate = new Date();

        // =========================
        // HISTORIC DATA (LAST 52 WEEKS)
        // =========================

        const last52WeekDate = new Date();
        last52WeekDate.setDate(currentDate.getDate() - 364);

        const historicData = allData
            .filter(item => new Date(item.date) >= last52WeekDate)
            .map(item => ({
                date: item.date,
                low: item.low,
                high: item.high
            }));

        // =========================
        // CURRENT DAY DATA
        // =========================

        const latest =
            allData.length > 0
                ? allData[allData.length - 1]
                : null;

        // =========================
        // MONTH DATA
        // =========================

        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const monthData = allData.filter(item => {

            const d = new Date(item.date);

            return (
                d.getMonth() === currentMonth &&
                d.getFullYear() === currentYear
            );

        });

        // =========================
        // YEAR DATA
        // =========================

        const yearData = allData.filter(item => {

            const d = new Date(item.date);

            return d.getFullYear() === currentYear;

        });

        // =========================
        // CALCULATIONS
        // =========================

        const monthHigh =
            monthData.length
                ? Math.max(...monthData.map(x => x.high))
                : -2;

        const monthLow =
            monthData.length
                ? Math.min(...monthData.map(x => x.low))
                : -2;

        const yearHigh =
            yearData.length
                ? Math.max(...yearData.map(x => x.high))
                : -2;

        const yearLow =
            yearData.length
                ? Math.min(...yearData.map(x => x.low))
                : -2;

        const weekData = allData.filter(item => {

            const diff =
                (currentDate - new Date(item.date)) /
                (1000 * 60 * 60 * 24);

            return diff <= 7;

        });

        const weekHigh =
            weekData.length
                ? Math.max(...weekData.map(x => x.high))
                : -2;

        const weekLow =
            weekData.length
                ? Math.min(...weekData.map(x => x.low))
                : -2;

        // =========================
        // EQUITY DETAILS
        // =========================

        const equityDetails = [

            {
                type: "todayOpen",
                value: stock.price.todayStart ?? -2
            },

            {
                type: "previousClose",
                value: -2
            },

            {
                type: "dayHigh",
                value: latest?.high ?? -2
            },

            {
                type: "dayLow",
                value: latest?.low ?? -2
            },

            {
                type: "currentPrice",
                value: stock.price.currPrice ?? -2
            },

            {
                type: "52WeekHigh",
                value: yearHigh
            },

            {
                type: "52WeekLow",
                value: yearLow
            },

            {
                type: "volume",
                value: latest?.totSharesTradedToday ?? -2
            },

            {
                type: "upperCircuit",
                value: -2
            },

            {
                type: "lowerCircuit",
                value: -2
            },

            {
                type: "monthHigh",
                value: monthHigh
            },

            {
                type: "monthLow",
                value: monthLow
            },

            {
                type: "yearHigh",
                value: yearHigh
            },

            {
                type: "yearLow",
                value: yearLow
            },

            {
                type: "weekHigh",
                value: weekHigh
            },

            {
                type: "weekLow",
                value: weekLow
            }

        ];

        return res.status(200).json({

            success: true,

            totalHistoricRecords: historicData.length,

            historicData,

            equityDetails

        });

    }
    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

}

//with yahoo
/*async function getHistoricData(req, res) {

    try {

        const { stockName } = req.params;

        // =========================
        // FIND STOCK FROM DB
        // =========================

        const stock =
            await YearStockModel.findOne({

                stock_name: {

                    $regex: new RegExp(
                        `^${stockName}$`,
                        "i"
                    )
                }
            });

        if (!stock) {

            return res.status(404).json({

                success: false,
                message: "Stock not found"

            });
        }

        // =========================
        // SORT ALL DATA
        // =========================

        const allData =
            stock.price.pricesWithDate.sort(

                (a, b) =>

                    new Date(a.date) -

                    new Date(b.date)
            );

        const currentDate =
            new Date();

        // =========================
        // LAST 52 WEEK DATA
        // =========================

        const last52WeekDate =
            new Date();

        last52WeekDate.setDate(

            currentDate.getDate() - 364
        );

        const historicData =

            allData

                .filter((item) => {

                    return (

                        new Date(item.date) >=

                        last52WeekDate
                    );
                })

                .map((item) => ({

                    date: item.date,

                    low: item.low,

                    high: item.high

                }));


        // =========================
        // YAHOO FINANCE DATA
        // =========================

        let yahooData = null;

        // try {

        //     const symbol =

        //         `${stockName
        //             .toUpperCase()
        //             .trim()}.NS`;

                

        //     yahooData =
        //         await yahooFinance.quote(
        //             symbol
        //         );

                

        // }
        // catch (yahooErr) {

        //     console.log(

        //         "YAHOO FETCH ERROR:",

        //         yahooErr.message
        //     );
        // }


        // =========================
        // MONTH DATA
        // =========================

        const currentMonth =
            currentDate.getMonth();

        const currentYear =
            currentDate.getFullYear();

        const monthData =

            allData.filter((item) => {

                const d =
                    new Date(item.date);

                return (

                    d.getMonth() === currentMonth &&

                    d.getFullYear() === currentYear
                );
            });


        // =========================
        // YEAR DATA
        // =========================

        const yearData =

            allData.filter((item) => {

                const d =
                    new Date(item.date);

                return (

                    d.getFullYear() === currentYear
                );
            });


        // =========================
        // CALCULATIONS
        // =========================

        const monthHigh =

            monthData.length > 0

                ? Math.max(

                    ...monthData.map(

                        item => item.high
                    )
                )

                : -1;


        const monthLow =

            monthData.length > 0

                ? Math.min(

                    ...monthData.map(

                        item => item.low
                    )
                )

                : -1;


        const yearHigh =

            yearData.length > 0

                ? Math.max(

                    ...yearData.map(

                        item => item.high
                    )
                )

                : -1;


        const yearLow =

            yearData.length > 0

                ? Math.min(

                    ...yearData.map(

                        item => item.low
                    )
                )

                : -1;


        // =========================
        // EQUITY DETAILS
        // =========================

        const equityDetails = [

            {
                type: "todayOpen",

                value:
                    yahooData
                        ?.regularMarketOpen ?? -1
            },

            {
                type: "previousClose",

                value:
                    yahooData
                        ?.regularMarketPreviousClose ?? -1
            },

            {
                type: "dayHigh",

                value:
                    yahooData
                        ?.regularMarketDayHigh ?? -1
            },

            {
                type: "dayLow",

                value:
                    yahooData
                        ?.regularMarketDayLow ?? -1
            },

            {
                type: "currentPrice",

                value:
                    yahooData
                        ?.regularMarketPrice ?? -1
            },

            {
                type: "52WeekHigh",

                value:
                    yahooData
                        ?.fiftyTwoWeekHigh ?? -1
            },

            {
                type: "52WeekLow",

                value:
                    yahooData
                        ?.fiftyTwoWeekLow ?? -1
            },

            {
                type: "volume",

                value:
                    yahooData
                        ?.regularMarketVolume ?? 0
            },

            {
                type: "upperCircuit",

                value: -1
            },

            {
                type: "lowerCircuit",

                value: -1
            },

            {
                type: "monthHigh",

                value:
                    monthHigh
            },

            {
                type: "monthLow",

                value:
                    monthLow
            },

            {
                type: "yearHigh",

                value:
                    yearHigh
            },

            {
                type: "yearLow",

                value:
                    yearLow
            }

        ];


        // =========================
        // FINAL RESPONSE
        // =========================

        return res.status(200).json({

            success: true,

            totalHistoricRecords:
                historicData.length,

            historicData,

            equityDetails
        });

    }
    catch (err) {

        console.log(
            "SERVER ERROR:",
            err
        );

        return res.status(500).json({

            success: false,

            message:
                "Server Error"
        });
    }
}*/

//Old function
/*async function getHistoricData(req, res) {

    try {

        const { stockName } = req.params;

        // DB DATA
        const stock = await YearStockModel.findOne({
            stock_name: {
                $regex: new RegExp(`^${stockName}$`, "i")
            }
        });

        if (!stock) {

            return res.status(404).json({
                success: false,
                message: "Stock not found"
            });
        }

        // SORT ALL DATA
        const allData =
            stock.price.pricesWithDate.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );

        const currentDate = new Date();

        // =========================
        // LAST 52 WEEKS DATA
        // =========================

        const last52WeekDate = new Date();

        last52WeekDate.setDate(
            currentDate.getDate() - (52 * 7)
        );

        const historicData =
            allData
                .filter((item) => {

                    const itemDate =
                        new Date(item.date);

                    return itemDate >= last52WeekDate;
                })
                .map((item) => ({

                    date: item.date,
                    low: item.low,
                    high: item.high

                }));

        //console.log("allData",  allData);
        //console.log("historicData", historicData);

        // =========================
        // NSE DATA
        // =========================

        //const nseData =
        //    await nseIndia.getEquityDetails(stockName);
        //console.log(stockName);
        //console.log(nseData);
        const symbol =
            stockName.toUpperCase().trim();

        console.log("SYMBOL:", symbol);

        const nseData =
            await nseIndia.getEquityDetails(symbol);

        console.log("NSE DATA:", nseData);

        // =========================
        // MONTH DATA
        // =========================

        const currentMonth =
            currentDate.getMonth();

        const currentYear =
            currentDate.getFullYear();

        const monthData =
            allData.filter((item) => {

                const d = new Date(item.date);

                return (
                    d.getMonth() === currentMonth &&
                    d.getFullYear() === currentYear
                );
            });

        // =========================
        // YEAR DATA
        // =========================

        const yearData =
            allData.filter((item) => {

                const d = new Date(item.date);

                return (
                    d.getFullYear() === currentYear
                );
            });


        // =========================
        // CALCULATIONS
        // =========================

        const monthHigh =
            monthData.length > 0
                ? Math.max(
                    ...monthData.map(
                        item => item.high
                    )
                )
                : -1;

        const monthLow =
            monthData.length > 0
                ? Math.min(
                    ...monthData.map(
                        item => item.low
                    )
                )
                : -1;

        const yearHigh =
            yearData.length > 0
                ? Math.max(
                    ...yearData.map(
                        item => item.high
                    )
                )
                : -1;

        const yearLow =
            yearData.length > 0
                ? Math.min(
                    ...yearData.map(
                        item => item.low
                    )
                )
                : -1;


        // =========================
        // SECOND ARRAY
        // =========================

        const equityDetails = [

            {
                type: "todayOpen",
                value:
                    nseData?.priceInfo?.open || -1
            },

            {
                type: "previousClose",
                value:
                    nseData?.priceInfo?.previousClose || -1
            },

            {
                type: "dayHigh",
                value:
                    nseData?.priceInfo?.intraDayHighLow?.max || -1
            },

            {
                type: "dayLow",
                value:
                    nseData?.priceInfo?.intraDayHighLow?.min || -1
            },

            {
                type: "currentPrice",
                value:
                    nseData?.priceInfo?.lastPrice || -1
            },

            {
                type: "52WeekHigh",
                value:
                    nseData?.priceInfo?.weekHighLow?.max || -1
            },

            {
                type: "52WeekLow",
                value:
                    nseData?.priceInfo?.weekHighLow?.min || -1
            },

            {
                type: "volume",
                value:

                    nseData?.securityWiseDP?.quantityTraded ||

                    nseData?.preOpenMarket?.totalTradedVolume ||

                    nseData?.priceInfo?.totalTradedVolume ||

                    0
            },

            {
                type: "upperCircuit",
                value:
                    nseData?.priceInfo?.upperCP || -1
            },

            {
                type: "lowerCircuit",
                value:
                    nseData?.priceInfo?.lowerCP || -1
            },

            {
                type: "monthHigh",
                value: monthHigh
            },

            {
                type: "monthLow",
                value: monthLow
            },

            {
                type: "yearHigh",
                value: yearHigh
            },

            {
                type: "yearLow",
                value: yearLow
            }

        ];


        // FINAL RESPONSE
        return res.status(200).json({

            success: true,

            totalHistoricRecords:
                historicData.length,

            historicData,

            equityDetails

        });

    }
    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,
            message: "Server Error"

        });
    }
}*/

async function handleUserLogIn(req, res) {
    const DATA = req.body;
    const userData = await userModel.findOne({
        name: DATA.name,
        password: DATA.passWord,
    });
    if (!userData) {
        return res.status(400).json({ msg: 'User not found' });
    }
    const token = setUser(userData);
    if (!token) {
        return res.status(400).json({ msg: 'token not generated @controler' });
    }
    res.cookie("uid", token, { httpOnly: true, secure: true, sameSite: "none", });
    //IN localhost env
    /*res.cookie("uid", token, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
    });*/
    return res.status(200).json({
        msg: 'login completed',
        userData: userData,
    });
}

async function handleUserLogOut(req, res) {
    try {

        res.clearCookie("uid", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
});

        return res.status(200).json({
            msg: "Logout Successful"
        });

    } catch (error) {

        console.log("Logout Error:", error);

        return res.status(500).json({
            msg: "Internal Server Error"
        });

    }
}


async function handleUserSignUp(req, res) {
    const DATA = req.body;
    const result = await userModel.create({
        name: DATA.name,
        password: DATA.password,
        mobile_no: DATA.mobile_no,
        email: DATA.email,
    });
    return res.status(200).json({ msg: 'singup completed' });
}

async function addMoneyInUserValet(req, res) {
    try {
        const { amount } = req.body;

        // =========================
        // GET USER FROM COOKIE
        // =========================

        const token = req.cookies.uid;

        if (!token) {
            return res.status(401).json({
                msg: "Not authenticated",
            });
        }

        const userId = getUser(token)._id;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                msg: "User not found",
            });
        }

        user.valet_balance += Number(amount);

        await user.save();

        return res.json({
            msg: `${amount} Added`,
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            msg: "Server Error",
        });
    }
}

async function buyStock(req, res) {

    try {

        // const DATA = req.body;

        // const qty =
        //     Number(DATA.qty);

        // const stockName =
        //     DATA.stock_name;

        // // =========================
        // // GET USER ID FROM TOKEN
        // // =========================

        // const userId =
        //     getUser(
        //         DATA.user_name.slice(4)
        //     )._id;

        // // =========================
        // // GET FULL USER DOCUMENT
        // // =========================

        // const user =
        //     await userModel.findOne({
        //         _id: userId
        //     });

        const DATA = req.body;

const qty = Number(DATA.qty);

const stockName = DATA.stock_name;

// =========================
// GET USER FROM COOKIE
// =========================

const token = req.cookies.uid;

if (!token) {
    return res.status(401).json({
        msg: "Not authenticated",
    });
}

const userInfo = getUser(token);

const user = await userModel.findById(userInfo._id);

if (!user) {
    return res.status(404).json({
        msg: "User not found",
    });
}

        // =========================
        // GET STOCK
        // =========================

        const stock =
            await YearStockModel.findOne({
                stock_name: stockName
            });

        if (!stock) {

            return res.status(404).json({
                msg: "Stock Not Found"
            });
        }

        const totalPrice =
            stock.price.currPrice * qty;

        // =========================
        // CHECK BALANCE
        // =========================

        if (user.valet_balance < totalPrice) {

            return res.json({
                msg: "Insufficient Balance"
            });
        }

        // =========================
        // CHECK EXISTING HOLDING
        // =========================

        const existingHolding =
            user.holdings.find(
                item =>
                    item.stock_name === stockName
            );

        // =========================
        // STOCK ALREADY EXISTS
        // =========================

        if (existingHolding) {

            const oldQty =
                existingHolding.qty;

            const oldPrice =
                existingHolding.bought_price;

            const newAvgPrice =
                (
                    (oldQty * oldPrice)
                    +
                    (qty * stock.price.currPrice)
                )
                /
                (oldQty + qty);

            existingHolding.qty += qty;

            existingHolding.bought_price =
                Number(
                    newAvgPrice.toFixed(2)
                );
        }

        // =========================
        // NEW STOCK
        // =========================

        else {

            user.holdings.push({

                stock_name:
                    stock.stock_name,

                bought_price:
                    stock.price.currPrice,

                qty: qty,

                date: Date.now()
            });
        }

        // =========================
        // UPDATE BALANCE
        // =========================

        user.valet_balance -= totalPrice;

        await user.save();

        // =========================
        // UPDATE ALL ORDERS
        // =========================

        await updateAllOrdersOfBuy(
            user,
            {
                stock_name:
                    stock.stock_name,

                bought_price:
                    stock.price.currPrice,

                qty: qty
            }
        );

        return res.json({
            msg: "Stock Bought Successfully"
        });

    }
    catch (err) {

        console.log(err);

        return res.status(500).json({
            msg: "Server Error"
        });
    }
}

/*async function buyStock(req, res) {
    const DATA = req.body;
    //console.log("DATA", DATA);
    const qty = Number(DATA.qty);
    const stockName = DATA.stock_name;
    //console.log("stockName", stockName);
    const userId = getUser(DATA.user_name.slice(4))._id;
    const user = await userModel.findOne({ _id: userId });
    const stock2 = await stockModel.findOne({ stock_name: stockName });
    const userBalance = user.valet_balance;
    //console.log("stock", stock);

    if (userBalance >= (stock2.price.currPrice * qty)) {

        const holdings = user.holdings;

        const newHolding = {
            stock_name: stock2.stock_name,
            bought_price: stock2.price.currPrice,
            qty: qty,
            date: Date.now(),
        }
        holdings.push(newHolding);
        await user.save();

        //Cut the amount of stocks from user valet
        let currBalance = user.valet_balance;
        let newBalance = currBalance - (stock2.price.currPrice * qty);
        user.valet_balance = newBalance;
        await user.save();
        //Update data at allOrders
        //updateAllOrdersOfBuy(user, newHolding, false);
        await updateAllOrdersOfBuy(
            user,
            newHolding
        );
        return res.json({ msg: 'Stock Owned' })
    } else {
        console.log("Dabbulu levu ra puka");
        return res.json({ msg: 'Error in stock buying' })
    }
}*/

async function returnUserData(req, res) {
    try {

        // =========================
        // GET USER FROM COOKIE
        // =========================

        const token = req.cookies.uid;

        if (!token) {

            return res.status(401).json({
                msg: "Not authenticated",
            });

        }

        const user = getUser(token);

        const userData = await userModel.findById(user._id);

        if (!userData) {

            return res.status(404).json({
                msg: "User not found",
            });

        }

        return res.json({
            userData,
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            msg: "Server Error",
        });
    }
}

async function returnUserHoldings(req, res) {
    try {
        const token = req.cookies.uid;

        if (!token) {
            return res.status(401).json({
                msg: "Not authenticated",
            });
        }

        const userId = getUser(token)._id;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                msg: "User not found",
            });
        }

        return res.json({
            HOLDINGS: user.holdings,
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            msg: "Server Error",
        });
    }
}

/*async function soldStock(req, res) {

    try {

        const DATA = req.body;

        const user = getUser(
            DATA.userIdToken.slice(4)
        );

        const userData = await userModel.findOne({
            _id: user._id
        });

        const stockData = DATA.stockData;

        const HOLDINGS = userData.holdings;

        for (let i = 0; i < HOLDINGS.length; i++) {

            const stockDate =
                new Date(stockData.date).getTime();

            const holdingsDate =
                new Date(HOLDINGS[i].date).getTime();

            if (
                HOLDINGS[i].stock_name === stockData.stock_name &&
                holdingsDate === stockDate
            ) {

                HOLDINGS.splice(i, 1);

                userData.holdings = HOLDINGS;

                await userData.save();

                break;
            }
        }

        await updateAllOrdersOfSold(
            userData,
            stockData
        );

        return res.json({
            msg: "Stock Sold Successfully"
        });

    } catch (error) {

        console.log("soldStock Error:", error);

        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}*/

// ================================
// soldStock()
// ================================

async function soldStock(req, res) {

    try {

        const DATA = req.body;

        // =========================
        // GET USER FROM COOKIE
        // =========================

        const token = req.cookies.uid;

        if (!token) {
            return res.status(401).json({
                msg: "Not authenticated",
            });
        }

        const user = getUser(token);

        const userData = await userModel.findOne({
            _id: user._id,
        });

        if (!userData) {
            return res.status(404).json({
                msg: "User not found",
            });
        }

        // =========================
        // REQUEST DATA
        // =========================

        const {
            stock_name,
            sellQty
        } = DATA;

        // =========================
        // FIND HOLDING
        // =========================

        const holding =
            userData.holdings.find(
                item =>
                    item.stock_name ===
                    stock_name
            );

        if (!holding) {

            return res.status(404).json({
                msg: "Holding not found"
            });
        }

        // =========================
        // CHECK QTY
        // =========================

        if (sellQty > holding.qty) {

            return res.status(400).json({
                msg: "Not enough quantity"
            });
        }

        // =========================
        // GET CURRENT STOCK PRICE
        // =========================

        const stock =
            await YearStockModel.findOne({
                stock_name: stock_name
            });

        if (!stock) {

            return res.status(404).json({
                msg: "Stock not found"
            });
        }

        const currentPrice =
            stock.price.currPrice;

        // =========================
        // TOTAL SELL AMOUNT
        // =========================

        const totalSellAmount =
            currentPrice * sellQty;

        // =========================
        // ADD MONEY TO USER
        // =========================

        userData.valet_balance +=
            totalSellAmount;

        // =========================
        // UPDATE HOLDINGS
        // =========================

        holding.qty -= sellQty;

        if (holding.qty === 0) {

            userData.holdings =
                userData.holdings.filter(
                    item =>
                        item.stock_name !==
                        stock_name
                );
        }

        // =========================
        // UPDATE ALL ORDERS
        // =========================

        let remainingQty =
            sellQty;

        for (
            let i = 0;
            i < userData.all_orders.length;
            i++
        ) {

            const order =
                userData.all_orders[i];

            // ONLY UNSOLD ORDERS
            if (

                order.stock_name === stock_name &&

                order.sold_price === -1
            ) {

                // =========================
                // FULL ORDER SOLD
                // =========================

                if (
                    order.qty <= remainingQty
                ) {

                    order.sold_price =
                        currentPrice;

                    order.sold_date =
                        Date.now();

                    order.pr_or_loss =
                        (
                            currentPrice
                            -
                            order.bought_price
                        )
                        *
                        order.qty;

                    remainingQty -=
                        order.qty;
                }

                // =========================
                // PARTIAL SELL
                // =========================

                else {

                    // remaining qty in old order

                    const remainingOrderQty =
                        order.qty - remainingQty;

                    // sold part

                    const soldOrder = {

                        stock_name:
                            order.stock_name,

                        bought_price:
                            order.bought_price,

                        bought_date:
                            order.bought_date,

                        qty:
                            remainingQty,

                        sold_price:
                            currentPrice,

                        sold_date:
                            Date.now(),

                        pr_or_loss:
                            (
                                currentPrice
                                -
                                order.bought_price
                            )
                            *
                            remainingQty
                    };

                    // update old order qty

                    order.qty =
                        remainingOrderQty;

                    // push sold order

                    userData.all_orders.push(
                        soldOrder
                    );

                    remainingQty = 0;
                }
            }

            if (remainingQty === 0) {
                break;
            }
        }

        // =========================
        // SAVE USER
        // =========================

        await userData.save();

        return res.json({

            msg:
                "Stock Sold Successfully",

            soldAmount:
                totalSellAmount,

            currentBalance:
                userData.valet_balance
        });

    }
    catch (err) {

        console.log(err);

        return res.status(500).json({
            msg: "Server Error"
        });
    }
}

async function returnUserAllOrders(req, res) {
    try {

        // =========================
        // GET USER FROM COOKIE
        // =========================

        const token = req.cookies.uid;

        if (!token) {

            return res.status(401).json({
                message: "Not authenticated"
            });

        }

        const userData = getUser(token);

        const userId = userData._id;

        const USER = await userModel.findOne({
            _id: userId
        });

        if (!USER) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        return res.status(200).json({
            ALL_ORDERS: USER.all_orders
        });

    } catch (error) {

        console.log("Error in returnUserAllOrders:", error);

        return res.status(500).json({
            message: "Internal server error"
        });

    }
}

async function checkAuth(req, res) {

    const token = req.cookies.uid;

    if (!token) {
        return res.status(401).json({
            authenticated: false
        });
    }

    try {

        const user = getUser(token);

        if (!user) {
            return res.status(401).json({
                authenticated: false
            });
        }

        return res.json({
            authenticated: true,
            userName: user.name
        });

    } catch {

        return res.status(401).json({
            authenticated: false
        });
    }
}

module.exports = {
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
}
