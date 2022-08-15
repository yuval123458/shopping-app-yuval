import React, { Fragment, useEffect } from "react";
import SliderImg from "./layout/SliderImg";
import Categorie from "./Categorie";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { GetPopularProducts } from "./store/products-slice";

const Home = () => {
  const prods = useSelector((state) => state.products.products);
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
          <h1 style={{ justifyContent: "center" }}>TRENDING NOW</h1>
          <Products prods={prods} />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
