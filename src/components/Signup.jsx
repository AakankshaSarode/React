import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Signup = () => {
  return (
    <div>
    <Header />
     welcome to signup page...
      <br />
      USERNAME
      <input type="text" />
      <br />
  PASSWORD
      <input type="text" />
      <br />
      <button>SIGNUP</button>
      <Link to="/login">LOGIN</Link>
  </div>
  );
}

export default Signup;
