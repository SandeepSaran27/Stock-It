import { useState } from "react";
import NavBar from '../extraComponents/NavBarFolder/NavBar';
import StockItFooter from '../extraComponents/FooterFolder/Footer';

function ReportError() {

    // =========================
    // STATES
    // =========================

    const [reportData, setReportData] = useState({

        issueType: "Bug",

        description: "",

        stepsToReproduce: ""
    });

    const [reported, setReported] =
        useState(false);


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(
            "Error Report Submitted:",
            reportData
        );

        // Show success message

        setReported(true);

        // Clear form

        setReportData({

            issueType: "Bug",

            description: "",

            stepsToReproduce: ""
        });

        // Hide message after 3 seconds

        setTimeout(() => {

            setReported(false);

        }, 3000);
    };


    return (
        <>

        <NavBar/>    
        <div
            style={{

                minHeight: "100vh",

                backgroundColor: "#f4f7fb",

                padding: "40px 20px",

                display: "flex",

                justifyContent: "center",

                alignItems: "center"
            }}
        >

            <div
                style={{

                    width: "100%",

                    maxWidth: "700px",

                    backgroundColor: "#ffffff",

                    borderRadius: "18px",

                    padding: "35px",

                    boxShadow:
                        "0 8px 25px rgba(0,0,0,0.08)",

                    border:
                        "1px solid #e5e7eb"
                }}
            >


                {/* ===================== */}
                {/* HEADER */}
                {/* ===================== */}

                <div
                    style={{
                        marginBottom: "25px",
                        textAlign: "center"
                    }}
                >

                    <h1
                        style={{

                            margin: 0,

                            color: "orange",

                            fontSize: "34px",

                            fontWeight: "800"
                        }}
                    >

                        Report an Error

                    </h1>

                    <p
                        style={{

                            color: "#6b7280",

                            marginTop: "12px",

                            lineHeight: "1.6"
                        }}
                    >

                        Found an issue in the app?
                        Help us improve the platform
                        by submitting a quick report.

                    </p>

                </div>


                {/* ===================== */}
                {/* SUCCESS MESSAGE */}
                {/* ===================== */}

                {

                    reported && (

                        <div
                            style={{

                                backgroundColor: "#ecfdf3",

                                color: "#067647",

                                border:
                                    "1px solid #abefc6",

                                padding: "14px",

                                borderRadius: "10px",

                                marginBottom: "25px",

                                textAlign: "center",

                                fontWeight: "600"
                            }}
                        >

                            ✅ Report submitted successfully

                        </div>
                    )
                }


                {/* ===================== */}
                {/* FORM */}
                {/* ===================== */}

                <form onSubmit={handleSubmit}>


                    {/* ISSUE TYPE */}

                    <div
                        style={{
                            marginBottom: "22px"
                        }}
                    >

                        <label
                            style={{

                                display: "block",

                                marginBottom: "8px",

                                fontWeight: "600",

                                color: "#374151"
                            }}
                        >

                            Issue Type

                        </label>

                        <select

                            value={
                                reportData.issueType
                            }

                            onChange={(e) =>

                                setReportData({

                                    ...reportData,

                                    issueType:
                                        e.target.value
                                })
                            }

                            style={{

                                width: "100%",

                                padding: "14px",

                                borderRadius: "10px",

                                border:
                                    "1px solid #d1d5db",

                                backgroundColor:
                                    "#ffffff",

                                fontSize: "15px",

                                outline: "none"
                            }}
                        >

                            <option value="Bug">
                                Bug / Glitch
                            </option>

                            <option value="Payment">
                                Payment / Wallet Issue
                            </option>

                            <option value="UI">
                                Display / UI Issue
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* DESCRIPTION */}

                    <div
                        style={{
                            marginBottom: "22px"
                        }}
                    >

                        <label
                            style={{

                                display: "block",

                                marginBottom: "8px",

                                fontWeight: "600",

                                color: "#374151"
                            }}
                        >

                            Description

                        </label>

                        <textarea

                            rows="5"

                            placeholder="Explain the issue clearly..."

                            value={
                                reportData.description
                            }

                            onChange={(e) =>

                                setReportData({

                                    ...reportData,

                                    description:
                                        e.target.value
                                })
                            }

                            style={{

                                width: "100%",

                                padding: "14px",

                                borderRadius: "10px",

                                border:
                                    "1px solid #d1d5db",

                                resize: "none",

                                fontSize: "15px",

                                outline: "none",

                                boxSizing:
                                    "border-box"
                            }}

                            required
                        />

                    </div>


                    {/* STEPS */}

                    <div
                        style={{
                            marginBottom: "30px"
                        }}
                    >

                        <label
                            style={{

                                display: "block",

                                marginBottom: "8px",

                                fontWeight: "600",

                                color: "#374151"
                            }}
                        >

                            Steps to Reproduce
                            (Optional)

                        </label>

                        <textarea

                            rows="4"

                            placeholder="1. Open dashboard&#10;2. Click buy&#10;3. Observe issue"

                            value={
                                reportData.stepsToReproduce
                            }

                            onChange={(e) =>

                                setReportData({

                                    ...reportData,

                                    stepsToReproduce:
                                        e.target.value
                                })
                            }

                            style={{

                                width: "100%",

                                padding: "14px",

                                borderRadius: "10px",

                                border:
                                    "1px solid #d1d5db",

                                resize: "none",

                                fontSize: "15px",

                                outline: "none",

                                boxSizing:
                                    "border-box"
                            }}
                        />

                    </div>


                    {/* BUTTON */}

                    <button

                        type="submit"

                        style={{

                            width: "100%",

                            padding: "15px",

                            backgroundColor: "#f97316",

                            color: "white",

                            border: "none",

                            borderRadius: "12px",

                            fontSize: "16px",

                            fontWeight: "600",

                            cursor: "pointer",

                            transition: "0.3s"
                        }}
                    >

                        Submit Report

                    </button>

                </form>

            </div>
        </div>
        <StockItFooter/>
        </>
    );
}

export default ReportError;