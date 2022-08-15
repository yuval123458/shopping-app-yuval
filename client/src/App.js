import "./App.css";
import { Routes } from "react-router";
import { Route } from "react-router";
import Home from "./components/Home";
import Navbar from "./components/layout/Navbar";
import Announcement from "./components/layout/Announcement";
import ProductsList from "./components/ProductsList";
import NewsLetter from "./components/NewsLetter";
import Footer from "./components/layout/Footer";
import SingleProduct from "./components/SingleProduct";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Cart from "./components/Cart";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "./components/layout/LoadingSpinner";
import { Fragment, useEffect } from "react";
import { autoSignIn } from "./components/store/users-slice";
import "bootstrap/dist/css/bootstrap.min.css";
import WishList from "./components/WishList";
import React from "react";
import { getCart } from "./components/store/cart-slice";

const App = () => {
  const productsLoading = useSelector((state) => state.products.loading);
  const usersLoading = useSelector((state) => state.users.loading);
  const cartLoading = useSelector((state) => state.cart.loading);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const newsletter = useSelector((state) => state.users.newsletter);

  useEffect(() => {
    if (localStorage.token) {
      dispatch(autoSignIn());
      dispatch(getCart());
    }
  }, [localStorage.token]);

  return (
    <Fragment>
      {(productsLoading || usersLoading || cartLoading) && <LoadingSpinner />}

      <div
        className="app"
        style={{
          display: `${
            productsLoading || usersLoading || cartLoading ? "none" : ""
          }`,
        }}
      >
        <Announcement />
        <Navbar token={token} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/products/:season" element={<ProductsList />} />
          <Route
            path="/products/product/:productId"
            element={<SingleProduct />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <NewsLetter newsletter={newsletter} token={token} />
        <Footer />
      </div>
    </Fragment>
  );
};

export default App;
