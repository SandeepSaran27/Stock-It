import { Link, useNavigate } from 'react-router-dom';
import style from './NavBarStyle.module.css'
import clsx from 'clsx';
import StockImg from '../../StockPages/StockProfileFolder/StockProfile'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

function NavBar() {

    const [showProfile, setShowProfile] = useState(false);
    const [logedIn, setlogedIn] = useState(false);
    const [userData, setUserData] = useState(undefined);
    const [searchText, setSearchText] = useState("");

    const navigate = useNavigate();

    {/*useEffect(() => {
        const cookies = document.cookie;
        const UID = cookies.split('; ').find(cookie => cookie.startsWith('uid='));
        setlogedIn(!!UID);
    }, [logedIn]);*/}

    // useEffect(() => {

    //     const cookies = document.cookie;

    //     const UID = cookies
    //         .split('; ')
    //         .find(cookie => cookie.startsWith('uid='));

    //     setlogedIn(!!UID);

    // }, []);

    useEffect(() => {

    async function checkLogin() {

        try {

            const res = await fetch(
                `${BACKEND_SERVER_URL}user/checkauth`,
                {
                    credentials: "include",
                }
            );
            console.log("res", res);

            if (res.ok) {
                console.log("Loged in");
                setlogedIn(true);
            } else {
                console.log("Not Loged in");
                setlogedIn(false);
            }

        } catch (err) {
            console.log("Error in login is:", err);
            setlogedIn(false);
        }
    }

    checkLogin();

}, []);

    useEffect(() => {
        async function fecthData() {
            const cookies = document.cookie;
            const UID = cookies.split('; ').find(cookie => cookie.startsWith('uid='));
            if (UID) {
                const response = await fetch(`http://localhost:8000/user/getuserdata?userIdToken=${UID}`);
                const DATA = await response.json();
                setUserData(DATA.userData[0]);
            } else {
                console.log("Error");
            }

        }
        fecthData();
    }, []);

    function handleSearch() {

        if (!searchText.trim()) {
            return;
        }

        navigate(
            `/searched-stock?text=${searchText}`
        );
    }

    async function handleLogOut() {

        try {

            const response = await fetch(
                'http://localhost:8000/user/logout',
                {
                    method: 'POST',
                    credentials: 'include',
                }
            );

            const DATA = await response.json();

            console.log(DATA);

            setlogedIn(false);

            setShowProfile(false);

            navigate('/login');

        } catch (error) {

            console.log("Logout Error:", error);

        }
    }

    return (
        <>
            <nav className={style.navStyle}>
                <div className={style.block1}>

                </div>
                <div className={style.block3}>
                    <ul className={style.uiStyle}>
                        <li><Link to='/' className={style.liStyle}>Home</Link></li>
                        <li><Link to='/stocks' className={style.liStyle}>Stock</Link></li>
                        <li><Link to='/learn' className={style.liStyle}>Learn</Link></li>
                        <li><Link to='/about' className={style.liStyle}>About</Link></li>
                    </ul>
                </div>
                <div className={style.block2}>

                    <select name='catg' className={style.selectCatgId}>
                        <option value={0}>Nifty 50</option>
                        <option value={1}>Nifty 100</option>
                        <option value={2}>Nifty 150</option>
                    </select>

                    <input
                        type='text'
                        placeholder='Search Stock...'
                        className={style.searchBlock}

                        value={searchText}

                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}

                        onKeyDown={(e) => {

                            if (e.key === 'Enter') {

                                handleSearch();
                            }
                        }}
                    />
                    <button
                        type='submit'
                        className={style.searchButtonContainer}

                        onClick={handleSearch}
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className={style.searchButton}
                        />
                    </button>
                </div>
                <div className={style.block4}>
                    {/* PROFILE IMAGE */}

                    {logedIn &&

                        <div
                            className={style.profileImg}
                            onClick={() => {
                                setShowProfile(!showProfile)
                            }}
                        >
                            {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                    }

                    {!logedIn && <Link to='/login'><div className={style.logIn}>
                        <p><FontAwesomeIcon icon={faArrowRightToBracket} className={style.loginArrow} /></p>
                        <p>Log In</p>
                    </div></Link>}
                </div>

                <div className={style.block5}></div>
            </nav>

            <div className={style.profileBlockContainer}>

                <div
                    className={clsx(
                        !showProfile && style.displayNone,
                        style.profileBlock
                    )}
                >

                    {/* USER INFO */}

                    <div className={style.userName}>

                        <p>{userData?.name || 'User Name'}</p>

                        <p>
                            {userData?.email || 'user@gmail.com'}
                        </p>

                    </div>

                    {/* BALANCE */}

                    <div className={style.profileBox}>

                        <div className={style.profileLeft}>

                            <span className={style.profileIcon}>💳</span>

                            <div className={style.profileText}>

                                <span className={style.profileTitle}>
                                    ₹ {userData?.valet_balance || '0.00'}
                                </span>

                                <span className={style.profileSub}>
                                    Stocks, F&O balance
                                </span>

                            </div>

                        </div>

                        <Link
                            to='/addmoney'
                            className={style.addMoneyBtn}
                        >
                            Add Money
                        </Link>

                    </div>

                    {/* ORDERS */}

                    <Link to='/allorders'>

                        <div className={style.profileBox}>

                            <div className={style.profileLeft}>

                                <span className={style.profileIcon}>📋</span>

                                <span className={style.profileTitle}>
                                    All Orders
                                </span>

                            </div>

                            <span className={style.profileArrow}>›</span>

                        </div>

                    </Link>

                    {/* HOLDINGS */}

                    <Link to='/holdings'>

                        <div className={style.profileBox}>

                            <div className={style.profileLeft}>

                                <span className={style.profileIcon}>📈</span>

                                <span className={style.profileTitle}>
                                    Holdings
                                </span>

                            </div>

                            <span className={style.profileArrow}>›</span>

                        </div>

                    </Link>

                    {/* WATCHLIST */}

                    <div className={style.profileBox}>

                        <div className={style.profileLeft}>

                            <span className={style.profileIcon}>⭐</span>

                            <span className={style.profileTitle}>
                                Watchlist
                            </span>

                        </div>

                        <span className={style.profileArrow}>›</span>

                    </div>

                    {/* REPORT */}

                    <Link to='/reporterror'>

                        <div className={style.profileBox}>

                            <div className={style.profileLeft}>

                                <span className={style.profileIcon}>📄</span>

                                <span className={style.profileTitle}>
                                    Reports
                                </span>

                            </div>

                            <span className={style.profileArrow}>›</span>

                        </div>

                    </Link>

                    {/* FOOTER */}

                    <div className={style.profileBlockFooter}>

                        <span>☀️</span>

                        <p
                            className={style.logoutBtn}
                            onClick={handleLogOut}
                        >
                            Log out
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}

export default NavBar
