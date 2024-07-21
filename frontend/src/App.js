import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Home from "./pages/home/Home";
import User from "./pages/userPage/User";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import RegistrationForm from "./pages/register/RegistrationForm";
import Driver from "./pages/driver";
import Login from "./pages/login/Login";

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
          <Route path="/driver" element={<Driver />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
