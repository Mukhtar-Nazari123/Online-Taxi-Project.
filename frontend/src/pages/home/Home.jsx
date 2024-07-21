import React, { Component } from "react";
import Navbar from "../../components/Navbar"; // Adjusted import path if necessary
import "./home.css"; // Make sure this path is correct and the CSS file exists
import Footer1 from "../../components/Footer1"; // Adjusted import path if necessary

export class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="backgroundImage"></div>
        <Footer1 />
      </div>
    );
  }
}

export default Home;
