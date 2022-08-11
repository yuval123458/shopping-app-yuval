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

  const wishList = useSelector((state) => state.cart.wishList);

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "30px" }}>YOUR WISH-LIST</h1>

      <Products prods={wishList} />
    </>
  );
};

export default WishList;
