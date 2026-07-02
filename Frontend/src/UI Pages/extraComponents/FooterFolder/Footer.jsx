import React from "react";
import {
    ArrowUp,
    Globe,
    Share2,
    BadgeInfo,
    Bell,
} from "lucide-react";

const footerSections = [
    {
        title: "Equity",
        links: [
            { name: "Listing", url: "https://www.nseindia.com/companies-listing" },
            { name: "IPO", url: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo" },
            { name: "Pre-Open Market", url: "https://www.nseindia.com/market-data/pre-open-market-cm-and-emerge-market" },
            { name: "Top Gainers / Losers", url: "https://www.nseindia.com/market-data/top-gainers-loosers" },
            { name: "52 Week High / Low", url: "https://www.nseindia.com/market-data/52-week-high-equity-market" },
            { name: "Equity Market Watch", url: "https://www.nseindia.com/market-data/live-equity-market" },
            { name: "Indices Watch", url: "https://www.nseindia.com/market-data/live-market-indices" },
        ],
    },
    {
        title: "Derivatives",
        links: [
            { name: "Option Chain", url: "https://www.nseindia.com/option-chain" },
            { name: "Most Active Contracts", url: "https://www.nseindia.com/market-data/most-active-contracts" },
            { name: "Currency Derivatives", url: "https://www.nseindia.com/market-data/currency-derivatives" },
            { name: "Commodity Derivatives", url: "https://www.nseindia.com/products-services/commodity-derivatives" },
            { name: "Interest Rate Derivatives", url: "https://www.nseindia.com/products-services/interest-rate-derivatives" },
        ],
    },
    {
        title: "Reports",
        links: [
            { name: "Equity Bhavcopy", url: "https://www.nseindia.com/all-reports" },
            { name: "Historical Index Data", url: "https://www.nseindia.com/reports-indices-historical-index-data" },
            { name: "Security-wise Volume", url: "https://www.nseindia.com/reports-indices-historical-data" },
            { name: "Business Growth & Volume", url: "https://www.nseindia.com/reports/business-growth" },
        ],
    },
    {
        title: "Corporates",
        links: [
            { name: "Announcements", url: "https://www.nseindia.com/companies-listing/corporate-filings-announcements" },
            { name: "Corporate Actions", url: "https://www.nseindia.com/companies-listing/corporate-filings-actions" },
            { name: "Financial Results", url: "https://www.nseindia.com/companies-listing/corporate-filings-financial-results" },
            { name: "Board Meetings", url: "https://www.nseindia.com/companies-listing/corporate-filings-board-meetings" },
            { name: "Annual Reports", url: "https://www.nseindia.com/companies-listing/annual-reports" },
        ],
    },
    {
        title: "Exchange Communication",
        links: [
            { name: "Circulars", url: "https://www.nseindia.com/resources/exchange-communication-circulars" },
            { name: "Press Releases", url: "https://www.nseindia.com/resources/exchange-communication-press-releases" },
            { name: "Holidays", url: "https://www.nseindia.com/resources/exchange-communication-holidays" },
            { name: "Contact Us", url: "https://www.nseindia.com/contact-us" },
        ],
    },
];

const bottomLinks = [
    { name: "About Us", url: "https://www.nseindia.com/about-us" },
    { name: "Investor Relations", url: "https://www.nseindia.com/investor-relations" },
    { name: "Careers", url: "https://www.nseindia.com/careers" },
    { name: "Regulations", url: "https://www.nseindia.com/regulations" },
    { name: "Privacy Policy", url: "https://www.nseindia.com/privacy-policy" },
    { name: "Terms of Use", url: "https://www.nseindia.com/terms-of-use" },
    { name: "Copyright", url: "https://www.nseindia.com/copyright" },
    { name: "Feedback", url: "https://www.nseindia.com/feedback" },
];

function StockItFooter() {

    return (
        <footer
            style={{
                width: "100%",
                marginTop: "80px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* TOP FOOTER */}
            <div
                style={{
                    background: "#040426",
                    color: "white",
                }}
            >
                <div
                    style={{
                        maxWidth: "1280px",
                        margin: "auto",
                        padding: "64px 40px",
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gap: "40px",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                fontSize: "26px",
                                fontWeight: "600",
                                marginBottom: "24px",
                            }}
                        >
                            Equity
                        </h2>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                            }}
                        >
                            {[
                                "Listing",
                                "IPO",
                                "Pre-Open Market",
                                "Top Gainers / Losers",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    style={{
                                        marginBottom: "16px",
                                    }}
                                >
                                    <a
                                        href="#"
                                        style={{
                                            display: "flex",
                                            gap: "12px",
                                            textDecoration: "none",
                                            color: "#d1d5db",
                                            transition: "0.3s",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#facc15",
                                                fontSize: "18px",
                                            }}
                                        >
                                            •
                                        </span>

                                        <span
                                            style={{
                                                fontSize: "15px",
                                                lineHeight: "1.6",
                                            }}
                                        >
                                            {item}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2
                            style={{
                                fontSize: "26px",
                                fontWeight: "600",
                                marginBottom: "24px",
                            }}
                        >
                            Derivatives
                        </h2>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                            }}
                        >
                            {[
                                "Option Chain",
                                "Currency Derivatives",
                                "Commodity Derivatives",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    style={{
                                        marginBottom: "16px",
                                    }}
                                >
                                    <a
                                        href="#"
                                        style={{
                                            display: "flex",
                                            gap: "12px",
                                            textDecoration: "none",
                                            color: "#d1d5db",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#facc15",
                                                fontSize: "18px",
                                            }}
                                        >
                                            •
                                        </span>

                                        <span>{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2
                            style={{
                                fontSize: "26px",
                                fontWeight: "600",
                                marginBottom: "24px",
                            }}
                        >
                            Reports
                        </h2>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                            }}
                        >
                            {[
                                "Equity Bhavcopy",
                                "Historical Index Data",
                                "Business Growth",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    style={{
                                        marginBottom: "16px",
                                    }}
                                >
                                    <a
                                        href="#"
                                        style={{
                                            display: "flex",
                                            gap: "12px",
                                            textDecoration: "none",
                                            color: "#d1d5db",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#facc15",
                                                fontSize: "18px",
                                            }}
                                        >
                                            •
                                        </span>

                                        <span>{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2
                            style={{
                                fontSize: "26px",
                                fontWeight: "600",
                                marginBottom: "24px",
                            }}
                        >
                            Corporates
                        </h2>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                            }}
                        >
                            {[
                                "Announcements",
                                "Corporate Actions",
                                "Financial Results",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    style={{
                                        marginBottom: "16px",
                                    }}
                                >
                                    <a
                                        href="#"
                                        style={{
                                            display: "flex",
                                            gap: "12px",
                                            textDecoration: "none",
                                            color: "#d1d5db",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#facc15",
                                                fontSize: "18px",
                                            }}
                                        >
                                            •
                                        </span>

                                        <span>{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2
                            style={{
                                fontSize: "26px",
                                fontWeight: "600",
                                marginBottom: "24px",
                            }}
                        >
                            Exchange Communication
                        </h2>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                            }}
                        >
                            {["Circulars", "Press Releases", "Holidays"].map(
                                (item, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            marginBottom: "16px",
                                        }}
                                    >
                                        <a
                                            href="#"
                                            style={{
                                                display: "flex",
                                                gap: "12px",
                                                textDecoration: "none",
                                                color: "#d1d5db",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: "#facc15",
                                                    fontSize: "18px",
                                                }}
                                            >
                                                •
                                            </span>

                                            <span>{item}</span>
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* MIDDLE */}
            <div
    style={{
        background: "#ece9f7",
        borderTop: "1px solid #d1d5db",
    }}
>
    <div
        style={{
            maxWidth: "1280px",
            margin: "auto",
            padding: "18px 28px",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr",
            gap: "18px",
            alignItems: "center",
        }}
    >
        {/* APP */}
        <div>
            <h2
                style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#322784",
                    marginBottom: "6px",
                }}
            >
                StockIt App
            </h2>

            <p
                style={{
                    color: "#4b5563",
                    lineHeight: "1.4",
                    fontSize: "12px",
                    marginBottom: "10px",
                }}
            >
                Live stock tracking & market updates.
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "8px",
                }}
            >
                <button
                    style={{
                        background: "black",
                        color: "white",
                        border: "none",
                        padding: "7px 12px",
                        borderRadius: "7px",
                        cursor: "pointer",
                        fontSize: "11px",
                    }}
                >
                    App Store
                </button>

                <button
                    style={{
                        background: "black",
                        color: "white",
                        border: "none",
                        padding: "7px 12px",
                        borderRadius: "7px",
                        cursor: "pointer",
                        fontSize: "11px",
                    }}
                >
                    Google Play
                </button>
            </div>
        </div>

        {/* COMPANY */}
        <div>
            <h2
                style={{
                    fontSize: "17px",
                    fontWeight: "600",
                    color: "#322784",
                    marginBottom: "8px",
                }}
            >
                Company
            </h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    fontSize: "12px",
                    color: "#4b5563",
                }}
            >
                <span>About Us</span>
                <span>Careers</span>
                <span>Privacy</span>
            </div>
        </div>

        {/* MARKETS */}
        <div>
            <h2
                style={{
                    fontSize: "17px",
                    fontWeight: "600",
                    color: "#322784",
                    marginBottom: "8px",
                }}
            >
                Markets
            </h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    fontSize: "12px",
                    color: "#4b5563",
                }}
            >
                <span>Equity</span>
                <span>Derivatives</span>
                <span>Options</span>
            </div>
        </div>

        {/* NEWSLETTER */}
        <div>
            <h2
                style={{
                    fontSize: "17px",
                    fontWeight: "600",
                    color: "#322784",
                    marginBottom: "8px",
                }}
            >
                Updates
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "6px",
                }}
            >
                <input
                    type="email"
                    placeholder="Email"
                    style={{
                        flex: 1,
                        padding: "8px 10px",
                        border: "1px solid #d1d5db",
                        borderRadius: "7px",
                        outline: "none",
                        fontSize: "12px",
                    }}
                />

                <button
                    style={{
                        background: "#322784",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "7px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "500",
                    }}
                >
                    Join
                </button>
            </div>
        </div>
    </div>
</div>

            {/* COPYRIGHT */}
            <div
                style={{
                    background: "#322784",
                    color: "white",
                }}
            >
                <div
                    style={{
                        maxWidth: "1280px",
                        margin: "auto",
                        padding: "10px 40px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#e5e7eb",
                        }}
                    >
                        © 2026 StockIt Technologies Pvt. Ltd. All rights reserved.
                    </p>

                    <button
                        style={{
                            background: "#facc15",
                            color: "#322784",
                            border: "none",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            cursor: "pointer",
                        }}
                    >
                        ↑
                    </button>
                </div>
            </div>
        </footer>
    );

}

export default StockItFooter