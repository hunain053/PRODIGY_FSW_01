import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();

    let valid = true;

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = existingUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (existingUser) {
      alert("Login Successful! Welcome back, " + existingUser.username);
      navigate("/Home");
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
            {emailError && <div style={{ color: "red" }}>{emailError}</div>}
          </div>
          <div className={styles.input_box}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputBox}
            />
            {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
          </div>
          <div className={styles.submit}>
            <button className={styles.login} onClick={handleClick}>
              Login
            </button>
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
