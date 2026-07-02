import style from "./StockProfile.module.css";
import clsx from "clsx";

function StockImg({ stock, length }) {

    const stockName = stock?.stock_name || "-";

    const currPrice = stock?.price?.currPrice;
    const todayStart = stock?.price?.todayStart;

    const latestPrice =
        stock?.price?.pricesWithDate?.[
            stock?.price?.pricesWithDate?.length - 1
        ];

    const low = latestPrice?.low;
    const high = latestPrice?.high;

    let percentage = null;

    if (
        typeof currPrice === "number" &&
        typeof todayStart === "number" &&
        todayStart !== 0 &&
        todayStart !== -1
    ) {
        percentage =
            ((currPrice - todayStart) / todayStart) * 100;
    }

    const isLoss = percentage < 0;

    const inlineStyle = {
        height: length ? "auto" : "200px",
        width: length || "200px",
    };

    return (

        <div
            style={inlineStyle}
            className={clsx(style.mainContainer, style.dfColumn)}
        >

            <div className={clsx(style.visualWrapper, style.df)}>

                <div className={clsx(style.outerCircle, style.df)}>
                    <div className={style.innerCircle}></div>
                </div>

                <div className={style.nameContainer}>
                    <p className={style.nameText}>
                        {stockName}
                    </p>
                </div>

            </div>

            <div className={style.detailsContainer}>

                <div className={style.currPrice}>

                    {typeof currPrice === "number" &&
                    currPrice !== -1
                        ? `₹${currPrice.toLocaleString()}`
                        : "-"}

                </div>

                <div
                    className={clsx(
                        style.change,
                        percentage == null
                            ? ""
                            : isLoss
                            ? style.red
                            : style.green
                    )}
                >

                    {percentage == null
                        ? "-"
                        : `${isLoss ? "" : "+"}${percentage.toFixed(2)}%`}

                </div>

                <div className={style.highLowGrid}>

                    <div className={style.hlBox}>

                        <span>L</span>

                        <p>

                            {typeof low === "number" && low !== -1
                                ? `₹${low}`
                                : "-"}

                        </p>

                    </div>

                    <div className={style.hlBox}>

                        <span>H</span>

                        <p>

                            {typeof high === "number" && high !== -1
                                ? `₹${high}`
                                : "-"}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StockImg;

/*import style from './StockProfile.module.css';
import clsx from 'clsx';

function StockImg({ stock, length }) {
    // Destructure data from the stock object based on your DB structure
    const { stock_name, price } = stock;
    const { currPrice, low, high, todayPrOrLoss } = price;
    
    // Determine color based on profit or loss
    const isLoss = todayPrOrLoss.pricePrOrLoss < 0;

    const inLineStyle = {
        height: length ? 'auto' : '200px', // Allow height to grow for content
        width: length || '200px',
    };

    return (
        <div style={inLineStyle} className={clsx(style.mainContainer, style.dfColumn)}>
            <div className={clsx(style.visualWrapper, style.df)}>
                <div className={clsx(style.outerCircle, style.df)}>
                    <div className={style.innerCircle}></div>
                </div>
                <div className={style.nameContainer}>
                    <p className={style.nameText}>{stock_name}</p>
                </div>
            </div>

            <div className={style.detailsContainer}>
                <div className={style.currPrice}>
                    ₹{currPrice.toLocaleString()}
                </div>
                <div className={clsx(style.change, isLoss ? style.red : style.green)}>
                    {isLoss ? '' : '+'}{todayPrOrLoss.percentagePrOrLoss}%
                </div>
                
                <div className={style.highLowGrid}>
                    <div className={style.hlBox}>
                        <span>L</span>
                        <p>₹{low}</p>
                    </div>
                    <div className={style.hlBox}>
                        <span>H</span>
                        <p>₹{high}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StockImg;*/