import React from "react";
import { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   localStorage.setItem("user",JSON.stringify(inputs));
  // }, []);

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

    if (inputs.email === "") {
      isProceed = false;
      errorMessage += " email ,";
    }

    if (inputs.password === "") {
      isProceed = false;
      errorMessage += " Password ";
    }

    if (!isProceed) {
      setErr(errorMessage);
    } else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(inputs.email)) {
    } else {
      isProceed = false;
      setErr("Please Enter the valid Email formate");
    }
    return isProceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await axios.post("/auth/register", inputs);

        navigate("/login");
        console.log(res);
      } catch (error) {
        setErr(error.response.data);
        console.log(error);
      }
    }
  };

  return (
    <div className="container col-6 my-5">
      <div className="auth">
        <Card>
          <h1 className="text-center "> Sign up page</h1>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {err && <Alert variant="danger">{err}</Alert>}
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
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
              <Button type="submit">Register</Button>
              <span className="mx-3">
                Do you have an account? <Link to="/login">Login</Link>
              </span>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
