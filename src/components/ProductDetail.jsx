import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
const ProductDetail = () => {
  const [product, setproduct] = useState();

  const p = useParams();

  {
    /* console.log(p.productId)*/
  }
  useEffect(() => {
    const url = "http://localhost:4000/get-product/" + p.productId;

    axios
      .get(url)
      .then((res) => {
        console.log(res);
        if (res.data.product) {
          setproduct(res.data.product);
        }
      })
      .catch((err) => {
        alert("server err");
      });
  }, []);
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
              <h6>Product Details:</h6>
              {product.pdesc}
            </div>
            <div>
              <h3 className="m-2 price-text">Rs.{product.price}/-</h3>
              <p className="m-2 ">{product.pname} | {product.category}</p>
           <p className="m-2 text-success">{product.pdesc}</p>
               </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
