
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddProduct from "./AddProduct";
import Categories from "./Categories";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // Import FaShoppingCart icon
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cProducts, setCProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const url = "http://localhost:4000/get-products";
    axios
      .get(url)
      .then((res) => {
        if (res.data.products) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        alert("server err");
      });
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleClick = () => {
    const url = "http://localhost:4000/search?search=" + search;

    axios
      .get(url)
      .then((res) => {
        setCProducts(res.data.products);
        setIsSearch(true);
      })
      .catch((err) => {
        alert("server err.");
      });
  };

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item, index) => {
      return item.category === value;
    });
    setCProducts(filteredProducts);
  };

  const handleLike = (productId) => {
    let userId = localStorage.getItem("userId");

    const url = "http://localhost:4000/like-product";
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert("Liked.");
        }
      })
      .catch((err) => {
        alert("server err.");
      });
  };

  const handleProduct = (id) => {
    navigate("/product/" + id);
  };

  const handleAddToCart = () => {
    navigate("/liked-products"); // Redirect to Liked Products section
  };

  return (
    <div>
      <Header
        search={search}
        handleSearch={handleSearch}
        handleClick={handleClick}
      />
      <Categories handleCategory={handleCategory} />

      {isSearch && (
        <div className="d-flex justify-content-center flex-wrap">
          {cProducts.map((item) => (
            <div key={item._id} className="pcard m-3">
              <div onClick={() => handleLike(item._id)} className="icons-heart">
                <FaHeart className="icons" />
              </div>
              <img
                width="300px"
                height="200px"
                src={"http://localhost:4000/" + item.pimage}
              />
              <p className="pl-2">
                {item.pname} | {item.category}
              </p>
              <p className="pl-2 text-success">{item.pdesc}</p>
              <h3 className="pl-2 text-success">{item.price}</h3>
         
         
            </div>
          ))}
        </div>
      )}

      {!isSearch && (
        <div className="d-flex justify-content-center flex-wrap">
          {products.map((item) => (
            <div
              key={item._id}
              className="pcard m-3"
              onClick={() => handleProduct(item._id)}
            >
              <div onClick={() => handleLike(item._id)} className="icons-heart">
                <FaHeart className="icons" />
              </div>
              <img
                width="300px"
                height="200px"
                src={"http://localhost:4000/" + item.pimage}
              />
              <h3 className="pl-2 price-text">Rs.{item.price}</h3>
              <p className="pl-2">
                {item.pname} | {item.category}
              </p>
              <p className="pl-2 text-success">{item.pdesc}</p>
         
         
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
