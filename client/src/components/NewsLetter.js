import React from "react";
import SendIcon from "@mui/icons-material/Send";
import "../App.css";

const NewsLetter = () => {
  return (
    <div className="newsletter-cont">
      <h1>Newsletter</h1>
      <div className="newsletter-desc">
        Get timely updates from your favorite products.
      </div>
      <div className="email-cont">
        <input placeholder="Your email" />
        <button>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
