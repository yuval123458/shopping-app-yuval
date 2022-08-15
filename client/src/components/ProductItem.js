import React, { useEffect } from "react";
import "../App.css";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "./store/cart-slice";
import { addToCartNoConfg } from "./store/cart-slice";

const ProductItem = (props) => {
  const [fav, setFav] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cart.wishList);

  const likeHandler = (pId) => {
    setFav((prev) => !prev);

    dispatch(addToWishList(props.id));
  };

  useEffect(() => {
    const liked = wishlist.filter((prod) => prod._id === props.id);

    if (liked.length > 0) {
      setFav(true);
    }
  }, [wishlist]);

  const cartHandler = (Id) => {
    dispatch(addToCartNoConfg(Id)).unwrap();

    setAddedToCart(true);
  };

  const [addedTocart, setAddedToCart] = useState(false);

  return (
    <>
      {wishlist && (
        <div className="product-item">
          <img alt="" src={props.img} />
          <div className="p-item">
            {!addedTocart && (
              <div onClick={() => cartHandler(props.id)} className="info">
                <ShoppingCartOutlined />
              </div>
            )}
            <div className="info">
              <Link
                style={{ color: "black" }}
                to={`/products/product/${props.id}`}
              >
                <SearchIcon />
              </Link>
            </div>
            <div onClick={() => likeHandler()} className="info">
              {!fav ? <FavoriteBorderOutlinedIcon /> : <FavoriteOutlinedIcon />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
