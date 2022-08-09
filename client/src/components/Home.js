import React, { Fragment, useCallback, useEffect } from "react";
import Announcement from "./layout/Announcement";
import Navbar from "./layout/Navbar";
import SliderImg from "./layout/SliderImg";
import Categorie from "./Categorie";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import productsSlice, { GetPopularProducts } from "./store/products-slice";

const Home = () => {
  const prods = useSelector((state) => state.products.products);
  console.log(prods);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPopularProducts());
  }, []);

  return (
    <Fragment>
      {prods.length > 0 && (
        <div className="home">
          <SliderImg />
          <Categorie />
          <h1 style={{ marginLeft: "400px" }}>TRENDING NOW</h1>
          <Products prods={prods} />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
