import React from 'react';
import { useState} from 'react';
import axios from 'axios';

function ChangePwd() {
    const userId = localStorage.getItem('id');
  const [formData, setFormData] = React.useState({
    old_password: '',
    password: '',
    confirm_password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const [errorMessages, setErrorMessages] = useState('');
  const [showErrorMessages, setShowErrorMessages] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`api/users/${userId}`, formData, {
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
        setErrorMessages({ '_general': 'An error occurred while saving the changes. Please try again later.' });
        setShowErrorMessages(true);
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
        <div className="form-container" style={{backgroundColor: '#bfc1c4'}}>
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
          <form onSubmit={handleSubmit}>  
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

export default ChangePwd;