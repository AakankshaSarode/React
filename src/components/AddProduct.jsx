
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./CategoriesList";
import "./AddProduct.css"; // Import CSS file

const AddProduct = () => {
  const navigate = useNavigate();
  const [pname, setpname] = useState("");
  const [pdesc, setpdesc] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [pimage, setpimage] = useState("");
  const [pimage2, setpimage2] = useState("");
  const [isPortable, setIsPortable] = useState(""); // State for portable feature

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
    formData.append("isPortable", isPortable); // Append isPortable to form data
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
      <div className="add-product-container p-3">
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
        <textarea
          className="form-control product-description"
          value={pdesc}
          onChange={(e) => {
            setpdesc(e.target.value);
          }}
        />
        <div className="d-flex justify-content-end">
        </div>
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
          {/* Categories options */}
          
          
          {Categories &&
            Categories.length > 0 &&
            Categories.map((item, index) => {
              return <option key={"option" + index}>{item}</option>;
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
        <div>
          {/* Dropdown for selecting portable or non-portable */}
          <label>Is Portable:</label>
          <select
            className="form-control"
            value={isPortable}
            onChange={(e) => setIsPortable(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Portable">Portable</option>
            <option value="Non-portable">Non-portable</option>
          </select>
        </div>
        <button onClick={handleApi} className="btn btn-primary mt-3">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
