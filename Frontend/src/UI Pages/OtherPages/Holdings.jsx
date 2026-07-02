import NavBar from '../extraComponents/NavBarFolder/NavBar';
import StockItFooter from '../extraComponents/FooterFolder/Footer';
import { useEffect, useState } from "react";

const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

function Holdings() {

    const [userHoldings, setUserHoldings] =
        useState([]);

    const [sellQty, setSellQty] =
        useState({});

    // =========================
    // GET TOKEN
    // =========================

    function getUID() {

        return document.cookie
            .split("; ")
            .find(cookie =>
                cookie.startsWith("uid=")
            );
    }

    // =========================
    // FETCH HOLDINGS
    // =========================

    useEffect(() => {

        async function fetchData() {

            const UID = getUID();

            if (!UID) {

                console.log("No Token");

                return;
            }

            const response =
                await fetch(
                    `${BACKEND_SERVER_URL}user/getholdings?userIdToken=${UID}`
                );

            const DATA =
                await response.json();

            setUserHoldings(DATA.HOLDINGS);
        }

        fetchData();

    }, []);

    // =========================
    // SELL STOCK
    // =========================

    async function SoldStock(stock) {

        const qtyToSell =
            Number(
                sellQty[stock.stock_name]
            );

        if (
            !qtyToSell ||
            qtyToSell <= 0
        ) {

            alert("Enter valid qty");

            return;
        }

        if (qtyToSell > stock.qty) {

            alert("Qty exceeds holdings");

            return;
        }

        // =========================
        // FRONTEND UPDATE
        // =========================

        const updated =
            userHoldings
                .map(item => {

                    if (
                        item.stock_name ===
                        stock.stock_name
                    ) {

                        return {

                            ...item,

                            qty:
                                item.qty - qtyToSell
                        };
                    }

                    return item;
                })
                .filter(item => item.qty > 0);

        setUserHoldings(updated);

        // =========================
        // BACKEND
        // =========================

        const UID = getUID();

        const response =
            await fetch(
                `${BACKEND_SERVER_URL}user/soldstock`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        userIdToken: UID,

                        stock_name:
                            stock.stock_name,

                        sellQty:
                            qtyToSell
                    })
                }
            );

        const data =
            await response.json();

        console.log(data);
    }

    return (
        <>

            <NavBar />

            <div
                style={{
                    minHeight: "100vh",
                    background: "#f4f7fb",
                    padding: "40px 20px"
                }}
            >

                {/* =========================
                    TITLE
                ========================= */}

                <h1
                    style={{
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "700",
                        color: "#0b1c39",
                        marginBottom: "40px"
                    }}
                >
                    Your Holdings
                </h1>

                {/* =========================
                    EMPTY HOLDINGS
                ========================= */}

                {
                    userHoldings.length === 0 ? (

                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "24px",
                                color: "#6b7280",
                                marginTop: "100px"
                            }}
                        >
                            No Holdings Available
                        </div>

                    ) : (

                        <div
                            style={{
                                display: "grid",

                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(320px, 1fr))",

                                gap: "25px",

                                maxWidth: "1400px",

                                margin: "auto"
                            }}
                        >

                            {
                                userHoldings.map(
                                    (stock, i) => (

                                        <div
                                            key={i}

                                            style={{
                                                background: "#ffffff",

                                                borderRadius: "20px",

                                                padding: "25px",

                                                boxShadow:
                                                    "0 8px 25px rgba(0,0,0,0.08)",

                                                border:
                                                    "1px solid #e5e7eb",

                                                transition: "0.3s"
                                            }}
                                        >

                                            {/* =========================
                                                STOCK NAME
                                            ========================= */}

                                            <div
                                                style={{
                                                    fontSize: "30px",

                                                    fontWeight: "700",

                                                    color: "#111827",

                                                    marginBottom: "25px"
                                                }}
                                            >
                                                {stock.stock_name}
                                            </div>

                                            {/* =========================
                                                QUANTITY
                                            ========================= */}

                                            <div
                                                style={{
                                                    display: "flex",

                                                    justifyContent:
                                                        "space-between",

                                                    marginBottom: "18px",

                                                    fontSize: "18px"
                                                }}
                                            >

                                                <span
                                                    style={{
                                                        color: "#6b7280",

                                                        fontWeight: "600"
                                                    }}
                                                >
                                                    Quantity
                                                </span>

                                                <span
                                                    style={{
                                                        color: "#111827",

                                                        fontWeight: "700"
                                                    }}
                                                >
                                                    {stock.qty}
                                                </span>

                                            </div>

                                            {/* =========================
                                                AVG PRICE
                                            ========================= */}

                                            <div
                                                style={{
                                                    display: "flex",

                                                    justifyContent:
                                                        "space-between",

                                                    marginBottom: "25px",

                                                    fontSize: "18px"
                                                }}
                                            >

                                                <span
                                                    style={{
                                                        color: "#6b7280",

                                                        fontWeight: "600"
                                                    }}
                                                >
                                                    Avg Price
                                                </span>

                                                <span
                                                    style={{
                                                        color: "#16a34a",

                                                        fontWeight: "700"
                                                    }}
                                                >
                                                    ₹{stock.bought_price}
                                                </span>

                                            </div>

                                            {/* =========================
                                                INPUT + BUTTON
                                            ========================= */}

                                            <div
                                                style={{
                                                    display: "flex",

                                                    gap: "12px",

                                                    alignItems: "center"
                                                }}
                                            >

                                                <input

                                                    type="number"

                                                    placeholder="Sell Qty"

                                                    value={
                                                        sellQty[
                                                            stock.stock_name
                                                        ] || ""
                                                    }

                                                    onChange={(e) => {

                                                        setSellQty({

                                                            ...sellQty,

                                                            [stock.stock_name]:
                                                                e.target.value
                                                        });
                                                    }}

                                                    style={{
                                                        flex: 1,

                                                        padding: "14px",

                                                        borderRadius: "10px",

                                                        border:
                                                            "1px solid #cbd5e1",

                                                        outline: "none",

                                                        fontSize: "16px"
                                                    }}
                                                />

                                                <button

                                                    onClick={() =>
                                                        SoldStock(stock)
                                                    }

                                                    style={{
                                                        background: "orange",

                                                        color: "white",

                                                        border: "none",

                                                        padding:
                                                            "14px 24px",

                                                        borderRadius: "10px",

                                                        fontSize: "16px",

                                                        fontWeight: "600",

                                                        cursor: "pointer",

                                                        transition: "0.3s"
                                                    }}
                                                >
                                                    Sell
                                                </button>

                                            </div>

                                        </div>
                                    )
                                )
                            }

                        </div>
                    )
                }

            </div>

            <StockItFooter />

        </>
    );
}

export default Holdings;