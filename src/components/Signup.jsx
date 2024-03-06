import React, { useState } from "react";

import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [username, setusername] = useState(" ");
  const [password, setpassword] = useState(" ");
  const handleApi = () => {
    console.log({ username, password });
    const url = " http://localhost:4000/signup";
    const data = { username, password };
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("SERVER ERROR");
      });
  };
  return (
    <div>
      <Header />
      welcome to signup page...
      <br />
      USERNAME
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setusername(e.target.value);
        }}
      />
      <br />
      PASSWORD
      <input
        type="text"
        value={password}
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      />
      <br />
      <button onClick={handleApi}>SignUp</button>
      <Link to="/login">LOGIN</Link>
    </div>
  );
};

export default Signup;
