
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import "./Home.css";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { catName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/get-products?catName=${catName}`);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Server error while fetching products.");
      }
    };

    fetchProducts();
  }, [catName]);

  const handleLike = (productId) => {
    // Implement like functionality if needed
  };

  const handleProduct = (id) => {
    navigate("/product/" + id);
  };

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center flex-wrap">
        {products.map((item) => (
          <div key={item._id} className="pcard m-3" onClick={() => handleProduct(item._id)}>
            <div onClick={() => handleLike(item._id)} className="icons-heart">
              <FaHeart className="icons" />
            </div>
            <img src={`http://localhost:4000/${item.pimage}`} alt={item.pname} />
            <div className="details">
              <h3 className="price">Rs.{item.price}</h3>
              <p className="name">{item.pname}</p>
              <p className="category">{item.category}</p>
              <p className="desc">{item.pdesc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
