import NavBar from '../extraComponents/NavBarFolder/NavBar';
import StockItFooter from '../extraComponents/FooterFolder/Footer';
import React, { useState } from 'react';

const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

function AddMoney() {

    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('idle');

    const cookies = document.cookie;

    const UID = cookies
        .split('; ')
        .find(cookie => cookie.startsWith('uid='));

    const quickAmounts = [

        { label: '1,000', value: '1000' },

        { label: '5,000', value: '5000' },

        { label: '10,000', value: '10000' },

        { label: '25,000', value: '25000' }

    ];

    const handleSubmit = async (e) => {

        if (e) e.preventDefault();

        if (!amount || amount <= 0) return;

        setStatus('loading');

        try {

            const response = await fetch(
                `${BACKEND_SERVER_URL}user/addmoney`,
                {
                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        amount,
                    }),
                }
            );
            if (response.ok) {

                setStatus('success');

                setAmount('');

                setTimeout(() => {

                    setStatus('idle');

                }, 4000);

            } else {

                setStatus('error');
            }

        } catch (error) {

            setStatus('error');
        }
    };

    return (

        <>
            <NavBar />

            <div style={styles.page}>

                <div style={styles.container}>

                    <div style={styles.headerSection}>

                        <div style={styles.iconCircle}>
                            ₹
                        </div>

                        <h1 style={styles.heading}>
                            Add Money
                        </h1>

                        <p style={styles.subHeading}>
                            Instantly add funds to your StockIt wallet
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        style={styles.form}
                    >

                        {/* QUICK BUTTONS */}

                        <div style={styles.quickBox}>

                            <p style={styles.quickTitle}>
                                Quick Select
                            </p>

                            <div style={styles.chipGrid}>

                                {
                                    quickAmounts.map((item) => (

                                        <button
                                            key={item.value}

                                            type="button"

                                            onClick={() =>
                                                setAmount(item.value)
                                            }

                                            style={{

                                                ...styles.chip,

                                                backgroundColor:

                                                    amount === item.value

                                                        ? '#f59e0b'

                                                        : '#fff7ed',

                                                color:

                                                    amount === item.value

                                                        ? '#ffffff'

                                                        : '#ea580c',

                                                border:

                                                    amount === item.value

                                                        ? '1px solid #f59e0b'

                                                        : '1px solid #fdba74'
                                            }}
                                        >

                                            +₹{item.label}

                                        </button>
                                    ))
                                }

                            </div>

                        </div>

                        {/* INPUT */}

                        <div style={styles.inputBox}>

                            <label style={styles.label}>
                                Enter Amount
                            </label>

                            <div style={styles.inputWrapper}>

                                <span style={styles.currency}>
                                    ₹
                                </span>

                                <input

                                    type="number"

                                    placeholder="Minimum ₹500"

                                    value={amount}

                                    onChange={(e) =>
                                        setAmount(
                                            e.target.value
                                        )
                                    }

                                    required

                                    style={styles.input}
                                />

                            </div>

                        </div>

                        {/* BUTTON */}

                        <button

                            type="submit"

                            disabled={
                                status === 'loading' ||
                                !amount
                            }

                            style={{

                                ...styles.submitBtn,

                                background:

                                    amount > 0

                                        ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'

                                        : '#d1d5db',

                                cursor:

                                    amount > 0

                                        ? 'pointer'

                                        : 'not-allowed'
                            }}
                        >

                            {
                                status === 'loading'

                                    ? 'Processing...'

                                    : 'Proceed to Add Money'
                            }

                        </button>

                    </form>

                    {
                        status === 'success' &&

                        <div style={styles.successBox}>

                            ✅ Money added successfully!

                        </div>
                    }

                    {
                        status === 'error' &&

                        <div style={styles.errorBox}>

                            ❌ Failed to add money. Please try again.

                        </div>
                    }

                    <div style={styles.secureBox}>

                        🛡️ 100% Secure Transactions

                    </div>

                </div>

            </div>

            <StockItFooter />
        </>
    );
}

const styles = {

    page: {

        minHeight: '100vh',

        backgroundColor: '#f5f7fb',

        padding: '40px 20px',

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center'
    },

    container: {

        width: '100%',

        maxWidth: '500px',

        backgroundColor: '#ffffff',

        borderRadius: '24px',

        padding: '40px',

        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',

        border: '1px solid #e5e7eb'
    },

    headerSection: {

        textAlign: 'center',

        marginBottom: '35px'
    },

    iconCircle: {

        width: '70px',

        height: '70px',

        borderRadius: '20px',

        backgroundColor: '#fff7ed',

        color: '#ea580c',

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        fontSize: '2rem',

        fontWeight: 'bold',

        margin: '0 auto 15px auto'
    },

    heading: {

        fontSize: '2rem',

        fontWeight: '800',

        color: '#0f172a',

        marginBottom: '10px'
    },

    subHeading: {

        color: '#64748b',

        fontSize: '1rem'
    },

    form: {

        display: 'flex',

        flexDirection: 'column',

        gap: '25px'
    },

    quickBox: {

        backgroundColor: '#fffaf5',

        border: '1px solid #fed7aa',

        borderRadius: '18px',

        padding: '20px'
    },

    quickTitle: {

        marginBottom: '15px',

        fontWeight: '700',

        color: '#9a3412'
    },

    chipGrid: {

        display: 'grid',

        gridTemplateColumns: '1fr 1fr',

        gap: '12px'
    },

    chip: {

        padding: '14px',

        borderRadius: '12px',

        fontWeight: '700',

        fontSize: '0.95rem',

        transition: '0.2s',

        cursor: 'pointer'
    },

    inputBox: {

        display: 'flex',

        flexDirection: 'column',

        gap: '10px'
    },

    label: {

        fontSize: '0.95rem',

        fontWeight: '700',

        color: '#1e293b'
    },

    inputWrapper: {

        position: 'relative'
    },

    currency: {

        position: 'absolute',

        top: '50%',

        left: '18px',

        transform: 'translateY(-50%)',

        fontSize: '1.3rem',

        fontWeight: '700',

        color: '#ea580c'
    },

    input: {

        width: '100%',

        padding: '18px 18px 18px 48px',

        borderRadius: '14px',

        border: '2px solid #e2e8f0',

        fontSize: '1.1rem',

        outline: 'none',

        boxSizing: 'border-box',

        backgroundColor: '#f8fafc'
    },

    submitBtn: {

        padding: '18px',

        borderRadius: '14px',

        border: 'none',

        color: '#ffffff',

        fontSize: '1rem',

        fontWeight: '700',

        transition: '0.2s'
    },

    successBox: {

        marginTop: '20px',

        padding: '14px',

        borderRadius: '12px',

        backgroundColor: '#dcfce7',

        color: '#166534',

        textAlign: 'center',

        fontWeight: '700'
    },

    errorBox: {

        marginTop: '20px',

        padding: '14px',

        borderRadius: '12px',

        backgroundColor: '#fee2e2',

        color: '#b91c1c',

        textAlign: 'center',

        fontWeight: '700'
    },

    secureBox: {

        marginTop: '30px',

        textAlign: 'center',

        color: '#64748b',

        fontSize: '0.9rem',

        fontWeight: '600'
    }
};

export default AddMoney;