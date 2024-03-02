import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div>
      <div className='header'>
        <Link to="/">Home</Link>
    <span className='mt-3'>    Sell & Purchase in your Campus...</span>
    <Link to="/login">LOGIN</Link>
      </div>
    </div>
  );
}

export default Header;
