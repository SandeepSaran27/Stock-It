import NavBar from "../extraComponents/NavBarFolder/NavBar";
import StockItFooter from "../extraComponents/FooterFolder/Footer";
import { Link } from 'react-router-dom'; 
function Learn() {
    const lessons = [
        "Stock Market Basics",
        "Candlestick Patterns",
        "Support & Resistance",
        "Technical Indicators",
        "Risk Management",
        "Trading Psychology"
    ];

    return (
        <>
            <NavBar />

            <div
                style={{
                    backgroundColor: "#f7faff",
                    minHeight: "100vh",
                    padding: "40px 8%"
                }}
            >
                {/* Hero */}
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "20px",
                        padding: "50px",
                        textAlign: "center",
                        marginBottom: "40px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
                    }}
                >
                    <h1
                        style={{
                            color: "#0A2E73",
                            fontSize: "3rem",
                            marginBottom: "15px"
                        }}
                    >
                        Learn Stock Trading
                    </h1>

                    <p
                        style={{
                            color: "#555",
                            fontSize: "1.1rem"
                        }}
                    >
                        Master trading concepts and practice with virtual money.
                    </p>
                </div>

                {/* Learning Levels */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        marginBottom: "50px"
                    }}
                >
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                        <button
                            key={level}
                            style={{
                                backgroundColor: "#0A2E73",
                                color: "white",
                                border: "none",
                                padding: "14px 28px",
                                borderRadius: "30px",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                {/* Lessons Grid */}
                <h2
                    style={{
                        color: "#0A2E73",
                        marginBottom: "25px"
                    }}
                >
                    Popular Lessons
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(280px,1fr))",
                        gap: "25px",
                        marginBottom: "50px"
                    }}
                >
                    {lessons.map((lesson, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: "white",
                                padding: "25px",
                                borderRadius: "18px",
                                borderLeft: "6px solid #0A2E73",
                                boxShadow:
                                    "0 4px 12px rgba(0,0,0,0.06)"
                            }}
                        >
                            <h3
                                style={{
                                    color: "#0A2E73"
                                }}
                            >
                                📘 {lesson}
                            </h3>

                            <p
                                style={{
                                    color: "#666",
                                    marginTop: "10px"
                                }}
                            >
                                Learn the fundamentals and practical usage.
                            </p>
                        </div>
                    ))}
                </div>

                {/* Trading Roadmap */}
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "20px",
                        padding: "40px",
                        marginBottom: "40px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
                    }}
                >
                    <h2
                        style={{
                            color: "#0A2E73",
                            marginBottom: "30px"
                        }}
                    >
                        Trading Roadmap
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "15px"
                        }}
                    >
                        {[
                            "Basics",
                            "Charts",
                            "Indicators",
                            "Strategies",
                            "Risk",
                            "Paper Trading"
                        ].map((step, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: "#eef4ff",
                                    color: "#0A2E73",
                                    padding: "15px 25px",
                                    borderRadius: "12px",
                                    fontWeight: "600"
                                }}
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tips */}
                <div
                    style={{
                        backgroundColor: "#0A2E73",
                        color: "white",
                        borderRadius: "20px",
                        padding: "40px",
                        marginBottom: "40px"
                    }}
                >
                    <h2>Quick Trading Tips</h2>

                    <ul
                        style={{
                            lineHeight: "2",
                            marginTop: "15px"
                        }}
                    >
                        <li>Always use Stop Loss.</li>
                        <li>Never risk more than 2% per trade.</li>
                        <li>Follow your strategy consistently.</li>
                        <li>Avoid emotional decisions.</li>
                    </ul>
                </div>

                {/* CTA */}
                <div
                    style={{
                        textAlign: "center"
                    }}
                >
                    <Link to="/stocks"><button
                        style={{
                            backgroundColor: "#0A2E73",
                            color: "white",
                            border: "none",
                            padding: "18px 40px",
                            borderRadius: "12px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        Start Trading →
                    </button></Link>
                </div>
            </div>

            <StockItFooter />
        </>
    );
}

export default Learn;