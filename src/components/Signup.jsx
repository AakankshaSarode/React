
import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [otherYear, setOtherYear] = useState(""); // State for otherYear
  const [college, setCollege] = useState("");
  const [otherCollege, setOtherCollege] = useState(""); // State for otherCollege

  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState("Register");

  
  const handleApi = () => {
    // Validate all fields
    if (!username || !password || !mobile || !email || !department || !year || !college) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Include otherCollege and otherYear in the data payload
    const data = {
      username,
      password,
      mobile,
      email,
      department,
      year: year === "Other" ? otherYear : year,
      college: college === "Other" ? otherCollege : college,
    };
  
    // Replace "your_api_endpoint" with the actual endpoint URL
    const apiUrl = "http://localhost:4000/signup"; // Example URL
    axios
      .post(apiUrl, data) // Make a POST request to the signup endpoint
      .then((response) => {
        console.log(response); // Log the response from the backend
        // Handle successful response, if needed
      })
      .catch((error) => {
        console.error(error); // Log any errors that occur during the request
        // Handle errors, if needed
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
              placeholder=" Enter your username"
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
              type={showPassword ? "text" : "password"}
              placeholder=" Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash className="eye" onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye className="eye" onClick={() => setShowPassword(true)} />
            )}
          </div>

          {/* Dropdowns for department, year */}
          <span className="label">DEPARTMENT</span>
          <div className="input">
            <input
              type="text"
              placeholder="Enter your Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          
          <span className="label">COLLEGE</span>
          <select value={college} onChange={(e) => setCollege(e.target.value)} className="select">
            <option value="">Select College</option>
            <option value="Engineering">  Dr.DY patil college of Engineering</option>
            <option value="Engineering">  Dr.DY patil college of Research and Management</option>
            <option value="Pharmacy"> Dr. DY Patil College of Pharmacy</option>
            <option value="Architecture"> Dr.Patil College  of Architecture</option>
            <option value="Art and Craft"> Dr.Patil College of Applied Art</option>
            <option value="Architecture"> Dr.Patil College  of BBA</option>
            <option value="Art and Craft"> Dr.Patil College of Agriculture</option>
            <option value="Polytechnic"> S.B patil College polytechnic</option>
            <option value="Junior College"> Dr. DY patil college of Junior College</option>
            <option value="Other">Other</option>
          </select>

          {/* Input field for other college */}
          {college === "Other" && (
            <div className="input">
              <input
                type="text"
                placeholder="Enter your college name"
                value={otherCollege}
                onChange={(e) => setOtherCollege(e.target.value)}
              />
            </div>
          )}


          <span className="label">YEAR</span>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="select" required>
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
            <option value="Other">Other</option>
          </select>

          {/* Input field for other year */}
          {year === "Other" && (
            <div className="input">
              <input
                type="text"
                placeholder="Enter your year"
                value={otherYear}
                onChange={(e) => setOtherYear(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="submit-container">
          <button
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={handleApi}
          >
            Register
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
