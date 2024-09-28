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
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute
import Message from "./pages/userPage/Message";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/user" 
            element={
              <PrivateRoute requiredRole="user">
                <User />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/adminPanel" 
            element={
              <PrivateRoute requiredRole="admin">
                <AdminPanel />
              </PrivateRoute>
            } 
          />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/driverRegister" element={<DriverRegistrationForm />} />
          <Route 
            path="/driver" 
            element={
              <PrivateRoute requiredRole="driver">
                <DriverHome />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/driverInfo" 
            element={
              <PrivateRoute>
                <DriverInfo />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/driverProfile" 
            element={
              <PrivateRoute requiredRole="driver">
                <DriverProfiles />
              </PrivateRoute>
            } 
          />
          <Route path="/message" element={<Message />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;