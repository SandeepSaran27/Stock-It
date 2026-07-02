import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import NavBar from '../../extraComponents/NavBarFolder/NavBar';

import style from './StocksOfParticularCategory.module.css';

const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

const TrendIcon = ({ isPositive }) => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {
            isPositive
                ? <path d="M7 11L12 6L17 11M12 18V7" />
                : <path d="M7 13L12 18L17 13M12 6V17" />
        }
    </svg>
);

const MiniGraph = ({ data, color }) => {

    if (!data || data.length === 0) {
        return <div className={style.graphContainer}></div>;
    }

    const min = Math.min(...data);
    const max = Math.max(...data);

    const range = max - min || 1;

    const width = 120;
    const height = 40;

    const points =
        data.map((val, i) => {

            const x =
                (i / (data.length - 1)) * width;

            const y =
                height -
                ((val - min) / range) * height;

            return `${x},${y}`;

        }).join(" ");

    return (

        <div className={style.graphContainer}>

            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
            >

                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                />

            </svg>

        </div>
    );
};

function StockCategory() {

    const location = useLocation();

    const {
        selectedCategory,
        selectedStocksData
    } = location.state || {};

    const [stocksWithGraph, setStocksWithGraph] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function fetchGraphData() {

            try {

                const updatedStocks =
                    await Promise.all(

                        selectedStocksData.map(async (stock) => {

                            try {

                                const response =
                                    await fetch(
                                        `${BACKEND_SERVER_URL}user/getHistoricData/${stock.stock_name}?range=1D`
                                    );

                                const data =
                                    await response.json();

                                const graphData =
                                    data.historicData?.map(
                                        item => item.high
                                    ) || [];

                                return {
                                    ...stock,
                                    graphData
                                };

                            }
                            catch (err) {

                                console.log(err);

                                return {
                                    ...stock,
                                    graphData: []
                                };
                            }

                        })
                    );

                setStocksWithGraph(updatedStocks);

                setLoading(false);

            }
            catch (err) {

                console.log(err);

                setLoading(false);
            }
        }

        fetchGraphData();

    }, [selectedStocksData]);

    function getPriceColor(value) {

        if (value > 0) return "#00b386";

        if (value < 0) return "#eb5b3c";

        return "#666";
    }

    return (

        <div className={style.pageContainer}>

            <NavBar />

            <div className={style.mainLayout}>

                <div className={style.leftPanel}>

                    {/* HEADING */}

                    <div className={style.headingContainer}>

                        <h1 className={style.heading}>
                            {selectedCategory}
                        </h1>

                        <p className={style.subHeading}>
                            {selectedStocksData?.length} Stocks
                        </p>

                    </div>

                    {/* SEARCH */}

                    <div className={style.searchBox}>

                        <input
                            type="text"
                            placeholder="Search & add"
                            className={style.searchInput}
                        />

                    </div>

                    {/* TABLE HEADER */}

                    <div className={style.tableHeader}>

                        <span>Company</span>

                        <span>Graph</span>

                        <span>Market Price</span>

                    </div>

                    {/* STOCK LIST */}

                    <div className={style.stockList}>

                        {
                            loading
                                ?

                                <div className={style.loading}>
                                    Loading...
                                </div>

                                :

                                stocksWithGraph
    .slice(1)
    .map((stock) => {

                                    const priceChange =
                                        stock.price.todayPrOrLoss?.pricePrOrLoss || 0;

                                    const percentChange =
                                        stock.price.todayPrOrLoss?.percentagePrOrLoss || 0;

                                    const trendColor =
                                        getPriceColor(priceChange);

                                    return (

                                        <Link
                                            key={stock._id}
                                            to={`/stock/${stock._id}`}
                                            state={{
                                                stockName: stock.stock_name,
                                                stockData: [stock]
                                            }}
                                            className={style.stockRow}
                                        >

                                            {/* COMPANY */}

                                            <div className={style.companyInfo}>

                                                <span className={style.stockName}>
                                                    {stock.stock_name}
                                                </span>

                                            </div>

                                            {/* GRAPH */}

                                            <div className={style.graphBox}>

                                                <MiniGraph
                                                    data={stock.graphData}
                                                    color={trendColor}
                                                />

                                            </div>

                                            {/* PRICE */}

                                            <div className={style.priceInfo}>

                                                <div className={style.marketPrice}>
                                                    ₹{
                                                        stock.price.currPrice
                                                    }
                                                </div>

                                                <div
                                                    className={style.change}
                                                    style={{
                                                        color: trendColor
                                                    }}
                                                >

                                                    <TrendIcon
                                                        isPositive={
                                                            priceChange >= 0
                                                        }
                                                    />

                                                    <span>
                                                        {
                                                            Math.abs(percentChange)
                                                                .toFixed(2)
                                                        }%
                                                    </span>

                                                </div>

                                            </div>

                                        </Link>
                                    );
                                })
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default StockCategory;