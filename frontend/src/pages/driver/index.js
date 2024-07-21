import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import "./style.css"; //t Assuming you will style your component

const DriverPage = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard"); // State to track selected menu item

  // Function to handle menu item clicks and update selectedMenuItem state
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="driver-page">
      <div className="menu-bar">
        <ul>
          <li
            className={selectedMenuItem === "dashboard" ? "active" : ""}
            onClick={() => handleMenuItemClick("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={selectedMenuItem === "profile" ? "active" : ""}
            onClick={() => handleMenuItemClick("profile")}
          >
            Profile
          </li>
          <li
            className={selectedMenuItem === "rides" ? "active" : ""}
            onClick={() => handleMenuItemClick("rides")}
          >
            Ride History
          </li>
          <li
            className={selectedMenuItem === "support" ? "active" : ""}
            onClick={() => handleMenuItemClick("support")}
          >
            Support
          </li>
          <li
            className={selectedMenuItem === "logout" ? "active" : ""}
            onClick={() => handleMenuItemClick("logout")}
          >
            Logout
          </li>
        </ul>
      </div>

      <div className="content">
        {selectedMenuItem === "dashboard" && (
          <section className="driver-dashboard">
            {/* Dashboard content */}
            <h3>Driver Dashboard</h3>
            <div className="dashboard-info">
              <p>Status: Available</p>
              <p>Pending Requests: 2</p>
              <p>Scheduled Rides: 3</p>
              <p>Earnings: $500</p>
            </div>
          </section>
        )}

        {selectedMenuItem === "profile" && (
          <section className="driver-profile">
            {/* Profile management */}
            <h3>Profile Management</h3>
            <form>
              <div>
                <label>Name:</label>
                <input type="text" name="name" />
              </div>
              <div>
                <label>Contact:</label>
                <input type="text" name="contact" />
              </div>
              <div>
                <label>Vehicle:</label>
                <input type="text" name="vehicle" />
              </div>
              <button type="submit">Update Profile</button>
            </form>
          </section>
        )}

        {selectedMenuItem === "rides" && (
          <section className="driver-rides">
            {/* Ride history */}
            <h3>Ride History</h3>
            <ul>
              <li>Ride 1: Pickup - Dropoff (Date)</li>
              <li>Ride 2: Pickup - Dropoff (Date)</li>
              {/* More ride history items */}
            </ul>
          </section>
        )}

        {selectedMenuItem === "support" && (
          <section className="driver-support">
            {/* Support and help */}
            <h3>Support</h3>
            <p>If you have any issues, please contact our support team.</p>
            <ul>
              <li>Email: support@taxiapp.com</li>
              <li>Phone: 123-456-7890</li>
            </ul>
          </section>
        )}

        {selectedMenuItem === "logout" && (
          <section className="driver-logout">
            {/* Logout content */}
            <h3>Logout</h3>
            <p>Are you sure you want to log out?</p>
            <button>Logout</button>
          </section>
        )}
      </div>
    </div>
  );
};

export default DriverPage;
