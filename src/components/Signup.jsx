
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import "./signup.css";

const Signup = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [action, setAction] = useState("Sign Up");

  const handleApi = () => {
    if (!username.trim() || !password.trim() || !mobile.trim() || !email.trim()) {
      alert("Please fill in all the fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const url = "http://localhost:4000/signup";
    const data = { username, password, mobile, email };

    axios
      .post(url, data)
      .then((res) => {
        console.log("Signup Response:", res.data);
        if (res.data.message) {
          alert(res.data.message);
        } else {
          console.log("Redirecting to login page...");
          history.push("/login");
        }
      })
      .catch((err) => {
        console.error("Signup Error:", err);
        alert("SERVER ERROR");
      });
  };

  return (
    <div className="body">
      <div className="container card">
        <div className="header">
          <div className="text"> {action} </div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <span className="label"> USERNAME</span>
          <div className="input">
            <FaUser className="user" />
            <input
              type="text"
              placeholder=" Enter you username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <span className="label"> MOBILE</span>
          <div className="input">
            <IoCall className="user" />
            <input
              type="tel"
              placeholder=" Enter your Mobile no."
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <span className="label">EMAIL</span>
          <div className="input">
            <TbMailFilled className="user" />
            <input
              type="email"
              placeholder=" Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <span className="label"> PASSWORD</span>

          <div className="input">
            <FaLock className="user" />
            <input
              type="password"
              placeholder=" Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="submit-container">
          <button
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={handleApi}
          >
            SignUp
          </button>
          <Link className="submit" to="/login">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
