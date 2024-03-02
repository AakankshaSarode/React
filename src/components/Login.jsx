import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <Header />
       welcome to login...
        <br />
        USERNAME
        <input type="text" />
        <br />
    PASSWORD
        <input type="text" />
        <br />
        <button>LOGIN</button>
        <Link to="/signup">SIGNUP</Link>
    </div>
  );
}

export default Login;
