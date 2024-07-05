import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import NavBar from "./NavBar";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();

    const errors = {};

    if (!username) {
      errors.username = "Username is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
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
      alert("SignUp Successful! Welcome, " + username);
      navigate("/SignIn");
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
              {errors.username && (
                <div className={styles.error}>{errors.username}</div>
              )}
            </div>
            <div className={styles.input_box}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputBox}
              />
              {errors.password && (
                <div className={styles.error}>{errors.password}</div>
              )}
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
              {errors.phoneNumber && (
                <div className={styles.error}>{errors.phoneNumber}</div>
              )}
            </div>
            <div className={styles.input_box}>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputBox}
              />
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>
            <div className={styles.submit}>
              <button type="submit" onClick={handleClick} className={styles.login}>
                SignUp
              </button>
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
