import React, { useState } from "react";

import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [username, setusername] = useState(" ");
  const [password, setpassword] = useState(" ");
  const [mobile, setmobile] = useState(" ");
  const [email, setemail] = useState(" ");
  const handleApi = () => {
    console.log({ username, password });
    const url = " http://localhost:4000/signup";
    const data = { username, password ,mobile,email};
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
      <div className="p-3 m-3">
       <h3> welcome to signup page...</h3>
        <br />
        USERNAME
        <input
          className="form-control"
          type="text"
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <br />
        <br />
        MOBILE
        <input
          className="form-control"
          type="text"
          value={mobile}
          onChange={(e) => {
            setmobile(e.target.value);
          }}
        />
        <br />
        <br />
        EMAIL
        <input
          className="form-control"
          type="text"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <br />
        PASSWORD
        <input
          className="form-control"
          type="text"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <br />
        <button className="btn btn-primary m-3" onClick={handleApi}>SignUp</button>
        <Link className="m-3"   to="/login">LOGIN</Link>
      </div>
    </div>
  );
};

export default Signup;
