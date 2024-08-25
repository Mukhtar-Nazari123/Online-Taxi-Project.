import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#1">
            <h1>Online Taxi</h1>
          </a>
          <button
            class="navbar-toggler bg-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-end text-bg-dark"
            tabindex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Online Taxi
              </h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body navItems">
              <ul class="navbar-nav justify-content flex-grow-1 pe-3">
                <li class="nav-item">
                  <Link to="/register" className="text-decoration-none">
                    <a
                      class="nav-link text-light p-4"
                      aria-current="page"
                      href="#1"
                    >
                      Ride
                    </a>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/driverRegister" className="text-decoration-none">
                    <a class="nav-link text-light p-4" href="#1">
                      Drive
                    </a>
                  </Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light p-4" href="#1">
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
              value="sign in"
            />
          </Link>
          <Link to="/register" className="text-decoration-none">
            <input
              className="sign bg-primary text-white"
              type="button"
              value="sign up"
            />
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
