import React from "react";
import "./Header.css";
import categories from "./CategoriesList";
import { Link, useNavigate} from "react-router-dom";
const Categories = (props) => {
   const navigate= useNavigate();
 
  return (
    <div className=" cat-container">
      <div>
        <span className="pr-3"><h5>All Categories</h5></span>
        {categories &&
          categories.length > 0 &&
          categories.map((item, index) => {
            return (
              <span
                onClick={() =>
               navigate('/category/'+ item)
                }
                key={index}
                className="category"
              >
                {item}
             
              </span>
            );
          })}
      </div>

    </div>
  );
};

export default Categories;