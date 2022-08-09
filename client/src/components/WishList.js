import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./Products";
import Products from "./Products";
import "../App.css";
import { getCart } from "./store/cart-slice";

const WishList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart()).unwrap();
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "30px" }}>YOUR WISH-LIST</h1>

      <Products prods={cart.wishlist} />
    </>
  );
};

export default WishList;
