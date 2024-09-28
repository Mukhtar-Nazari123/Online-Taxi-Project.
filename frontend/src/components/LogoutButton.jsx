import React from 'react';
import './logoutButton.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
       
      // Remove the token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      navigate('/');
      swal("Success","Logged Out Successfully!", "success");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <div className='logoutBtn mx-4 text-primary' onClick={handleLogout}> 
      <i class="bi bi-box-arrow-left fs-4 me-2 my-auto"></i>
      <span className='fs-5 my-auto'>Log out</span>
    </div>
  )
}

export default LogoutButton