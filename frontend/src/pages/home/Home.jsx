import React, { Component } from "react";
import Navbar from "../../components/Navbar"; 
import Footer1 from "../../components/Footer1"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./home.css"; 
import { Link } from "react-router-dom";
import image1 from '../../assets/images/image1.webp';
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.jpg';
import image4 from '../../assets/images/image4.jpg';


const images = [
  `url(${image1})`,
  `url(${image2})`,
  `url(${image3})`,
  `url(${image4})`,
];

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.bottomRef = React.createRef();
  }

componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        currentIndex: (prevState.currentIndex + 1) % images.length,
      }));
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  scrollToBottom = () => {
    if (this.bottomRef.current) {
      this.bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  render() {

    const { currentIndex } = this.state;
    return (
      <div>
        <Navbar contactClick={this.scrollToBottom}/>

        <section className="hero text-center" style={{ backgroundImage: images[currentIndex] }}>
          <div className="container">
            <h1 className="homeHeader display-3 mb-4 text-info">Your Ride, Your Way</h1>
            <p className="textOne lead mb-5 fs-1 text-white">
              Fast, reliable rides for any destination
            </p>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <Link to="/user" className="text-decoration-none">
                  <button className="cta-button">Request a Ride</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-5">Why Choose TaxiApp?</h2>
            <div className="row">
              <div className="col-md-4 text-center box1 mb-4">
                <div className="feature-icon fast-pickup mb-3">
                  <i className="fas fa-clock"></i>
                </div>
                <h3>Fast Pickup</h3>
                <p>
                  Our drivers are always nearby, ensuring quick pickups whenever
                  you need a ride.
                </p>
              </div>
              <div className="col-md-4 text-center mb-4 box1">
                <div className="feature-icon safe-secure mb-3">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Safe & Secure</h3>
                <p>
                  Your safety is our top priority. All our drivers are
                  thoroughly vetted and trained.
                </p>
              </div>
              <div className="col-md-4 text-center mb-4 box1">
                <div className="feature-icon affordable-rates mb-3">
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
            <div className="vehicle-type-container">
              <div className="vehicle-type box1">
                <div className="feature-icon economy mb-3">
                  <i className="fas fa-car"></i>{" "}
                  {/* Use a valid FontAwesome icon */}
                </div>
                <h3>Economy</h3>
                <p>Affordable rides for everyday trips</p>
              </div>
              <div className="vehicle-type box1">
                <div className="feature-icon comfort mb-3">
                  <i className="fas fa-car-side"></i>{" "}
                  {/* Use a valid FontAwesome icon */}
                </div>
                <h3>Comfort</h3>
                <p>Newer cars with extra legroom</p>
              </div>
              <div className="vehicle-type box1">
                <div className="feature-icon premium mb-3">
                  <i className="fas fa-taxi"></i>{" "}
                  {/* Use a valid FontAwesome icon */}
                </div>
                <h3>Premium</h3>
                <p>Luxury vehicles for special occasions</p>
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
                <p className="mb-4">
                  Join our community of drivers and earn money on your own
                  schedule. Enjoy flexible hours, weekly payouts, and great
                  support.
                </p>
                <Link to="/driverRegister" className="text-decoration-none">
                  <button className="cta-button">Sign Up to Drive</button>
                </Link>
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
        <div ref={this.bottomRef}>
          <Footer1 />
        </div>
      </div>
    );
  }
}

export default Home;
