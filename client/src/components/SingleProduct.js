import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { GetProductById } from "./store/products-slice";
import { addToCart } from "./store/cart-slice";

const SingleProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { productId } = params;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  console.log(product);
  const errors = useSelector((state) => state.cart.errors);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(GetProductById(productId)).unwrap();
    };
    fetch();
  }, []);

  const [size, setSize] = useState("#");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const colorHandler = (color) => {
    setColor(color);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const body = {
      productId,
      title: product.title,
      price: product.price,
      img: product.img,
      size,
      color,
      quantity,
      configure: false,
    };

    await dispatch(addToCart(body)).unwrap();

    navigate("/");
  };

  return (
    <Fragment>
      {product && (
        <form onSubmit={submitHandler}>
          <div className="single-prod-cont">
            <div className="single-prod-img">
              <img alt="" src={product.img} />
            </div>
            <div className="single-prod-info">
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <span>Price: {product.price}$ </span>
              <div className="single-prod-filter-cont">
                <div className="single-prod-filter-color">
                  Color: <span placeholder="Color" />
                  <div
                    style={{
                      transform: `${
                        color === "black" ? "scale(1.3)" : "scale(1)"
                      }`,
                    }}
                    onClick={() => colorHandler("black")}
                    className="black"
                  ></div>
                  <div
                    onClick={() => colorHandler("darkblue")}
                    style={{
                      transform: `${
                        color === "darkblue" ? "scale(1.3)" : "scale(1)"
                      }`,
                    }}
                    className="darkblue"
                  ></div>
                  <div
                    onClick={() => colorHandler("gray")}
                    style={{
                      transform: `${
                        color === "gray" ? "scale(1.3)" : "scale(1)"
                      }`,
                    }}
                    className="gray"
                  ></div>
                </div>
                {errors &&
                  errors.map(
                    (err) =>
                      err.param === "color" && (
                        <div key={err.param}>
                          <small> * {err.msg}</small>
                        </div>
                      )
                  )}
                <div className="single-prod-filter-size">
                  Size:{"  "}
                  <select
                    onChange={(e) => setSize(e.target.value)}
                    value={size}
                    name="size"
                  >
                    <option value="#">#</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                {errors &&
                  errors.map(
                    (err) =>
                      err.param === "size" && (
                        <small key={err.param}> * {err.msg}</small>
                      )
                  )}
              </div>
              <div className="add-cont">
                <div className="amount-cont">
                  <button
                    type="button"
                    style={{
                      cursor: `${quantity === 1 ? "default" : "pointer"}`,
                    }}
                    disabled={quantity === 1 ? true : false}
                    onClick={() => setQuantity((prev) => (prev = prev - 1))}
                  >
                    <RemoveIcon />
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    style={{
                      cursor: `${quantity === 5 ? "default" : "pointer"}`,
                    }}
                    disabled={quantity === 5 ? true : false}
                    onClick={() => setQuantity((prev) => (prev = prev + 1))}
                  >
                    <AddIcon />
                  </button>
                </div>
                <button type="submit" className="add-to-cart-button">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default SingleProduct;
