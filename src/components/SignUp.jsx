import React, { useState } from "react"; 
import { Link } from "react-router-dom"; 
import styles from "./SignUp.module.css"; 
import NavBar from "./NavBar";

export default function SignUp() { 
    const [username, setUsername] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [phoneNumber, setPhoneNumber] = useState(""); 
    const [isSignedUp , setSignUp] = useState(false);

    function handleClick(event) {
        event.preventDefault();

        // Check if any field is empty
        if (!username || !email || !password || !phoneNumber) {
            alert("Please fill out all fields.");
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = existingUsers.find(
            (user) => 
                user.username === username ||
                user.email === email ||
                user.phoneNumber === phoneNumber
        );

        if (existingUser) {
            alert("User already exists. Please SignIn to continue.");
        } else {
            const newUser = {
                username: username,
                email: email,
                password: password,
                phoneNumber: phoneNumber,
            }; 

            const updatedUsers = [...existingUsers, newUser];
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            setSignUp(true);
            alert("SignUp Successful! Welcome, " + username);
            window.location.href = "/Home";
        }
    }
        return (
            <>
                <NavBar />
                <div className={styles.form}>
                    <form>
                        <h3>SignUp Form</h3>
                        <div>
                            <div className={styles.input_box}>
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                            <div className={styles.input_box}>
                                <label htmlFor="phone_number">Phone No:</label>
                                <input
                                    type="text"
                                    minLength={10}
                                    maxLength={10}
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className={styles.inputBox}
                                />
                            </div>
                            <div className={styles.input_box}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.inputBox}
                                />
                            </div>
                            <div className={styles.submit}>
                                <button type="submit" onClick={handleClick} className={styles.login}>SignUp</button>
                            </div>
                            <div className={styles.alreadyUser}>
                                <h6>
                                    Already user {" "}
                                    <li>
                                        <Link to="/SignIn">SignIn</Link>
                                    </li>
                                </h6>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }
