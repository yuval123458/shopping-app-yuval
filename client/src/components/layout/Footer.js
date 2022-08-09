import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";

const Footer = () => {
  return (
    <div className="footer-cont">
      <div className="footer-left">
        <h1>YUVAL.</h1>
        <div className="footer-left-desc">
          Yuval makes their company’s mission a big part of their footer to
          remind subscribers who they are and what they stand for. They also
          have all the required information, but they’ve made their unsubscribe
          message friendly and nice.
        </div>
        <div className="social-cont">
          <div className="social-icon" color="3B5999">
            <FacebookOutlinedIcon />
          </div>
          <div className="social-icon" color="E4405F">
            <InstagramIcon />
          </div>
          <div className="social-icon" color="55ACEE">
            <TwitterIcon />
          </div>
        </div>
      </div>
      <div className="footer-center">
        <h1>Useful Links</h1>
        <ul>
          <li>Home</li>
          <li>Cart</li>
          <li>Man Fashion</li>
          <li>Woman Fashion</li>
          <li>Accessories</li>
          <li>My Account</li>
          <li>Order Tracking</li>
          <li>Wishlist</li>
          <li>Terms And Conditions</li>
        </ul>
      </div>
      <div className="footer-right">
        <h1>Contact</h1>
        <div className="footer-contact">
          <BusinessIcon style={{ marginRight: "10px" }} /> Some Random Street
          10, Tel-Aviv
        </div>
        <div className="footer-contact">
          <PhoneIcon style={{ marginRight: "10px" }} /> 03-888964
        </div>
        <div className="footer-contact">
          <MailOutlinedIcon style={{ marginRight: "10px" }} />{" "}
          yuval.shopping@gmail.com
        </div>
        <img src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </div>
    </div>
  );
};

export default Footer;
