import NavBar from '../extraComponents/NavBarFolder/NavBar';
import StockItFooter from '../extraComponents/FooterFolder/Footer';

import { useEffect, useState } from "react";

const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

function AllOrders() {

    const [buyOrders, setBuyOrders] =
        useState([]);

    const [soldOrders, setSoldOrders] =
        useState([]);


    // =========================
    // FETCH DATA
    // =========================

    useEffect(() => {

        async function fetchData() {

            try {

                const cookies =
                    document.cookie;

                const UID = cookies

                    .split('; ')

                    .find(cookie =>
                        cookie.startsWith(
                            'uid='
                        )
                    );

                if (UID) {

                    const response = await fetch(
                        `${BACKEND_SERVER_URL}user/getallorders`,
                        {
                            method: "GET",
                            credentials: "include",
                        }
                    );

                    const DATA =
                        await response.json();

                    const allOrders =
                        DATA.ALL_ORDERS || [];

                    const boughtStocks =

                        allOrders.filter(
                            (ele) => {

                                return (
                                    ele.sold_price === -1
                                );
                            }
                        );

                    const soldStocks =

                        allOrders.filter(
                            (ele) => {

                                return (
                                    ele.sold_price !== -1
                                );
                            }
                        );

                    setBuyOrders(
                        boughtStocks
                    );

                    setSoldOrders(
                        soldStocks
                    );

                } else {

                    console.log(
                        "UID not found"
                    );
                }

            }
            catch (error) {

                console.log(
                    "Frontend error:",
                    error
                );
            }
        }

        fetchData();

    }, []);



    // =========================
    // ORDER CARD
    // =========================

    function orderCard(
        ele,
        i,
        isSold
    ) {

        return (

            <div

                key={i}

                style={{

                    backgroundColor:
                        "#ffffff",

                    borderRadius: "18px",

                    padding: "22px",

                    marginBottom: "22px",

                    boxShadow:
                        "0 4px 18px rgba(0,0,0,0.08)",

                    border:
                        "1px solid #e5e7eb",

                    transition: "0.3s"
                }}
            >

                {/* HEADER */}

                <div
                    style={{

                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems:
                            "center",

                        marginBottom:
                            "18px"
                    }}
                >

                    <div>

                        <h2
                            style={{

                                margin: 0,

                                color:
                                    "#111827",

                                fontSize:
                                    "26px"
                            }}
                        >

                            {ele.stock_name}

                        </h2>

                        <p
                            style={{

                                margin:
                                    "6px 0 0 0",

                                color:
                                    "#6b7280"
                            }}
                        >

                            Quantity:
                            {" "}
                            {ele.qty}

                        </p>

                    </div>

                    <div
                        style={{

                            backgroundColor:

                                isSold
                                    ? "#fee2e2"
                                    : "#dcfce7",

                            color:

                                isSold
                                    ? "#dc2626"
                                    : "#16a34a",

                            padding:
                                "8px 16px",

                            borderRadius:
                                "30px",

                            fontWeight:
                                "600",

                            fontSize:
                                "14px"
                        }}
                    >

                        {

                            isSold
                                ? "Sold"
                                : "Holding"
                        }

                    </div>

                </div>


                {/* BODY */}

                <div
                    style={{

                        display: "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",

                        gap: "16px"
                    }}
                >

                    <div
                        style={{

                            backgroundColor:
                                "#f9fafb",

                            padding: "15px",

                            borderRadius:
                                "12px"
                        }}
                    >

                        <p>
                            <b>
                                Bought Price
                            </b>
                        </p>

                        <h3
                            style={{
                                color:
                                    "#2563eb"
                            }}
                        >

                            ₹
                            {ele.bought_price}

                        </h3>

                    </div>


                    <div
                        style={{

                            backgroundColor:
                                "#f9fafb",

                            padding: "15px",

                            borderRadius:
                                "12px"
                        }}
                    >

                        <p>
                            <b>
                                Bought Date
                            </b>
                        </p>

                        <h4>

                            {

                                new Date(
                                    ele.bought_date
                                ).toLocaleString()
                            }

                        </h4>

                    </div>


                    {

                        isSold &&

                        <>

                            <div
                                style={{

                                    backgroundColor:
                                        "#f9fafb",

                                    padding:
                                        "15px",

                                    borderRadius:
                                        "12px"
                                }}
                            >

                                <p>
                                    <b>
                                        Sold Price
                                    </b>
                                </p>

                                <h3
                                    style={{
                                        color:
                                            "#ea580c"
                                    }}
                                >

                                    ₹
                                    {ele.sold_price}

                                </h3>

                            </div>


                            <div
                                style={{

                                    backgroundColor:
                                        "#f9fafb",

                                    padding:
                                        "15px",

                                    borderRadius:
                                        "12px"
                                }}
                            >

                                <p>
                                    <b>
                                        Profit / Loss
                                    </b>
                                </p>

                                <h3
                                    style={{

                                        color:

                                            ele.pr_or_loss >= 0
                                                ? "#16a34a"
                                                : "#dc2626"
                                    }}
                                >

                                    ₹
                                    {ele.pr_or_loss}

                                </h3>

                            </div>

                        </>
                    }

                </div>

            </div>
        );
    }



    // =========================
    // MAIN UI
    // =========================

    return (

        <>

            <NavBar />

            <div
                style={{

                    minHeight: "100vh",

                    backgroundColor:
                        "#f4f7fb",

                    padding:
                        "40px 20px"
                }}
            >

                <div
                    style={{

                        maxWidth:
                            "1200px",

                        margin:
                            "0 auto"
                    }}
                >

                    {/* PAGE HEADER */}

                    <div
                        style={{
                            marginBottom:
                                "40px"
                        }}
                    >

                        <h1
                            style={{

                                fontSize:
                                    "48px",

                                marginBottom:
                                    "10px",

                                color:
                                    "orange",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >

                            All Orders

                        </h1>

                        <p
                            style={{

                                color:
                                    "#d3982a",

                                fontSize:
                                    "18px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >

                            Track all your
                            holding and sold
                            stock orders.

                        </p>

                    </div>



                    {/* HOLDING STOCKS */}

                    <div
                        style={{
                            marginBottom:
                                "50px"
                        }}
                    >

                        <h2
                            style={{

                                marginBottom:
                                    "25px",

                                color:
                                    "black"
                            }}
                        >

                            Holding Stocks

                        </h2>

                        {

                            buyOrders.length > 0

                                ?

                                buyOrders.map(
                                    (ele, i) => {

                                        return orderCard(
                                            ele,
                                            i,
                                            false
                                        );
                                    }
                                )

                                :

                                <div
                                    style={{

                                        backgroundColor:
                                            "#ffffff",

                                        padding:
                                            "30px",

                                        borderRadius:
                                            "16px",

                                        textAlign:
                                            "center",

                                        color:
                                            "#6b7280"
                                    }}
                                >

                                    No Holding Stocks

                                </div>
                        }

                    </div>



                    {/* SOLD STOCKS */}

                    <div>

                        <h2
                            style={{

                                marginBottom:
                                    "25px",

                                color:
                                    "#ea580c"
                            }}
                        >

                            Sold Stocks

                        </h2>

                        {

                            soldOrders.length > 0

                                ?

                                soldOrders.map(
                                    (ele, i) => {

                                        return orderCard(
                                            ele,
                                            i,
                                            true
                                        );
                                    }
                                )

                                :

                                <div
                                    style={{

                                        backgroundColor:
                                            "#ffffff",

                                        padding:
                                            "30px",

                                        borderRadius:
                                            "16px",

                                        textAlign:
                                            "center",

                                        color:
                                            "#6b7280"
                                    }}
                                >

                                    No Sold Stocks

                                </div>
                        }

                    </div>

                </div>

            </div>

            <StockItFooter />

        </>
    );
}

export default AllOrders;