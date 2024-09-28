import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './profileEditForm.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ProfileEditForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone_number: '',
    old_password: '',
    password: '',
    confirm_password: '',
  });
  const [editingField, setEditingField] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('api/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone_number: response.data.phone,
          id: response.data.id,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const toggleEditMode = (field) => {
    setEditingField(field === editingField ? null : field);
  };

  const [errorMessages, setErrorMessages] = useState('');
  const [showErrorMessages, setShowErrorMessages] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`api/users/${formData.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Handle successful update, e.g., display a success message
      alert('Change saved successfully!');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Validation error
        const { errors } = error.response.data;
        setErrorMessages(errors);
        setShowErrorMessages(true);
        // Set a timer to hide the error messages after 5 seconds
        const timer = setTimeout(() => {
          setShowErrorMessages(false);
        }, 5000);
        return () => clearTimeout(timer);
      } else {
        console.error('Error updating user data:', error);
        // Handle other errors, e.g., display a generic error message
        setErrorMessages({ '_general': 'An error occurred while saving the changes. Please try again later.' });
        setShowErrorMessages(true);
        // Set a timer to hide the error messages after 5 seconds
        const timer = setTimeout(() => {
          setShowErrorMessages(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  };
  return (
    <div className="">
      <div className="container my-3">
        <div className="form-container">
        {showErrorMessages && (
          <div>
            {Object.keys(errorMessages).map((field) => (
              field === '_general' ? (
                <div className="alert alert-danger" role="alert" key={field}>
                  {errorMessages[field]}
                </div>
              ) : (
                <div className="alert alert-danger" role="alert" key={field}>
                  {errorMessages[field][0]}
                </div>
              )
            ))}
          </div>
        )}
          <h1 className="text-center mb-4">Edit Info</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-1">
              <label htmlFor="name">Name</label>
              <div className="input-group">
                <input
                  type="text"
                  className={`form-control ${editingField === 'name' ? 'editable' : ''}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={editingField !== 'name'}
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text" onClick={() => toggleEditMode('name')}>
                    <i className="bi bi-pencil-square fs-5"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="email">Email</label>
              <div className="input-group">
                <input
                  type="email"
                  className={`form-control ${editingField === 'email' ? 'editable' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={editingField !== 'email'}
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text" onClick={() => toggleEditMode('email')}>
                    <i className="bi bi-pencil-square fs-5"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="phone">Phone</label>
              <div className="input-group">
                <input
                  type="tel"
                  className={`form-control ${editingField === 'phone_number' ? 'editable' : ''}`}
                  id="phone"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  disabled={editingField !== 'phone_number'}
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text" onClick={() => toggleEditMode('phone_number')}>
                    <i className="bi bi-pencil-square fs-5"></i>
                  </span>
                </div>
              </div>
            </div>
            <h4 className='mt-4'>Change the Password</h4>
            <div className="form-group mt-2">
              <label htmlFor="pwd">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  name="old_password"
                  value={null}
                  onChange={handleInputChange}
                />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="pwd">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Npwd"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="npwd">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                />
            </div>
            <div className=" mt-2">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditForm;