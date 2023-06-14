import axios from "axios";
import React, { useContext, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  
  const {currentUser ,login} = useContext(AuthContext)
  console.log(currentUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const validate = () => {
    let isProceed = true;
    let errorMessage = "Please Enter the value : ";

    if (inputs.username === "" || inputs.username === null) {
      isProceed = false;
      errorMessage += " Username ,";
    }

    if (inputs.password === "") {
      isProceed = false;
      errorMessage += " Password ";
    }

    if (!isProceed) {
      setErr(errorMessage);
    }
    return isProceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
    try {
      // const res = await axios.post("/auth/login", inputs);
      await login(inputs)
        navigate("/");
    } catch (error) {
      setErr(error.response.data)
      console.log(error);
    }
    }
  };

  return (
    <div className="container col-6 my-5">
      <div className="auth">
        <Card>
          <h1 className="text-center ">Log in page</h1>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {err && <Alert variant="danger">{err}</Alert>}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit">Login</Button>
              <span className="mx-3">
                Don't you have an account? <Link to="/register">Register</Link>
              </span>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
