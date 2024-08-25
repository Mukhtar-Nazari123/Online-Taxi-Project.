import React, { Component } from "react";
import Navbar from "../../components/Navbar"; // Adjusted import path if necessary
import Footer1 from "../../components/Footer1"; // Adjusted import path if necessary

import "./home.css"; // Make sure this path is correct and the CSS file exists

export class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <section className="hero text-center">
          <div className="container">
            <h1 className="display-4 mb-4">Your Ride, Your Way</h1>
            <p className="lead mb-5">
              Fast, reliable rides for any destination
            </p>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <button className="cta-button">Request a Ride</button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-5">Why Choose TaxiApp?</h2>
            <div className="row">
              <div className="col-md-4 text-center mb-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-clock"></i>
                </div>
                <h3>Fast Pickup</h3>
                <p>
                  Our drivers are always nearby, ensuring quick pickups whenever
                  you need a ride.
                </p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Safe &amp; Secure</h3>
                <p>
                  Your safety is our top priority. All our drivers are
                  thoroughly vetted and trained.
                </p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <h3>Affordable Rates</h3>
                <p>
                  Enjoy competitive pricing and transparent fares with no hidden
                  charges.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-5">Choose Your Ride</h2>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="vehicle-type text-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Economy car icon"
                    className="mb-3"
                    width="150"
                    height="150"
                  />
                  <h3>Economy</h3>
                  <p>Affordable rides for everyday trips</p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="vehicle-type text-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Comfort car icon"
                    className="mb-3"
                    width="150"
                    height="150"
                  />
                  <h3>Comfort</h3>
                  <p>Newer cars with extra legroom</p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="vehicle-type text-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Premium car icon"
                    className="mb-3"
                    width="150"
                    height="150"
                  />
                  <h3>Premium</h3>
                  <p>Luxury vehicles for special occasions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-5">Available in Major Cities</h2>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="city-card">
                  <img
                    src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
                    alt="New York City skyline"
                    className="img-fluid"
                    width="400"
                    height="300"
                  />
                  <div className="city-card-overlay">
                    <h3>New York</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="city-card">
                  <img
                    src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
                    alt="London cityscape"
                    className="img-fluid"
                    width="400"
                    height="300"
                  />
                  <div className="city-card-overlay">
                    <h3>London</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="city-card">
                  <img
                    src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
                    alt="Tokyo at night"
                    className="img-fluid"
                    width="400"
                    height="300"
                  />
                  <div className="city-card-overlay">
                    <h3>Tokyo</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 bg-light">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h2 className="mb-4">Become a Driver</h2>
                <p className="mb-4">
                  Join our community of drivers and earn money on your own
                  schedule. Enjoy flexible hours, weekly payouts, and great
                  support.
                </p>
                <button className="cta-button">Sign Up to Drive</button>
              </div>
              <div className="col-md-6">
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
                  alt="Driver in car"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>

        <Footer1 />
      </div>
    );
  }
}

export default Home;
