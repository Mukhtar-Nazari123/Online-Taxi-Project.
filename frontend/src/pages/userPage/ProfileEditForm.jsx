import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './profileEditForm.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ProfileEditForm() {
  const [formData, setFormData] = React.useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    profilePicture: null,
    password: '',
    newPassword: '',
  });
  const [editingField, setEditingField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put('/api/users/update', formData, {
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary authentication headers, e.g., 'Authorization': 'Bearer <token>'
        },
      });

      console.log('Response:', response.data);
      // Handle the successful response, e.g., display a success message
    } catch (error) {
      console.error('Error:', error);
      setError('Error updating the profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const toggleEditMode = (field) => {
    setEditingField(field === editingField ? null : field);
  };

  return (
    <div className="">
      <div className="container my-3">
        <div className="form-container">
          <h1 className="text-center mb-4">Edit Info</h1>
          {error && <div className="alert alert-danger">{error}</div>}
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
                    <i className="bi bi-pencil-square "></i>
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
                    <i className="bi bi-pencil-square"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="phone">Phone</label>
              <div className="input-group">
                <input
                  type="text"
                  className={`form-control ${editingField === 'phone' ? 'editable' : ''}`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={editingField !== 'phone'}
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text" onClick={() => toggleEditMode('phone')}>
                    <i className="bi bi-pencil-square"></i>
                  </span>
                </div>
              </div>
            </div>
            <h4 className='mt-4'>Change the Password</h4>
            <div className="form-group mt-2">
              <label htmlFor="pwd">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  name="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="npwd">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="npwd"
                  name="NewPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                />
            </div>
            <div className=" mt-2">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              {isLoading ? 'Saving...' : 'Save'}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditForm;