import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Home from "./pages/home/Home";
import User from "./pages/userPage/User";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import RegistrationForm from "./pages/register/RegistrationForm";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./pages/login/Login";
import DriverRegistrationForm from "./pages/register/DriverRegistrationForm";
import DriverInfo from "./pages/register/DriverInfo";
import DriverHome from "./pages/driver/DriverHome";
import DriverProfiles from "./pages/driver/DriverProfiles";
// import "./assets/fonts"; // Import your font CSS here

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/driverRegister" element={<DriverRegistrationForm />} />
          <Route path="/driver" element={<DriverHome />} />
          <Route path="/driverInfo" element={<DriverInfo />} />
          <Route path="/driverProfile" element={<DriverProfiles />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
