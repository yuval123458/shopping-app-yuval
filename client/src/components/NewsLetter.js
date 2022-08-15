import React, { useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import "../App.css";
import { useDispatch } from "react-redux";
import { newsletterSignUp } from "./store/users-slice";

const NewsLetter = ({ token, newsletter }) => {
  const dispatch = useDispatch();

  const newsRef = useRef();
  newsRef.current = newsletter;

  const clickHandler = () => {
    newsRef.current = true;

    dispatch(newsletterSignUp()).unwrap();
  };

  return (
    <div className="newsletter-cont">
      <h1>Newsletter</h1>
      <div className="newsletter-desc">
        Get timely updates from your favorite products.
      </div>
      <div className="email-cont">
        {!token ? (
          <input
            disabled
            placeholder="Please register or SignIn in order to enter newsletter list!"
          />
        ) : !newsRef.current ? (
          <input
            disabled
            placeholder="add me! (with your current registered email)"
          />
        ) : (
          <input
            disabled
            placeholder="timely offers and discounts will be sent directly to  your email"
          />
        )}
        <button
          style={{ display: newsRef.current && "none" }}
          onClick={clickHandler}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
