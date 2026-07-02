import NavBar from '../extraComponents/NavBarFolder/NavBar';
import StockItFooter from '../extraComponents/FooterFolder/Footer';
import {
    useEffect,
    useState
} from "react";

import {
    useLocation,
    Link
} from "react-router-dom";

const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

function SearchedStock() {

    const [searchedStocks, setSearchedStocks] =
        useState([]);

    const [extraStocks, setExtraStocks] =
        useState([]);

    const location = useLocation();

    const query =
        new URLSearchParams(location.search);

    const searchedText = query.get('text');

    useEffect(() => {

        async function fetchData() {

            try {

                const response = await fetch(

                    `${BACKEND_SERVER_URL}stock/get-searched-stock?searchText=${searchedText}`
                );

                const DATA =
                    await response.json();

                setSearchedStocks(
                    DATA.searchedStocks
                );

                setExtraStocks(
                    DATA.extraStocks
                );

            } catch (error) {

                console.log(
                    "Search frontend error:",
                    error
                );
            }
        }

        fetchData();

    }, [searchedText]);

    function stockCard(stock, i) {

        return (
 
            <Link
                key={i}
                to={`/stock/${stock.stock_name}`}

                state={{
                    stockName: stock.stock_name,
                    stockData: [stock]
                }}

                style={{
                    textDecoration: "none",
                    color: "inherit"
                }}
            >

                <div
                    style={{
                        border: "1px solid #d1d5db",
                        marginBottom: "18px",
                        padding: "18px",
                        borderRadius: "14px",
                        cursor: "pointer",
                        backgroundColor: "#ffffff",
                        boxShadow:
                            "0px 2px 10px rgba(0,0,0,0.08)",
                        transition: "0.3s"
                    }}
                >

                    <h2
                        style={{
                            marginBottom: "10px"
                        }}
                    >
                        {stock.stock_name}
                    </h2>

                    <p>
                        <b>Current Price:</b>
                        ₹{stock.price.currPrice}
                    </p>

                    <p>
                        <b>Today's Start:</b>
                        ₹{stock.price.todayStart}
                    </p>

 
                    <p>
                        <b>Today's High:</b>
                        ₹{stock.price.high}
                    </p>

                    <p>
                        <b>Today's Low:</b>
                        ₹{stock.price.low}
                    </p>

                    <p>
                        <b>Yearly High:</b>
                        ₹{stock.price.yearlyHigh}
                    </p>

                    <p>
                        <b>Yearly Low:</b>
                        ₹{stock.price.yearlyLow}
                    </p>

                    <p>
                        <b>Today's Profit/Loss:</b>
                        ₹{
                            stock.price
                                .todayPrOrLoss
                                .pricePrOrLoss
                        }
                    </p>

                    <p>
                        <b>Change Percentage:</b>
                        {
                            stock.price
                                .todayPrOrLoss
                                .percentagePrOrLoss
                        }%
                    </p>

                    <p>
                        <b>Available In:</b>{" "}
                        {
                            stock.stock_in.join(", ")
                        }
                    </p>

                </div>

            </Link>
        );
    }

    return (

        <>
<Navbar/>
            <div
                style={{
                    padding: "20px",
                    maxWidth: "900px",
                    margin: "auto"
                }}
            >

                <h1
                    style={{
                        marginBottom: "30px"
                    }}
                >
                    Search Results for "
                    {searchedText}"
                </h1>

                {/* MATCHING STOCKS */}

                <h2
                    style={{
                        marginBottom: "20px"
                    }}
                >
                    Matching Stocks
                </h2>

                {
                    searchedStocks.length > 0 ?

                        searchedStocks.map(
                            (ele, i) => {

                                return stockCard(
                                    ele.stock,
                                    i
                                );
                            }
                        )

                        :

                        <h3>
                            No matching stocks found
                        </h3>
                }

                <br />
                <br />

                {/* EXTRA STOCKS */}

                <h2
                    style={{
                        marginBottom: "20px"
                    }}
                >
                    Suggested Stocks
                </h2>

                {
                    extraStocks.length > 0 ?

                        extraStocks.map(
                            (ele, i) => {

                                return stockCard(
                                    ele.stock,
                                    i
                                );
                            }
                        )

                        :

                        <h3>
                            No suggestions available
                        </h3>
                }

            </div>
            <StockItFooter/>
        </>
    );
}

export default SearchedStock;