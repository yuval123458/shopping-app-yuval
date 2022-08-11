import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteFromCart, getCart } from "./store/cart-slice";
import AlertModel from "./layout/AlertModel";
import { Link } from "react-router-dom";
import React from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const [model, showModel] = useState(false);
  const [prod, setProd] = useState("");

  useEffect(() => {
    dispatch(getCart()).unwrap();
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  console.log(cart);

  let total = 0;

  if (cart.products)
    for (const product of cart.products) {
      total = total + product.quantity * product.price;
    }

  const closeHandler = () => {
    showModel(false);
  };
  const showHandler = (productId) => {
    showModel(true);

    setProd(productId);
  };

  const deleteHandler = async (productId) => {
    await dispatch(DeleteFromCart(productId)).unwrap();

    showModel(false);
  };

  return (
    <Fragment>
      {(!cart.products || cart.products.length === 0) && (
        <h3>
          Could not find products in your bag. Please{" "}
          <Link to="/sign-in">Sign In</Link> to add items .
          <Link to={"/register"}>Create your account</Link> if you do not have
          one yet.
        </h3>
      )}
      {cart.products && (
        <div className="cart-cont">
          <div className="cart-wrapper">
            <h1>YOUR BAG</h1>

            <div className="cart-top">
              {" "}
              <button>
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                  CONTINUE SHOPPING
                </Link>
              </button>
              <div className="top-text">
                SHOPPING BAG ({`${cart.products.length}`})
              </div>
              <span>WISHLIST ({`${cart.wishlist.length}`})</span>
              <button
                style={{
                  display: `${cart.products.length === 0 ? "none" : ""}`,
                }}
              >
                {" "}
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: `${cart.products.length === 0 ? "none" : ""}`,
                  }}
                  to="/checkout"
                >
                  CHECKOUT
                </Link>
              </button>
            </div>
            <div className="cart-bottom">
              <div className="cart-info">
                {cart.products.length === 0 && (
                  <h3>Could not find products in your bag. </h3>
                )}

                {cart.products.map((product) => (
                  <Fragment key={product._id}>
                    {model && prod === product._id && (
                      <AlertModel
                        heading={"are you sure? "}
                        text={"are you sure you want to delete this product"}
                        onDelete={() => deleteHandler(product._id)}
                        setShow={closeHandler}
                      />
                    )}
                    {product.configure === true && (
                      <div className="cart-product">
                        <div className="cart-product-detail">
                          <img alt="cart-photo-img" src={product.img} />
                          <div className="product-details">
                            <h3>{product.title}</h3>
                            <span>ID: {product.productId.toString()}</span>
                            <Link
                              style={{
                                textDecoration: "none",
                                marginTop: "50px",
                              }}
                              to={`/products/product/${product.productId}`}
                              onClick={() => deleteHandler(product._id)}
                            >
                              Please configure size, color and amount before you
                              procceed.
                            </Link>

                            <button
                              onClick={() => showHandler(product._id)}
                              style={{ width: "10%", height: "10%" }}
                              className="delete-button"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {product.configure === false && (
                      <div className="cart-product">
                        <div className="cart-product-detail">
                          <img alt="cart-photo-img" src={product.img} />
                          <div className="product-details">
                            <h3>{product.title}</h3>
                            <span>ID: {product.productId.toString()}</span>
                            <span
                              style={{
                                backgroundColor: `${product.color}`,
                              }}
                              className="color-span"
                            ></span>
                            <span>Size: {product.size}</span>
                          </div>
                          <div className="price-detail">
                            <div className="price-detail-amount">
                              <span> Amount: {product.quantity}</span>
                            </div>
                            <span>
                              Price: {product.price * product.quantity} $
                            </span>
                            <button
                              onClick={() => showHandler(product._id)}
                              style={{ width: "10%", height: "10%" }}
                              className="delete-button"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <hr></hr>
                  </Fragment>
                ))}
              </div>
            </div>
            {cart.products.length > 0 && (
              <div className="cart-summary">
                <h2>CART SUMMARY</h2>
                <div className="summary-item">
                  <span>Subtotal</span>
                  <span>{total} $</span>
                </div>
                <div className="summary-item">
                  <span>Shipping</span>
                  <span>6.90 $</span>
                </div>
                {total > 50 && (
                  <div className="summary-item">
                    <span>Shipping Discount</span>
                    <span> - 6.90 $</span>
                  </div>
                )}
                <div className="summary-item">
                  <span>Total</span>
                  <span> {total > 50 ? total : total + 6.9} $</span>
                </div>
                <button>
                  {" "}
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    to="/checkout"
                  >
                    CHECKOUT
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
