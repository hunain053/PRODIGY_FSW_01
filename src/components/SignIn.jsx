import React, { useState } from "react";
import { Link } from "react-router-dom"; // eslint-disable-next-line
import styles from "./SignIn.module.css";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    function handleClick(event) {
        event.preventDefault();

        // Check if any field is empty
        if (!email || !password) {
            alert("Please fill out all fields.");
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = existingUsers.find(
            (user) => 
                user.email === email && user.password === password
        );

        if (existingUser) {
            alert("Login Successful! Welcome back, " + existingUser.username);
            setLoggedIn(true);
            window.location.href = "./Home";
        } else {
            const existingEmail = existingUsers.find((user) => user.email === email);
            if (existingEmail) {
                alert("Invalid password. Please try again.");
            } else {
                alert("Email or password is not valid. Kindly sign up.");
            }
        }
    }

    return (
        <>
            <div className={styles.form}>
                <form>
                    <h3>SignIn Form</h3>
                    <div className={styles.input_box}>
                        <label htmlFor="email_id">Email ID:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.inputBox}
                        />
                    </div>
                    <div className={styles.input_box}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.inputBox}
                        />
                    </div>
                    <div className={styles.submit}>
                        <button className={styles.login} onClick={handleClick}>Login</button>
                    </div>
                    <div className={styles.createAccount}>
                        <h6>
                            Create new account {" "}
                            <li>
                                <Link to="/SignUp">SignUp</Link>
                            </li>
                        </h6>
                    </div>
                </form>
            </div>
        </>
    );
}
