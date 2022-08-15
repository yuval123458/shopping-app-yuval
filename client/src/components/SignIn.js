import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignIn as Login } from "./store/users-slice";
import React from "react";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.users.errors);
  console.log(errors);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(Login(formData)).unwrap();

    navigate("/");
  };

  return (
    <div className="login-cont">
      <div className="login-wrapper">
        <h1>Sign In</h1>
        <form onSubmit={submitHandler}>
          <input
            onChange={changeHandler}
            name="email"
            value={email}
            placeholder="Email"
          />

          {errors &&
            errors.length > 0 &&
            errors.map(
              (err) =>
                err.param === "email" && (
                  <small key={err.param}> * {err.msg}</small>
                )
            )}
          {errors.param === "email" && <small>* {errors.msg}</small>}

          <input
            type="password"
            onChange={changeHandler}
            name="password"
            value={password}
            placeholder="Password"
          />
          {errors &&
            errors.length > 0 &&
            errors.map(
              (err) =>
                err.param === "password" && (
                  <small key={err.param}> * {err.msg}</small>
                )
            )}
          {errors && errors.param === "password" && (
            <small>* {errors.msg}</small>
          )}
          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
