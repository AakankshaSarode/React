import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddProduct from "./AddProduct";
import Categories from "./Categories";
import { AiOutlineHeart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
 import "./Home.css";
const LikedProducts = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState("");
  
  {
    /*  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);*/
  }
  useEffect(() => {
    const url = "http://localhost:4000/liked-products";
    let data={userId: localStorage.getItem('userId')}
    axios
      .post(url,data)
      .then((res) => {
 
        if (res.data.products) {
          setproducts(res.data.products);
        }
      })
      .catch((err) => {

        alert("server err");
      });
  }, []);
  const handlesearch = (value) => {
    setsearch(value);
  };
  const handleClick = () => {
  
    let filteredProducts = products.filter((item) => {
    console.log(item);
    

      if (
        item.pname.toLowerCase().includes(search.toLowerCase()) ||
        item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    });
    setproducts(filteredProducts);
  };
   const handleCategory=(value)=>{

 let filteredProducts= products.filter((item,index)=>{
  if(item.category==value){
    return item;
  }
 })
  setcproducts(filteredProducts);
   }


    const handleLike=(productId)=>{
       let userId=localStorage.getItem('userId');

      const url="http://localhost:4000/like-product";
       const data={userId,productId}
      axios.post(url,data)
      .then((res) => {
if(res.data.message){
  alert('Liked. ');
}
      })
      .catch((err) => {
        alert("server err.");
      });
    }
  return (
    <div>
      <Header
        search={search}
        handleSearch={handlesearch}
        handleClick={handleClick}
      />
      <Categories handleCategory={handleCategory}/>
     
   
   <h5>SEARCH RESULTS</h5>
   <div className="d-flex justify-content-center flex-wrap">
        {cproducts &&
          products.length > 0 &&
          cproducts.map((item, index) => {
            return (
         
              <div key={item._id}className="card m-3">
                           <div onClick={()=>handleLike(item._id)}className="icon-con">   <FaHeart className="icons" />
                        {/* <FaHeart />*/}
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
            );
          })}
      </div>
      <h5>ALL RESULTS</h5>
      <div className="d-flex justify-content-center flex-wrap">
        {products &&
          products.length > 0 &&
          products.map((item, index) => {
            return (
              <div key={item._id}className="card m-3">
            <div onClick={()=>handleLike(item._id)} className="icon-con">   <FaHeart  className="icons" />
               {/* <FaHeart />*/}
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
            );
          })}
      </div>



    </div>
  );
};

export default LikedProducts;