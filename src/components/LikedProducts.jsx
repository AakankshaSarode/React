
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import "./Home.css";
import Header from "./Header";

const LikedProducts = () => {
  const [products, setProducts] = useState([]);
  const [cproducts, setCProducts] = useState([]);
  const [search, setSearch] = useState(""); // Initialize search state with an empty string

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      fetchLikedProducts();
    }
  }, []);

  const fetchLikedProducts = () => {
    const url = "http://localhost:4000/liked-products";
    const data = { userId: localStorage.getItem('userId') };
    axios.post(url, data)
      .then((res) => {
        if (res.data.products) {
          setProducts(res.data.products);
          setCProducts(res.data.products);
        }
      })
      .catch((err) => {
        alert("Server error");
      });
  };

  const handleLike = (productId) => {
    if (!localStorage.getItem('userId')) {
      alert("Please login to like products.");
      return;
    }

    const userId = localStorage.getItem('userId');
    const url = "http://localhost:4000/like-product";
    const data = { userId, productId };
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert('Liked.');
          reloadLikedProducts();
        }
      })
      .catch((err) => {
        alert("Server error.");
      });
  };

  const reloadLikedProducts = () => {
    fetchLikedProducts();
  };

  const getUnlikedProducts = () => {
    return products.filter((product) => !cproducts.find((p) => p._id === product._id));
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const filteredProducts = products.filter(product =>
      product.pname.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setCProducts(filteredProducts);
  };

  return (
    <>
      <Header onSearch={handleSearch} searchValue={search} />
      <div>
        <h5>SEARCH RESULTS</h5>
        <div className="d-flex justify-content-center flex-wrap">
          {cproducts.map((item) => (
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

        <h5>ALL RESULTS</h5>
        <div className="d-flex justify-content-center flex-wrap">
          {getUnlikedProducts().map((item) => (
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
      </div>
    </>
  );
};

export default LikedProducts;
