import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../extraComponents/NavBarFolder/NavBar";
import StockItFooter from "../extraComponents/FooterFolder/Footer";
import StockImg from "./StockProfileFolder/StockProfile";
import style from "./Stock.module.css";

const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

const INDICES = [
    "NIFTY 50",
    "NIFTY Next 50",
    "NIFTY 100",
    "NIFTY 200",
    "NIFTY 500",
    "NIFTY Midcap 150",
    "NIFTY Midcap 100",
    "NIFTY Midcap 50",
    "NIFTY Smallcap 250",
    "NIFTY Smallcap 100",
    "NIFTY Smallcap 50",
    "NIFTY Microcap 250",
    "NIFTY Bank",
    "NIFTY Auto",
    "NIFTY IT",
    "NIFTY FMCG",
    "NIFTY Pharma",
    "NIFTY Oil & Gas",
    "NIFTY Metal",
    "NIFTY Realty",
    "NIFTY Healthcare",
    "NIFTY Media",
];

function StockPage() {

    const [allStocksData, setAllStocksData] = useState({});
    const [trendingStocks, setTrendingStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        async function getData() {

            try {

                const responses = await Promise.all(

                    INDICES.map((section) =>
                        fetch(`${BACKEND_SERVER_URL}stock/get-all-stock-of`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ section }),
                        })
                    )

                );

                const results = await Promise.all(
                    responses.map((res) => res.json())
                );

                const stockObject = {};

                INDICES.forEach((index, i) => {
                    stockObject[index] = results[i];
                });

                setAllStocksData(stockObject);

                // Merge all stocks
                const mergedStocks = results.flat();

                // Remove duplicate stocks by stock_name
                const uniqueStocks = Array.from(
                    new Map(
                        mergedStocks.map(stock => [
                            stock.stock_name.toUpperCase(),
                            stock
                        ])
                    ).values()
                );

                // Sort by daily spread
                const sortedTrending = uniqueStocks.sort((a, b) => {

                    const latestA =
                        a?.price?.pricesWithDate?.[
                        a.price.pricesWithDate.length - 1
                        ];

                    const latestB =
                        b?.price?.pricesWithDate?.[
                        b.price.pricesWithDate.length - 1
                        ];

                    const spreadA =
                        latestA && latestA.low > 0
                            ? (latestA.high - latestA.low) / latestA.low
                            : 0;

                    const spreadB =
                        latestB && latestB.low > 0
                            ? (latestB.high - latestB.low) / latestB.low
                            : 0;

                    return spreadB - spreadA;
                });

                setTrendingStocks(sortedTrending.slice(0, 5));

                // const sortedTrending = [...mergedStocks].sort((a, b) => {

                //     const latestA =
                //         a?.price?.pricesWithDate?.[
                //             a.price.pricesWithDate.length - 1
                //         ];

                //     const latestB =
                //         b?.price?.pricesWithDate?.[
                //             b.price.pricesWithDate.length - 1
                //         ];

                //     const spreadA =
                //         latestA && latestA.low > 0
                //             ? (latestA.high - latestA.low) / latestA.low
                //             : 0;

                //     const spreadB =
                //         latestB && latestB.low > 0
                //             ? (latestB.high - latestB.low) / latestB.low
                //             : 0;

                //     return spreadB - spreadA;

                // });

                setTrendingStocks(sortedTrending.slice(0, 5));

            } catch (error) {

                console.error("Failed to fetch stocks:", error);

            } finally {

                setLoading(false);

            }

        }

        getData();

    }, []);

    const handleCategoryClick = (categoryName, data) => {

        navigate("/stocks/category", {
            state: {
                selectedCategory: categoryName,
                selectedStocksData: data,
            },
        });

    };

    return (

        <div className={style.pageBg}>

            <NavBar />

            <div className={style.pageWrapper}>

                {loading ? (

                    <div className={style.loader}>
                        Loading Market Data...
                    </div>

                ) : (

                    <>

                        {/* Trending */}

                        <div className={style.trendingSection}>

                            <h2 className={style.sectionTitle}>
                                TOP TRENDING
                            </h2>

                            <div className={style.subContainer}>

                                {trendingStocks.map((stock) => (

                                    <Link
                                        key={`trend-${stock._id}`}
                                        to={`/stock/${stock._id}`}
                                        state={{
                                            stockName: stock.stock_name,
                                            stockData: [stock],
                                        }}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >

                                        <StockImg
                                            stock={stock}
                                            length={220}
                                        />

                                    </Link>

                                ))}

                            </div>

                        </div>

                        <hr className={style.divider} />

                        {/* Categories */}

                        {INDICES.map((indexName) => {

                            const stocks =
                                allStocksData[indexName] || [];

                            return (

                                <div
                                    className={style.mainContainer}
                                    key={indexName}
                                >

                                    <div
                                        className={style.headerFlex}
                                        onClick={() =>
                                            handleCategoryClick(
                                                indexName,
                                                stocks
                                            )
                                        }
                                    >

                                        <h2 className={style.sectionTitle}>
                                            {indexName}
                                        </h2>

                                        <span className={style.viewAll}>
                                            View All →
                                        </span>

                                    </div>

                                    <div className={style.subContainer}>

                                        {stocks.slice(0, 10).map((stock) => (

                                            <Link
                                                key={stock._id}
                                                to={`/stock/${stock._id}`}
                                                state={{
                                                    stockName:
                                                        stock.stock_name,
                                                    stockData: [stock],
                                                }}
                                                style={{
                                                    textDecoration: "none",
                                                    color: "inherit",
                                                }}
                                            >

                                                <StockImg
                                                    stock={stock}
                                                    length={220}
                                                />

                                            </Link>

                                        ))}

                                    </div>

                                </div>

                            );

                        })}

                    </>

                )}

            </div>

            <StockItFooter />

        </div>

    );

}

