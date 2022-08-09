import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const CategorieItem = (props) => {
  return (
    <div className="categorie-item">
      <img alt="" src={props.img} />
      <div className="item">
        <h1>{props.title}</h1>
        <Link to={`/products/${props.season}`}>
          <button>SHOP NOW</button>
        </Link>
      </div>
    </div>
  );
};

export default CategorieItem;
