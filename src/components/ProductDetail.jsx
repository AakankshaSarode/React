import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
const ProductDetail = () => {
  const [product, setproduct] = useState();
const [user, setuser] = useState();
  const p = useParams();

  {
    /* console.log(p.productId)*/
  }
  useEffect(() => {
    const url = "http://localhost:4000/get-product/" + p.productId;

    axios
      .get(url)
      .then((res) => {
     
        if (res.data.product) {
          setproduct(res.data.product);
        }
      })
      .catch((err) => {
        alert("server err");
      });
  }, []);
   const handleContact=(addedBy)=>{
    console.log('id',addedBy);
    const url = "http://localhost:4000/get-user/" + addedBy;

    axios
      .get(url)
      .then((res) => {
     
        if (res.data.user) {
          setuser(res.data.user);
       }
      })
      .catch((err) => {
        alert("server err");
      });
  }
  return (
    <>

        <Header />
        <div >
        PRODUCT DETAILS:
        {product && (
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <img
                width="300px"
                height="200px"
                src={"http://localhost:4000/" + product.pimage}
              />
              <img
                width="300px"
                height="200px"
                src={"http://localhost:4000/" + product.pimage2}
              />
              <h6>Product Details:</h6>
              {product.pdesc}
            </div>
            <div>
              <h3 className="m-2 price-text">Rs.{product.price}/-</h3>
              <p className="m-2 ">{product.pname} | {product.category}</p>
           <p className="m-2 text-success">{product.pdesc}</p>
           {product.addedBy &&
            <button onClick={()=>handleContact(product.addedBy)}>SHOW CONTACT DETAILS</button>}
            {user && user.username && <h4>{user.username}</h4>}
            {user && user.mobile && <h3>{user.mobile}</h3>}
            {user && user.email && <h6>{user.email}</h6>}
               </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;