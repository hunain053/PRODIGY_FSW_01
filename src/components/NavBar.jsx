import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "./NavBar.module.css";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            setIsLoggedIn(true);
        }
    }, []);

    function handleSignUpClick(event) {
        if (isLoggedIn) {
            event.preventDefault();
            alert("You are already logged in.");
        }
    }

    function handleHomeClick() {
        setIsLoggedIn(false); // Reset logged in status when navigating to Home
    }

    return (
        <nav>
            <ul className={Style.list}>
                <li>
                    <Link to="/" onClick={handleHomeClick}>Home</Link>
                </li>
                <li>
                    <Link to="/SignUp" onClick={handleSignUpClick}>SignUp</Link>
                </li>
            </ul>
        </nav>
    );
}
