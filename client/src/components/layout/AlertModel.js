import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";

function AlertDismissible(props) {
  const { show, setShow, onDelete } = props;

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>{props.heading}</Alert.Heading>
        <p>{props.text}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow()} variant="outline-success">
            <CloseIcon />
          </Button>
          <Button onClick={() => onDelete()}>
            <CheckIcon />
          </Button>
        </div>
      </Alert>
    </>
  );
}

const AlertModel = (props) => {
  return <AlertDismissible {...props} />;
};

export default AlertModel;
