import NavBar from '../extraComponents/NavBarFolder/NavBar';
import StockItFooter from '../extraComponents/FooterFolder/Footer';

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

function LogIn() {

    const [userName, setUserName] = useState('');
    const [passWord, setpassWord] = useState('');

    const navigate = useNavigate();

    async function handleLogIn(e) {

        e.preventDefault();

        try {

            const res = await fetch(
                `${BACKEND_SERVER_URL}user/login`,
                {

                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({

                        name: userName,
                        passWord: passWord,

                    }),

                    credentials: 'include',
                }
            );

            if (res.status === 200) {

                navigate('/');
            }

        } catch (err) {

            console.log(err);
        }
    }

    return (

        <>
            <NavBar />

            <div style={styles.page}>

                <div style={styles.card}>

                    <div style={styles.headerSection}>

                        <h1 style={styles.heading}>
                            Welcome Back
                        </h1>

                        <p style={styles.subHeading}>
                            Login to continue trading with StockIt
                        </p>

                    </div>

                    <form
                        onSubmit={handleLogIn}
                        style={styles.form}
                    >

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }}
                            style={styles.input}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={passWord}
                            onChange={(e) => {
                                setpassWord(e.target.value)
                            }}
                            style={styles.input}
                            required
                        />

                        <button
                            type="submit"
                            style={styles.button}
                        >
                            Log In
                        </button>

                    </form>

                    <div style={styles.bottomText}>

                        Don't have an account?

                        <Link
                            to="/signup"
                            style={styles.link}
                        >
                            Create Account
                        </Link>

                    </div>

                </div>

            </div>

            <StockItFooter />
        </>
    );
}

const styles = {

    page: {

        minHeight: "85vh",

        backgroundColor: "#f4f6f9",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: "40px 20px",
    },

    card: {

        width: "100%",

        maxWidth: "430px",

        backgroundColor: "#ffffff",

        borderRadius: "22px",

        padding: "40px",

        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    },

    headerSection: {

        textAlign: "center",

        marginBottom: "30px",
    },

    heading: {

        fontSize: "2rem",

        color: "#001f3f",

        marginBottom: "8px",

        fontWeight: "800",
    },

    subHeading: {

        color: "#666",

        fontSize: "0.95rem",
    },

    form: {

        display: "flex",

        flexDirection: "column",

        gap: "18px",
    },

    input: {

        padding: "16px",

        borderRadius: "12px",

        border: "1px solid #dcdcdc",

        fontSize: "1rem",

        outline: "none",

        backgroundColor: "#fafafa",
    },

    button: {

        padding: "15px",

        border: "none",

        borderRadius: "12px",

        background:
            "linear-gradient(135deg, #ff9800 0%, #ff6f00 100%)",

        color: "white",

        fontWeight: "bold",

        fontSize: "1rem",

        cursor: "pointer",

        marginTop: "10px",

        boxShadow: "0 6px 18px rgba(255, 152, 0, 0.35)",
    },

    bottomText: {

        marginTop: "22px",

        textAlign: "center",

        color: "#555",

        fontSize: "0.95rem",
    },

    link: {

        marginLeft: "6px",

        textDecoration: "none",

        color: "#ff9800",

        fontWeight: "700",
    }
};

export default LogIn;