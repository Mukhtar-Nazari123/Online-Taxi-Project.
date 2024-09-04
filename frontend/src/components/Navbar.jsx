import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top m-0 p-0">
        <div className="container-fluid">
          <a className="navbar-brand" href="#1">
            <h1>Online Taxi</h1>
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
                  <Link to="/register" className="text-decoration-none">
                    <span
                      className="nav-link text-light p-4"
                      aria-current="page"
                    >
                      Ride
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/driverRegister" className="text-decoration-none">
                    <span className="nav-link text-light p-4">Drive</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light p-4" href="#1">
                    About us
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
