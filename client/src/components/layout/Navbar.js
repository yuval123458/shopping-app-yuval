import React, { Fragment } from "react";
import classes from "../../App.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../store/users-slice";
import { clearCart } from "../store/cart-slice";

const Navbar = ({ token }) => {
  const productsLength = useSelector((state) => state.cart.productsLength);
  console.log(productsLength);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogoutHandler = async () => {
    dispatch(Logout());
    dispatch(clearCart());

    navigate("/");
  };

  let Authlinks = (
    <div>
      <Link to="/" className="navbar-link">
        HOME
      </Link>
      <Link to="/wishlist" className="navbar-link">
        MY WISH-LIST
      </Link>
      <Link onClick={LogoutHandler} to="/" className="navbar-link">
        LOGOUT
      </Link>
    </div>
  );

  let guestlinks = (
    <div>
      <Link to="/" className="navbar-link">
        HOME
      </Link>
      <Link to="/register" className="navbar-link">
        REGISTER
      </Link>
      <Link to="/sign-in" className="navbar-link">
        SIGN IN
      </Link>
    </div>
  );

  return (
    <Fragment>
      <div className={classes.navbar}>
        <div className="navbar-wrapper">
          <div className="navbar-left">
            <span>EN</span>
            <div className="search-cont">
              <input></input>
              <SearchIcon style={{ color: "grey", fontSize: "16px" }} />
            </div>
          </div>
          <div className="navbar-center">
            <h1>YUVAL'S SHOPPING.</h1>
          </div>
          <div className="navbar-right">
            {token !== null ? Authlinks : guestlinks}
            <Link
              style={{ marginRight: "5px" }}
              className="navbar-link"
              to="/cart"
            >
              <Badge badgeContent={productsLength} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
