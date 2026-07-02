import { useEffect, useState } from "react"; import { Link } from 'react-router-dom'; 
import NavBar from '../extraComponents/NavBarFolder/NavBar'; 
import StockItFooter from '../extraComponents/FooterFolder/Footer'; 

function HomePage() {
    return (
        <>
            <header>
                <NavBar />
            </header>

            <main
                style={{
                    backgroundColor: "#fff",
                    fontFamily: "Arial, sans-serif",
                    color: "#1e293b",
                }}
            >
                {/* Hero Section */}
                <section
                    style={{
                        background: "linear-gradient(to right, #ffffff, #eef5ff)",
                        padding: "80px 8%",
                    }}
                >
                    <div
                        style={{
                            maxWidth: "1300px",
                            margin: "0 auto",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "50px",
                            flexWrap: "wrap",
                        }}
                    >
                        <div style={{ flex: 1, minWidth: "300px" }}>
                            <h1
                                style={{
                                    fontSize: "3.5rem",
                                    lineHeight: "1.2",
                                    color: "#0f172a",
                                }}
                            >
                                Invest Smarter with{" "}
                                <span style={{ color: "#0b3d91" }}>
                                    Real-Time Market Insights
                                </span>
                            </h1>

                            <p
                                style={{
                                    marginTop: "20px",
                                    fontSize: "1.1rem",
                                    color: "#64748b",
                                    lineHeight: "1.7",
                                }}
                            >
                                Track stocks, analyze trends, and make informed
                                investment decisions with powerful tools and
                                live market data.
                            </p>

                            <div
                                style={{
                                    marginTop: "30px",
                                    display: "flex",
                                    gap: "15px",
                                }}
                            >
                                <Link to="/signup"><button
                                    style={{
                                        backgroundColor: "#0b3d91",
                                        color: "#fff",
                                        border: "none",
                                        padding: "14px 28px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Get Started
                                </button></Link>

                                <Link to="stocks"><button
                                    style={{
                                        background: "transparent",
                                        color: "#0b3d91",
                                        border: "2px solid #0b3d91",
                                        padding: "14px 28px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Explore Markets
                                </button></Link>
                            </div>
                        </div>

                        {/* Market Card */}
                        <div
                            style={{
                                width: "350px",
                                backgroundColor: "#fff",
                                padding: "30px",
                                borderRadius: "15px",
                                boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                            }}
                        >
                            <h3 style={{ marginBottom: "20px" }}>
                                Market Overview
                            </h3>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "12px 0",
                                }}
                            >
                                <span>NIFTY 50</span>
                                <span
                                    style={{
                                        color: "#16a34a",
                                        fontWeight: "bold",
                                    }}
                                >
                                    +1.28%
                                </span>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "12px 0",
                                }}
                            >
                                <span>SENSEX</span>
                                <span
                                    style={{
                                        color: "#16a34a",
                                        fontWeight: "bold",
                                    }}
                                >
                                    +0.94%
                                </span>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "12px 0",
                                }}
                            >
                                <span>BANK NIFTY</span>
                                <span
                                    style={{
                                        color: "#dc2626",
                                        fontWeight: "bold",
                                    }}
                                >
                                    -0.22%
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section
                    style={{
                        padding: "80px 8%",
                        textAlign: "center",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "2.5rem",
                            marginBottom: "50px",
                            color: "#0f172a",
                        }}
                    >
                        Everything You Need to Invest
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "30px",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        {[
                            {
                                icon: "📈",
                                title: "Live Market Data",
                                text: "Track stock prices and market movements in real time.",
                            },
                            {
                                icon: "📊",
                                title: "Advanced Analytics",
                                text: "Powerful charts and indicators for better investment decisions.",
                            },
                            {
                                icon: "💼",
                                title: "Portfolio Tracking",
                                text: "Monitor performance and manage investments efficiently.",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    width: "320px",
                                    backgroundColor: "#fff",
                                    padding: "30px",
                                    borderRadius: "15px",
                                    boxShadow:
                                        "0 8px 20px rgba(0,0,0,0.06)",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "2.5rem",
                                        marginBottom: "15px",
                                    }}
                                >
                                    {item.icon}
                                </div>

                                <h3>{item.title}</h3>

                                <p
                                    style={{
                                        marginTop: "10px",
                                        color: "#64748b",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section
                    style={{
                        backgroundColor: "#0b3d91",
                        color: "#fff",
                        textAlign: "center",
                        padding: "80px 20px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "2.8rem",
                            marginBottom: "20px",
                        }}
                    >
                        Start Your Investment Journey Today
                    </h2>

                    <p
                        style={{
                            color: "#dbeafe",
                            fontSize: "1.1rem",
                        }}
                    >
                        Join thousands of investors using our platform to track
                        and grow their wealth.
                    </p>

                    <Link to="/signup"><button
                        style={{
                            marginTop: "30px",
                            backgroundColor: "#fff",
                            color: "#0b3d91",
                            border: "none",
                            padding: "15px 35px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Create Free Account
                    </button></Link>
                </section>
            </main>

            <footer>
                <StockItFooter />
            </footer>
        </>
    );
} 
export default HomePage