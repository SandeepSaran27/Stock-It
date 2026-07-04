/* ParticularStock.jsx */

import { useLocation } from "react-router-dom";
import NavBar from '../../extraComponents/NavBarFolder/NavBar';
import StockItFooter from '../../extraComponents/FooterFolder/Footer';
import {
    useEffect,
    useState
} from "react";

import {

    LineChart,
    Line,
    ResponsiveContainer,
    XAxis,
    Tooltip

} from "recharts";

const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

function ParticularStock() {

    const location = useLocation();

    const { stockData } =
        location.state || {};

    const STOCKNAME =
        stockData?.[0]?.stock_name || "ITC";

    const [USERNAME, setUSERNAME] = useState("");

    useEffect(() => {

    async function fetchUser() {

        try {

            const response = await fetch(
                `${BACKEND_SERVER_URL}user/getuserdata`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                return;
            }

            const DATA = await response.json();

            setUSERNAME(DATA.userData.name);

        } catch (err) {

            console.log(err);
        }
    }

    fetchUser();

}, []);

    // =========================
    // STATES
    // =========================

    const [historicData, setHistoricData] =
        useState([]);

    const [equityDetails, setEquityDetails] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [activeRange, setActiveRange] =
        useState("1D");

    // =========================
    // RANGE BUTTONS
    // =========================

    const RANGE_BUTTONS = [
        "1D",
        "1W",
        "1M",
        "3M",
        "6M",
        "1Y",
        "3Y",
        "5Y",
        "ALL"
    ];    

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;

        const body = {
            qty: form.qty.value,
            stock_name: form.stock_name.value,
            user_name: form.user_name.value,
        };

        const res = await fetch(`${BACKEND_SERVER_URL}user/buystock`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        console.log(data);
    }

    // =========================
    // FETCH DATA
    // =========================

    async function fetchHistoricData(range) {

        try {

            setLoading(true);

            const response =
                await fetch(
                    `${BACKEND_SERVER_URL}user/getHistoricData/${STOCKNAME}?range=${range}`
                );

            const data =
                await response.json();

            console.log(data);


            const graphData =
                data.historicData.map((item) => ({

                    date:
                        new Date(item.date)
                            .toLocaleDateString(),

                    price:
                        item.high
                }));

            setHistoricData(graphData);

            setEquityDetails(
                data.equityDetails
            );

            setLoading(false);

        }
        catch (err) {

            console.log(err);

            setLoading(false);
        }
    }

    useEffect(() => {

        fetchHistoricData("1D");

    }, []);

    // =========================
    // GET VALUE
    // =========================

    function getValue(type) {

        const found =
            equityDetails.find(
                item =>
                    item.type === type
            );

        return found?.value || "-";
    }

    // =========================
    // UI
    // =========================

    return (
        <>
            <NavBar />

            <div
                style={{
                    backgroundColor: "#f5f5f5",
                    minHeight: "100vh",
                    padding: "25px",
                    fontFamily: "Arial"
                }}
            >

                {/* TOP SECTION */}

                <div
                    style={{
                        display: "flex",
                        gap: "25px",
                        alignItems: "stretch",
                        flexWrap: "wrap"
                    }}
                >

                    {/* LEFT GRAPH SECTION */}

                    <div
                        style={{
                            flex: "7",
                            minWidth: "700px",

                            backgroundColor: "white",

                            borderRadius: "25px",

                            padding: "25px",

                            boxShadow:
                                "0px 2px 12px rgba(0,0,0,0.08)"
                        }}
                    >

                        {/* COMPANY */}

                        <div
                            style={{
                                marginBottom: "20px"
                            }}
                        >

                            <h1
                                style={{
                                    fontSize: "42px",
                                    marginBottom: "10px",
                                    color: "#222"
                                }}
                            >
                                {STOCKNAME}
                            </h1>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px"
                                }}
                            >

                                <h2
                                    style={{
                                        fontSize: "48px",
                                        color: "#ff5722",
                                        margin: 0
                                    }}
                                >
                                    ₹{
                                        getValue(
                                            "currentPrice"
                                        )
                                    }
                                </h2>

                                <span
                                    style={{
                                        color: "#555",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {
                                        activeRange
                                    }
                                </span>

                            </div>

                        </div>

                        {/* GRAPH */}

                        <div
                            style={{
                                width: "100%",
                                height: "420px"
                            }}
                        >

                            {
                                loading
                                    ?

                                    <h2>
                                        Loading...
                                    </h2>

                                    :

                                    <ResponsiveContainer>

                                        <LineChart
                                            data={
                                                historicData
                                            }
                                        >

                                            <XAxis
                                                dataKey="date"
                                                hide={true}
                                            />

                                            <Tooltip />

                                            <Line
                                                type="monotone"
                                                dataKey="price"
                                                stroke="#ff5722"
                                                strokeWidth={3}
                                                dot={false}
                                            />

                                        </LineChart>

                                    </ResponsiveContainer>
                            }

                        </div>

                        {/* RANGE BUTTONS */}

                        <div
                            style={{

                                marginTop: "20px",

                                display: "flex",

                                gap: "15px",

                                flexWrap: "wrap",

                                alignItems: "center"
                            }}
                        >

                            {
                                RANGE_BUTTONS.map(
                                    (btn) => (

                                        <button

                                            key={btn}

                                            onClick={() => {

                                                setActiveRange(btn);

                                                fetchHistoricData(btn);
                                            }}

                                            style={{

                                                padding:
                                                    "12px 22px",

                                                borderRadius:
                                                    "50px",

                                                border:
                                                    activeRange === btn
                                                        ?

                                                        "2px solid #444"

                                                        :

                                                        "1px solid #ddd",

                                                backgroundColor:
                                                    activeRange === btn
                                                        ?

                                                        "#efefef"

                                                        :

                                                        "white",

                                                cursor: "pointer",

                                                fontWeight: "bold",

                                                fontSize: "15px"
                                            }}
                                        >
                                            {btn}
                                        </button>
                                    )
                                )
                            }

                        </div>

                    </div>

                    {/* RIGHT BUY PANEL */}

                    <div
                        style={{
                            flex: "3",

                            minWidth: "320px",

                            backgroundColor: "white",

                            borderRadius: "25px",

                            padding: "25px",

                            boxShadow:
                                "0px 2px 12px rgba(0,0,0,0.08)"
                        }}
                    >

                        <h2
                            style={{
                                marginBottom: "25px",
                                color: "#222"
                            }}
                        >
                            Buy Stock
                        </h2>

                        <div
                            style={{
                                marginBottom: "25px"
                            }}
                        >

                            <h3>
                                Current Price
                            </h3>

                            <p
                                style={{
                                    fontSize: "28px",
                                    color: "#ff5722",
                                    fontWeight: "bold"
                                }}
                            >
                                ₹{
                                    getValue(
                                        "currentPrice"
                                    )
                                }
                            </p>

                        </div>

                        <div
                            style={{
                                marginBottom: "25px"
                            }}
                        >

                            <h3>
                                Available Balance
                            </h3>

                            <p>
                                ₹50,000
                            </p>

                        </div>

                        {/* <form
                            method="POST"
                            action="http://localhost:8000/user/buystock"
                        >

                            <div
                                style={{
                                    marginBottom: "20px"
                                }}
                            >

                                <label>
                                    Quantity
                                </label>

                                <input

                                    type="number"

                                    placeholder="Enter quantity"

                                    name="qty"

                                    style={{

                                        width: "100%",

                                        marginTop: "10px",

                                        padding: "14px",

                                        borderRadius: "12px",

                                        border:
                                            "1px solid #ccc",

                                        fontSize: "16px"
                                    }}
                                />

                            </div>

                            <input
                                type="hidden"
                                name="stock_name"
                                value={STOCKNAME}
                            />

                            <input
                                type="hidden"
                                name="user_name"
                                value={USERNAME}
                            />

                            <button

                                type="submit"

                                style={{

                                    width: "100%",

                                    padding: "15px",

                                    border: "none",

                                    borderRadius: "12px",

                                    backgroundColor:
                                        "#ff5722",

                                    color: "white",

                                    fontSize: "18px",

                                    fontWeight: "bold",

                                    cursor: "pointer"
                                }}
                            >
                                Buy Now
                            </button>

                        </form> */}

                        <form onSubmit={handleSubmit}>
                            <div
                                style={{
                                    marginBottom: "20px"
                                }}
                            >
                                <label>
                                    Quantity
                                </label>

                                <input
                                    type="number"
                                    placeholder="Enter quantity"
                                    name="qty"
                                    style={{
                                        width: "100%",
                                        marginTop: "10px",
                                        padding: "14px",
                                        borderRadius: "12px",
                                        border: "1px solid #ccc",
                                        fontSize: "16px"
                                    }}
                                />
                            </div>

                            <input
                                type="hidden"
                                name="stock_name"
                                value={STOCKNAME}
                            />

                            <input
                                type="hidden"
                                name="user_name"
                                value={USERNAME}
                            />

                            <button
                                type="submit"
                                style={{
                                    width: "100%",
                                    padding: "15px",
                                    border: "none",
                                    borderRadius: "12px",
                                    backgroundColor: "#ff5722",
                                    color: "white",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    cursor: "pointer"
                                }}
                            >
                                Buy Now
                            </button>
                        </form>

                        {/* EXTRA INFO */}

                        <div
                            style={{
                                marginTop: "35px"
                            }}
                        >

                            <div
                                style={{
                                    marginBottom: "18px"
                                }}
                            >
                                <strong>
                                    Day High:
                                </strong>

                                {" "}
                                ₹{
                                    getValue(
                                        "dayHigh"
                                    )
                                }
                            </div>

                            <div
                                style={{
                                    marginBottom: "18px"
                                }}
                            >
                                <strong>
                                    Day Low:
                                </strong>

                                {" "}
                                ₹{
                                    getValue(
                                        "dayLow"
                                    )
                                }
                            </div>

                            <div
                                style={{
                                    marginBottom: "18px"
                                }}
                            >
                                <strong>
                                    52W High:
                                </strong>

                                {" "}
                                ₹{
                                    getValue(
                                        "52WeekHigh"
                                    )
                                }
                            </div>

                            <div>
                                <strong>
                                    52W Low:
                                </strong>

                                {" "}
                                ₹{
                                    getValue(
                                        "52WeekLow"
                                    )
                                }
                            </div>

                        </div>

                    </div>

                </div>

                {/* DETAILS SECTION */}

                <div
                    style={{

                        marginTop: "30px",

                        backgroundColor: "white",

                        borderRadius: "25px",

                        padding: "35px",

                        display: "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(240px,1fr))",

                        gap: "25px",

                        boxShadow:
                            "0px 2px 12px rgba(0,0,0,0.08)"
                    }}
                >

                    {/* CARD */}

                    {
                        [

                            {
                                title: "Open",
                                value:
                                    `₹${getValue("todayOpen")}`
                            },

                            {
                                title: "Previous Close",
                                value:
                                    `₹${getValue("previousClose")}`
                            },

                            {
                                title: "Volume",
                                value:
                                    Number(
                                        getValue("volume")
                                    ).toLocaleString("en-IN")
                            },

                            {
                                title: "Upper Circuit",
                                value:
                                    `₹${getValue("upperCircuit")}`
                            },

                            {
                                title: "Lower Circuit",
                                value:
                                    `₹${getValue("lowerCircuit")}`
                            },

                            {
                                title: "Month High",
                                value:
                                    `₹${getValue("monthHigh")}`
                            },

                            {
                                title: "Month Low",
                                value:
                                    `₹${getValue("monthLow")}`
                            },

                            {
                                title: "Year High",
                                value:
                                    `₹${getValue("yearHigh")}`
                            },

                            {
                                title: "Year Low",
                                value:
                                    `₹${getValue("yearLow")}`
                            }

                        ].map((item, index) => (

                            <div

                                key={index}

                                style={{

                                    backgroundColor: "#fafafa",

                                    border:
                                        "1px solid #ececec",

                                    borderRadius: "18px",

                                    padding: "22px",

                                    transition: "0.2s",

                                    cursor: "pointer"
                                }}

                                onMouseEnter={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(-4px)";

                                    e.currentTarget.style.boxShadow =
                                        "0px 6px 18px rgba(0,0,0,0.08)";
                                }}

                                onMouseLeave={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(0px)";

                                    e.currentTarget.style.boxShadow =
                                        "none";
                                }}
                            >

                                <h3
                                    style={{

                                        color: "#666",

                                        fontSize: "17px",

                                        fontWeight: "600",

                                        marginBottom: "14px"
                                    }}
                                >
                                    {item.title}
                                </h3>

                                <p
                                    style={{

                                        fontSize: "30px",

                                        fontWeight: "bold",

                                        color: "#222",

                                        margin: 0,

                                        wordBreak: "break-word"
                                    }}
                                >
                                    {item.value}
                                </p>

                            </div>
                        ))
                    }

                </div>

            </div>
            <StockItFooter />
        </>
    );
}

export default ParticularStock;
