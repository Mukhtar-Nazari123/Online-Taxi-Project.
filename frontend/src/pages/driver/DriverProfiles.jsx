import React, { useState, useEffect, useRef} from 'react';
import { Tabs, Tab, Form, Button, Card , Alert } from 'react-bootstrap';
import './driverProfile.css';
import axios from 'axios';
import ChangePwd from './ChangePwd';
import UpdateCarInfo from './UpdateCarInfo';

const DriverProfiles = () => {
    const driverId = localStorage.getItem('driver_id');
    const [driverData, setDriverData] = useState({
        name: '',
        email: '',
        phone: '',
        id: '',
        status: 'Active',
        address:'',
        photo: '',
      });
  const [driver, setDriver] = useState({
    license: {
      number: 'DL1234567',
      expiry: '2025-12-31',
    },
    availability: true,
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [showAlert, setShowAlert] = useState(false);
  const containerRef = useRef(null);
  const [showContainer, setShowContainer] = useState(true);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowContainer(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDriverData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleAvailabilityToggle = () => {
    setDriver(prevState => ({
      ...prevState,
      availability: !prevState.availability,
      status: !prevState.availability ? 'Active' : 'Offline'
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await axios.get(`/api/driver/profile/${driverId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        setDriverData(response.data.driver);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };
    fetchDriverData();
  }, [driverId]);

  const handleClose = () => {
    setShowContainer(false);
  };

  if (!driverData) {
    return <div>Loading...</div>;
  }

 
  return (
    (showContainer && <div className="fullBody container mt-5" ref={containerRef}>
        <div className="close-btn2" onClick={handleClose}>
            &times;
      </div>
      <div className="row">
        <div className="col-md-4 text-center mb-4">
          <img src={`http://localhost:8000${driverData.photo}`} alt="Driver profile img" className="profile-picture mb-3" />
          <h2>{driverData.name}</h2>
          <span className={`badge ${driver.status === 'Active' ? 'bg-success' : 'bg-secondary'} status-badge mb-3`}>{driver.status}</span>
          <div>
            <Button variant={driver.availability ? 'danger' : 'success'} onClick={handleAvailabilityToggle}>
              {driver.availability ? 'Go Offline' : 'Go Online'}
            </Button>
          </div>
        </div>
        <div className="col-md-8 mb-1">
          {showAlert && (
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
              Profile updated successfully!
            </Alert>
          )}
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="personal" title="Personal Info">
              <Card>
                <Card.Body>
                  <h3>Personal Information</h3>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" name="name" value={driverData.name} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="tel" name="phone" value={driverData.phone} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control type="email" name="email" value={driverData.email} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Photo</Form.Label>
                      <Form.Control type="file" name="photo" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control as="textarea" name="address" value={driverData.address} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Control type="submit" className='bg-primary' value={'Update Personal Info'} variant="primary"/>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="vehicle" title="Vehicle Info">
              <Card>
                <Card.Body>
                    <UpdateCarInfo/>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="documents" title="Change Password">
              <Card>
                <Card.Body>
                  <ChangePwd/>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>)
  );
};

export default DriverProfiles;