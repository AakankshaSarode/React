
import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = (props) => {
  const isLoggedIn = localStorage.getItem("token"); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to the login page after logout
  };

  const handleSearch = (e) => {
    props.handleSearch(e.target.value); // Call handleSearch function from props
  };

  return (
    <div className="nav-container d-flex justify-content-between">
      <div className="nav">
        <Link className="links" to="/">
          CampusOLX
        </Link>
        {/* Search bar */}
        <input
          className="search"
          type="text"
          placeholder="mobile, laptop, devices, and more"
          value={props.search || ""}
          onChange={handleSearch} // Call handleSearch function on input change
        />
        <button className="search-btn" onClick={props.handleClick}>
          <FaSearch />
        </button>
      </div>
      <div>
        {isLoggedIn ? ( // Render the buttons only if the user is logged in
          <>
            <Link to="/add-product">
              <button className="logout-btn">ADD PRODUCT</button>
            </Link>
            <Link to="/liked-products">
              <button className="logout-btn">LIKED PRODUCT</button>
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        ) : (
          <Link className="login-btn" to="/login">LOGIN</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
