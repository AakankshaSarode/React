import React from "react";
import "./Header.css";
import categories from "./CategoriesList";

const Categories = (props) => {
  return (
    <div className=" cat-container">
      <div>
        <span className="pr-3">All Categories</span>
        {categories &&
          categories.length > 0 &&
          categories.map((item, index) => {
            return (
              <span
                onClick={() =>
                 { props.handleCategory && props.handleCategory(item)}
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