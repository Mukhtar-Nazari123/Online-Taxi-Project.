import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./registrationForm.css";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../components/axiosInstance";
import swal from 'sweetalert';
import { IoMdHome } from "react-icons/io";

const DriverRegistrationForm = () => {
  const navigate = useNavigate();
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      phone_number: registerInput.phone_number,
      password: registerInput.password,
      confirm_password: registerInput.confirm_password,
      role: "driver",
    };

    axiosInstance.get('sanctum/csrf-cookie').then(response => {
      axiosInstance.post('api/register', data).then(res => {
        console.log('Request sent!!');
        if (res.data.status === 200) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('driver_id', res.data.id);
    
          swal("Success", res.data.message, "success");

          // Navigate to DriverInfo with user ID
          navigate(`/driverInfo`);
        } else {
          setRegister({ ...registerInput, error_list: res.data.errors });
        }
      }).catch(error => {
        console.error('Registration error:', error);
        swal("Error", "An error occurred during registration. Please try again.", "error");
      });
    });
  };

  return (
    <Container className="mt-5">
      <Link to="/" title="home" className="text-decoration-none">
          <IoMdHome className="fs-2 homeIcon"/>
      </Link>
      <Row className="justify-content-md-center">
        <Col md={6}>
        <div className="bg-primary formHeader p-2">
          <h2 className="text-center">Register</h2>
        </div>
          <Form className="registration-form" onSubmit={registerSubmit}>
            <Form.Group controlId="formName">
              <Form.Label className="formLabel">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={handleInput}
                value={registerInput.name}
                autoComplete="name"
                required
              />
              <span className="errorMessage">{registerInput.error_list.name}</span>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="formLabel">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleInput}
                value={registerInput.email}
                autoComplete="email"
                required
              />
              <span className="errorMessage">{registerInput.error_list.email}</span>
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="formLabel">Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phone_number"
                onChange={handleInput}
                value={registerInput.phone_number}
                autoComplete="phone_number"
                required
              />
              <span className="errorMessage">{registerInput.error_list.phone_number}</span>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="formLabel">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={handleInput}
                value={registerInput.password}
                autoComplete="password"
                required
              />
              <span className="errorMessage">{registerInput.error_list.password}</span>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label className="formLabel">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                name="confirm_password"
                onChange={handleInput}
                value={registerInput.confirm_password}
                autoComplete="confirm_password"
                required
              />
              <span className="errorMessage">{registerInput.error_list.confirm_password}</span>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
            <p className="my-2">
              Already have an account? <Link to="/login" className="text-decoration-none me-2">Login</Link>
              <Link to="/" className="text-decoration-none">
              Home
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default DriverRegistrationForm;