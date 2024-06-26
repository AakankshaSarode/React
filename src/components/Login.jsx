
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import "./login.css";
import API_URL from "../constants";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  const handleApi = () => {
    if (!username || !password) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    const url = API_URL+"/login";
    const data = { username, password };

    axios
      .post(url, data)
      .then((res) => {
        console.log("Login response:", res.data);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          navigate("/", { replace: true }); // Redirect to home page
        } else {
          setErrorMessage("Invalid credentials"); // Set error message for invalid credentials
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setErrorMessage("Server error"); // Set error message for server errors
      });
  };

  return (
    <div className="body">
      <div className="container card">
        <div className="header">
          <div className="text"> Login </div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <span className="label">USERNAME</span>
          <div className="input">
            <FaUser className="user" />
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <span className="label">PASSWORD</span>
          <div className="input">
            <FaLock className="user" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <div className="error">{errorMessage}</div>} {/* Display error message */}
        </div>
        <div className="submit-container">
          <button className="submit" onClick={handleApi}>
            LOGIN
          </button>
        </div>
        <div className="create-account">
          Don't have an account? <Link to="/signup">Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;