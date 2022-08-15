import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUp } from "./store/users-slice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.users.errors);
  console.log(errors);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [checkbox, setCheckbox] = useState(false);
  const [passwordErr, setPasswordsErr] = useState(false);

  const { username, email, password, password2 } = formData;

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(formData);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setPasswordsErr(false);

    if (password !== password2) {
      setPasswordsErr(true);
    } else {
      await dispatch(SignUp(formData)).unwrap();

      navigate("/");
    }
  };

  return (
    <div className="register-cont">
      <div className="register-wrapper">
        <h1>CREATE YOUR ACCOUNT</h1>
        <form onSubmit={submitHandler}>
          <input
            onChange={changeHandler}
            name="username"
            value={username}
            placeholder="UserName"
          />
          {errors &&
            errors.map(
              (err) =>
                err.param === "username" && (
                  <small key={err.param}> * {err.msg}</small>
                )
            )}
          <input
            onChange={changeHandler}
            name="email"
            value={email}
            placeholder="Email"
          />
          {errors &&
            errors.map(
              (err) =>
                err.param === "email" && (
                  <small key={err.param}> * {err.msg}</small>
                )
            )}
          <input
            type="password"
            onChange={changeHandler}
            name="password"
            value={password}
            placeholder="Password"
          />
          {errors &&
            errors.map(
              (err) =>
                err.param === "password" && (
                  <small key={err.param}> * {err.msg}</small>
                )
            )}
          <input
            type="password"
            onChange={changeHandler}
            name="password2"
            value={password2}
            placeholder="Confirm Password"
          />
          {passwordErr && <small>Passwords do not match!</small>}
          <div className="policy">
            <span>
              By creating an account, i agree to the terms and conditions of
              Yuval's Shopping Privacy Policy.
            </span>
            <input
              onChange={() => setCheckbox((prev) => !prev)}
              name="checkbox"
              value={checkbox}
              type="checkbox"
            />
          </div>
          <button
            style={{ cursor: `${!checkbox ? "default" : "pointer"}` }}
            disabled={!checkbox}
            type="submit"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