export default StockPage;

/*import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from '../extraComponents/NavBarFolder/NavBar';
import StockItFooter from '../extraComponents/FooterFolder/Footer';
import StockImg from './StockProfileFolder/StockProfile';
import style from "./Stock.module.css";

const INDICES = [
    "NIFTY 50",
    'NIFTY Next 50',
    'NIFTY 100',
    'NIFTY 200',
    'NIFTY 500',
    'NIFTY Midcap 150',
    'NIFTY Midcap 100',
    'NIFTY Midcap 50',
    'NIFTY Smallcap 250',
    'NIFTY Smallcap 100',
    'NIFTY Smallcap 50',
    'NIFTY Microcap 250',
    'NIFTY Bank',
    'NIFTY Auto',
    'NIFTY IT',
    'NIFTY FMCG',
    'NIFTY Pharma',
    'NIFTY Oil & Gas',
    'NIFTY Metal',
    'NIFTY Realty',
    'NIFTY Healthcare',
    'NIFTY Media',
];

function StockPage() {
    const [allStocksData, setAllStocksData] = useState({});
    const [trendingStocks, setTrendingStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                // Fetch all indices data together
                const responses = await Promise.all(
                    INDICES.map((section) =>
                        fetch("http://localhost:8000/stock/get-all-stock-of", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ section }),
                        })
                    )
                );

                const results = await Promise.all(
                    responses.map((res) => res.json())
                );

                // Convert array into object
                const stockObject = {};

                INDICES.forEach((index, i) => {
                    stockObject[index] = results[i];
                });

                setAllStocksData(stockObject);

                // Create trending list from all stocks
                const mergedStocks = results.flat();

                const sortedTrending = mergedStocks.sort((a, b) => {
                    const spreadA =
                        (a.price.high - a.price.low) / a.price.low;

                    const spreadB =
                        (b.price.high - b.price.low) / b.price.low;

                    return spreadB - spreadA;
                });

                setTrendingStocks(sortedTrending.slice(1, 6));

            } catch (error) {
                console.error("Failed to fetch stocks:", error);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    const handleCategoryClick = (categoryName, data) => {
        navigate('/stocks/category', {
            state: {
                selectedCategory: categoryName,
                selectedStocksData: data,
            }
        });
    };

    return (
        <div className={style.pageBg}>
            <NavBar />

            <div className={style.pageWrapper}>
                {loading ? (
                    <div className={style.loader}>
                        Loading Market Data...
                    </div>
                ) : (
                    <>
                        <div className={style.trendingSection}>
                            <h2 className={style.sectionTitle}>
                                TOP TRENDING
                            </h2>

                            <div className={style.subContainer}>
                                {trendingStocks.map((stock) => (
                                    <Link
                                        key={`trend-${stock._id}`}
                                        to={`/stock/${stock._id}`}
                                        state={{
                                            stockName: stock.name,
                                            stockData: [stock],
                                        }}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                        }}
                                    >
                                        <StockImg
                                            stock={stock}
                                            length={220}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <hr className={style.divider} />

                        {INDICES.map((indexName) => {
                            const stocks = allStocksData[indexName] || [];

                            return (
                                <div
                                    className={style.mainContainer}
                                    key={indexName}
                                >
                                    <div
                                        className={style.headerFlex}
                                        onClick={() =>
                                            handleCategoryClick(
                                                indexName,
                                                stocks
                                            )
                                        }
                                    >
                                        <h2 className={style.sectionTitle}>
                                            {indexName}
                                        </h2>

                                        <span className={style.viewAll}>
                                            View All →
                                        </span>
                                    </div>

                                    <div className={style.subContainer}>
                                        {stocks.slice(1, 11).map((stock) => (
                                            <Link
                                                key={stock._id}
                                                to={`/stock/${stock._id}`}
                                                state={{
                                                    stockName: stock.name,
                                                    stockData: [stock],
                                                }}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                }}
                                            >
                                                <StockImg
                                                    stock={stock}
                                                    length={220}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            <StockItFooter />
        </div>
    );
}

export default StockPage;*/
