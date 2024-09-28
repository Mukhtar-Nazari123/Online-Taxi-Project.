import { useState } from "react";
import React from "react";
import "./login.css"; // Import your custom styles
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from "../../components/axiosInstance";
import swal from 'sweetalert';
import { IoMdHome } from "react-icons/io";

function Login() {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error: ""
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  }

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    }

    axiosInstance.get('sanctum/csrf-cookie').then(response => {
      axiosInstance.post('api/login', data).then(res => {
        if (res.data.status === true) {
          console.log('request sent!!');
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('id', res.data.id);
          localStorage.setItem('driver_id', res.data.driverId);
          localStorage.setItem('role', res.data.role);
          
          const driverStatus = res.data.driverStatus;

          switch (res.data.role) {
            case 'driver':
              if (driverStatus === 'enabled') {
                navigate('/driver');
                swal("Success", res.data.message, "success");
              }else{
                window.confirm(`you are disabled!!!`);
              }
              break;
            case 'admin':
              navigate('/adminPanel');
              swal("Success", res.data.message, "success");
              break;
            default:
              navigate('/user'); 
              swal("Success", res.data.message, "success");
              break;
          }
        } else {
          setLogin({ ...loginInput, error: res.data.error });
        }
      }).catch(error => {
        console.error('Login error:', error);
        if (error.response && error.response.data && error.response.data.error) {
          setLogin({ ...loginInput, error: error.response.data.error });
        } else {
          setLogin({ ...loginInput, error: 'An error occurred. Please try again.' });
        }
      });
    }).catch(error => {
      console.error('CSRF error:', error);
    });
  }

  return (
    <div className="container login-container">
      <Link to="/" title="home" className="text-decoration-none">
          <IoMdHome className="fs-2 homeIcon1"/>
      </Link>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-8">
          <div className="row">
            {/* Left column with car picture */}
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img
                width={'200px'}
                src={"OIP (5).jpeg"}
                alt="Taxi service"
                className="img-fluid login-image"
              />
            </div>
            {/* Right column with login form */}
            <div className="col-md-6 my-4">
                <div className="loginHeader bg-primary p-2">
                  <h3 className="text-center">Login</h3>
                </div>
              <div className="login-form">
                <form onSubmit={loginSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-dark">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      name="email"
                      onChange={handleInput}
                      value={loginInput.email} 
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-dark">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      name="password"
                      onChange={handleInput}
                      value={loginInput.password} 
                      autoComplete="password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                  {loginInput.error && (
                    <div className="errorMessage">{loginInput.error}</div>
                  )}
                  <p className="my-2">
                    Don't have an account? <Link to="/register" className="text-decoration-none me-2">Register Account</Link>
                    <Link to="/" className="text-decoration-none">Home</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;