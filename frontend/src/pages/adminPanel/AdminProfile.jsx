import React, { useState, useEffect } from 'react';
import "./adminProfile.css";
import axios from 'axios';
import LogoutButton from '../../components/LogoutButton';
import ProfileEditForm from '../../pages/userPage/ProfileEditForm';

function AdminProfile() {
  const [isVisible, setIsVisible] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    id: '',
  });

  const handleClose = () => {
    setIsVisible(false);
  };

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('api/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData({
          name: response.data.name.replace(/^\w/, c => c.toUpperCase()),
          email: response.data.email,
          phone: response.data.phone,
          id: response.data.id,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);



  return (
    isVisible && (
      <div className="userProfile">
        <div className="col">
          <div className="card">
          <div className='container1'>
              <span
                className="close fs-1"
                aria-label="Close"
                onClick={handleClose}
                style={{ cursor: 'pointer' }}
              >
                &times;
              </span>
              </div>
            <div className="card-body position-relative">
              <div className='row d-flex justify-content-center'>
                <img
                src={"thh.jpeg"}
                alt={"avatar"}
                className="rounded-circle img-fluid text-center my-2"
                style={{ width: "120px" }}
              />
              </div>
              <div className="col ">
                <div className="row text-center">
                  <p className="text-muted mb-0 fs-2">{userData.name}</p>
                </div>
                <hr className='mx-4 my-2' />
                <div className="row ">
                  <div className="col-sm-2">
                    <i class="bi bi-envelope-at fs-2 emailIcon"></i>
                  </div> 
                  <div className="col-sm-10 d-flex">
                    <p className="text-muted fs-5 my-auto ">{userData.email}</p>
                  </div>
                </div>
                <hr className='m-2'/>
                <div className="row">
                  <div className="col-sm-2">
                    <i class="bi bi-telephone-plus fs-2 phoneIcon"></i>
                  </div>
                  <div className="col-sm-10 d-flex">
                    <p className="text-muted fs-5 my-auto ">{userData.phone}</p>
                  </div>
                </div>
                <hr className='m-2'/>
              </div>
            </div>
            <div className='mx-4 editButton text-primary'  onClick={toggleEditForm}>
              <i className="bi bi-pencil-square icon fs-4 text-primary me-2"></i>
              <span className='fs-5 text-primary'>Edit</span>
            </div>
            {showEditForm && (
            <div className=''>
              <ProfileEditForm 
              name ={userData.name} 
              email ={userData.email} 
              phone ={userData.phone}
              id ={userData.id} />
            </div>
            )}
            <LogoutButton />
          </div>
        </div>
      </div>
    )
  );
}

export default AdminProfile;