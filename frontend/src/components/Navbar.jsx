import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from '../assets/images/logo.jpg';

export class Navbar extends Component {

  userNavigationLinks() {
    const isAuthenticated = !!localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    return isAuthenticated && userRole === 'user' ? "/user" : "/register";
  }

  drivernavigationLink() {
    const isAuthenticated = !!localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    return isAuthenticated && userRole === 'driver' ? "/driver" : "/driverRegister";
  }

  render() {
    const usernavigationLink = this.userNavigationLinks();
    const drivernavigationLink = this.drivernavigationLink();

    const { contactClick } = this.props;
    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top m-0 p-0">
        <div className="container-fluid">
          <a className="navbar-brand" href="#1">
            <div className="d-flex justify-content-center align-items-center">
              <img src={logo} alt="Logo" className="logo d-inline" />
              <h2 className="ms-2 d-inline">Online Taxi</h2>
            </div>
          </a>
          <button
            className="navbar-toggler bg-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Online Taxi
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body navItems">
              <ul className="navbar-nav justify-content flex-grow-1 pe-3">
                <li className="nav-item">
                <a className="nav-link text-light p-4" href="#2">
                  <Link to={usernavigationLink} className="text-decoration-none">
                      Ride
                  </Link>
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-light p-4" href="#2">
                  <Link to={drivernavigationLink} className="text-decoration-none">
                    Drive
                  </Link>
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light p-4" href="#1">
                  <Link to="#" className="text-decoration-none" onClick={contactClick}>About us</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light p-4" href="#1">
                  <Link to="#" className="text-decoration-none" onClick={contactClick}>Contact us</Link>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="sign_buttons d-flex flex-row">
          <Link to="/login" className="text-decoration-none">
            <input
              className="sign bg-primary text-white"
              type="button"
              value="Sign In"
            />
          </Link>
          <Link to="/register" className="text-decoration-none">
            <input
              className="sign bg-primary text-white"
              type="button"
              value="Sign Up"
            />
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
