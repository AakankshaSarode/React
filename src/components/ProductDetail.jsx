
// ProductDetail.js

import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "./ProductDetail.css"; // Import your CSS file

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [user, setUser] = useState();
  const [showContactDetails, setShowContactDetails] = useState(false); // State to control visibility
  const p = useParams();
  const carouselRef = useRef(null);

  useEffect(() => {
    const url = "http://localhost:4000/get-product/" + p.productId;

    axios
      .get(url)
      .then((res) => {
        if (res.data.product) {
          setProduct(res.data.product);
        }
      })
      .catch((err) => {
        alert("server err");
      });
  }, []);

  const handleContact = (addedBy) => {
    const url = "http://localhost:4000/get-user/" + addedBy;

    axios
      .get(url)
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
          setShowContactDetails(prevState => !prevState); // Toggle showContactDetails state
        }
      })
      .catch((err) => {
        alert("server err");
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "ArrowLeft") {
      carouselRef.current.scrollLeft -= 100; // Scroll to the left
    } else if (event.key === "ArrowRight") {
      carouselRef.current.scrollLeft += 100; // Scroll to the right
    }
  };

  return (
    <>
      <Header />
      <div className="product-detail-container" onKeyDown={handleKeyPress} tabIndex={0}>
        {product && (
          <>
            <div className="product-images-container" ref={carouselRef}>
              <div className="product-images">
                <img
                  src={"http://localhost:4000/" + product.pimage}
                  alt="Product Image 1"
                />
                {product.pimage2 && (
                  <img
                    src={"http://localhost:4000/" + product.pimage2}
                    alt="Product Image 2"
                  />
                )}
              </div>
            </div>
            <div className="product-details-container">
              <div className="product-details">
                <h3>Product Details:</h3>
                <h4 className="price-text">Rs.{product.price}/-</h4>
                <p>
                  {product.pname} | {product.category}
                </p>
                <p className="text-success">{product.pdesc}</p>
                <button onClick={() => handleContact(product.addedBy)}>
                  {showContactDetails ? "HIDE CONTACT DETAILS" : "SHOW CONTACT DETAILS"}
                </button>
                {/* Show contact details section if showContactDetails is true */}
                {showContactDetails && (
                  <div className="contact-details m-3">
                    {user && user.username && <h4>{user.username}</h4>}
                    {user && user.mobile && <h3>{user.mobile}</h3>}
                    {user && user.email && <h6>{user.email}</h6>}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
