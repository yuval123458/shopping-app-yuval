import React, { Fragment } from "react";
import ProductItem from "./ProductItem";
import "../App.css";

const Products = ({ filter, prods }) => {
  if (filter && filter !== "show all") {
    prods = prods.filter((prod) => prod.categorie === filter);
  }

  if (prods.length === 0) {
    return (
      <div className="products">
        <h3>
          Could not find products that match your request please choose a
          different option.{" "}
        </h3>
      </div>
    );
  }

  return (
    <Fragment>
      {prods && (
        <div className="products">
          {prods.map((product) => (
            <div key={product._id}>
              <ProductItem
                season={product.season}
                id={product._id}
                img={product.img}
              />
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Products;
