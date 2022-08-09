import React, { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import AlertModel from "./layout/AlertModel";
import { useDispatch } from "react-redux";
import { sendOrder } from "./store/order-slice";
import { useNavigate } from "react-router";

const Checkout = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    address: "",
    paymentMethod: "*",
    creditCardNumber: "",
    creditCardExpiration: "",
    CVV: "",
    name: "",
  });
  const navigate = useNavigate();

  console.log(form);

  const {
    address,
    paymentMethod,
    creditCardNumber,
    creditCardExpiration,
    CVV,
    name,
  } = form;

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showHandler = () => {
    setShow(true);
  };

  const closeHandler = () => {
    setShow(false);
  };

  const submitHandler = () => {
    dispatch(sendOrder(form)).unwrap();

    navigate("/");
  };

  return (
    <div className="checkout-wrapper">
      <AlertModel
        heading="Confirm Order"
        text="Confirm your Order and Payment method"
        show={show}
        setShow={closeHandler}
        onDelete={submitHandler}
      />
      <h1>YOUR INFO</h1>
      <small>Do not enter a real credit card!</small>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={address}
            name="address"
            type="adress"
            placeholder="Address"
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Select
            onChange={(e) =>
              setForm((prev) => ({ ...prev, paymentMethod: e.target.value }))
            }
            name="paymentMethod"
            value={paymentMethod}
          >
            <option value="*">*</option>
            <option value="VISA">VISA</option>
            <option value="AMERICAN EXPRESS">AMERICAN EXPRESS</option>
            <option value="MASTER CARD">MASTER CARD</option>
          </Form.Select>
        </Form.Group>
        {form.paymentMethod !== "*" && (
          <Form.Group className="payment-control">
            <Form.Control
              name="name"
              placeholder="Full Name "
              value={name}
              onChange={changeHandler}
            />
            <Form.Control
              name="creditCardNumber"
              type="passsword"
              placeholder="Credit Card Number"
              value={creditCardNumber}
              onChange={changeHandler}
            />
            <div className="payment-control-input">
              <Form.Control
                value={creditCardExpiration}
                name="creditCardExpiration"
                placeholder="MM/YY"
                onChange={changeHandler}
              />
              <Form.Control
                name="CVV"
                value={CVV}
                type="password"
                placeholder="CVV"
                onChange={changeHandler}
              />
            </div>
          </Form.Group>
        )}
      </Form>
      <Button onClick={showHandler}>Send Request</Button>
    </div>
  );
};

export default Checkout;
