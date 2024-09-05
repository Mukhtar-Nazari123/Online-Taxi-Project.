import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHome,
  FaCar,
  FaIdCard,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css"; // Import your custom CSS for additional styling

const Footer1 = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="mb-5 text-center">
          <Col>
            <h2 className="company-name">Sina Taxi Company</h2>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6} className="mb-4 mb-md-0">
            <h5>About Us</h5>
            <p>
              Sina Taxi Company provides reliable and efficient taxi services to
              ensure your journey is comfortable and safe. With our commitment
              to excellence and customer satisfaction, we strive to make every
              ride an exceptional experience.
            </p>
          </Col>
          <Col md={6}>
            <h5>Contact Us</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email"
                  defaultValue="qurban.motahari2023@gmail.com"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Write your message"
                  aria-label="Message"
                  rows={3}
                />
              </Form.Group>
              <Button type="submit" className="emailBtn btn btn-primary" style={{width:'40px'}}>
                Send
              </Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <h5>Connect and Navigate</h5>
            <div className="social-icons mb-4 ">
              <a
                href="https://facebook.com/sinataxicompany"
                className="me-3 "
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com/sinataxicompany"
                className="me-3"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com/sinataxicompany"
                className="me-3"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com/company/sinataxicompany"
                className="me-3"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
            <div className="action-icons">
              <a
                href="https://websim.example.com/sina-taxi-company/"
                className="me-3 text-decoration-none"
                aria-label="Home"
              >
                <FaHome /> Home
              </a>
              <a
                href="https://websim.example.com/sina-taxi-company/book-ride"
                className="me-3 text-decoration-none"
                aria-label="Book a Ride"
              >
                <FaCar /> Ride
              </a>
              <a
                href="https://websim.example.com/sina-taxi-company/become-driver"
                className="me-3 text-decoration-none"
                aria-label="Become a Driver"
              >
                <FaIdCard /> Driver
              </a>
              <a
                href="https://websim.example.com/sina-taxi-company/signin"
                className="me-3 text-decoration-none"
                aria-label="Sign In"
              >
                <FaSignInAlt /> Sign In
              </a>
              <a
                href="https://websim.example.com/sina-taxi-company/signup"
                className="me-3 text-decoration-none"
                aria-label="Sign Up"
              >
                <FaUserPlus /> Sign Up
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer1;
