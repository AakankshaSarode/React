import React, { useEffect } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Categories from "./CategoriesList";
const AddProduct = () => {
  const navigate = useNavigate();
  const [pname, setpname] = useState("");
  const [pdesc, setpdesc] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [pimage, setpimage] = useState("");
  const [pimage2, setpimage2] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  const handleApi = () => {
    const formData = new FormData();
    formData.append("pname", pname);
    formData.append("pdesc", pdesc);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("pimage", pimage);
    formData.append("pimage2", pimage2);
    formData.append("userId", localStorage.getItem("userId"));
    const url = "http://localhost:4000/add-product";
    axios
      .post(url, formData)
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          alert(res.data.message);
          navigate("/");
        }
      })
      .catch((err) => {
        alert("server err");
      });
  };
  return (
    <div>
      <Header />
      <div className="p-3">
        <h2>ADD PRODUCT HERE:</h2>
        <label>Product Name</label>
        <input
          className="form-control"
          type="text"
          value={pname}
          onChange={(e) => {
            setpname(e.target.value);
          }}
        />
        <label>Product Description</label>
        <input
          className="form-control"
          type="text"
          value={pdesc}
          onChange={(e) => {
            setpdesc(e.target.value);
          }}
        />
        <label>Product Price</label>
        <input
          className="form-control"
          type="text"
          value={price}
          onChange={(e) => {
            setprice(e.target.value);
          }}
        />
        <label>Product Category</label>
        <select
          className="form-control"
          value={category}
          onChange={(e) => {
            setcategory(e.target.value);
          }}
        >
          <option>Bikes</option>
          <option>mobiles</option>
          <option>Laptop</option>
          <option>Furniture</option>
          <option>Elctronic Gadgets</option>
          <option>Books</option>
          <option>other</option>
          {Categories &&
            Categories.length > 0 &&
            Categories.map((item, index) => {
              return <option key={"opiton" + index}>{item}</option>;
            })}
        </select>
        <label>Product Image</label>
        <input
          className="form-control"
          type="file"
          onChange={(e) => {
            setpimage(e.target.files[0]);
          }}
        />
       
        <label>Product Second Image</label>
        <input
          className="form-control"
          type="file"
          onChange={(e) => {
            setpimage2(e.target.files[0]);
          }}
        />

        <button onClick={handleApi} className="btn btn-primary mt-3">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
