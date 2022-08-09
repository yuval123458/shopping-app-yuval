import React, { Fragment, useEffect, useState } from "react";
import Products from "./Products";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetProductsBySeason } from "./store/products-slice";
import _ from "lodash";

const ProductsList = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { season } = params;
  const prods = useSelector((state) => state.products.products);
  const [filter, setFilter] = useState("show all");
  console.log(filter);
  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(GetProductsBySeason(season)).unwrap();
    };

    fetchProducts();
  }, [dispatch, season]);

  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Fragment>
      {prods.length > 0 && (
        <div className="products-list">
          <h1>{_.capitalize(season)} Collection</h1>
          <div className="products-filter">
            <h3>Filter By:</h3>
            <select value={filter} onChange={filterHandler} name="filter">
              <option value="show all">Show All</option>
              <option value="shirts">Shirts</option>
              <option value="trousers">Trousers</option>
              <option value="shoes">Shoes</option>
              {season === "winter" && <option value="jackets">Jackets</option>}
            </select>
          </div>
          <Products filter={filter} prods={prods} />
        </div>
      )}
    </Fragment>
  );
};

export default ProductsList;
