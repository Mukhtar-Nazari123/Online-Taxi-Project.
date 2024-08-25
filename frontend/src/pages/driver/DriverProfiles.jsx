import React, { useState, useEffect, useRef} from 'react';
import { Tabs, Tab, Form, Button, Card, ListGroup, Alert } from 'react-bootstrap';
import './driverProfile.css';
import axios from 'axios';

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
    vehicle: {
      make: 'Toyota',
      model: 'Camry',
      year: '2019',
      registration: 'ABC 1234',
      insurance: 'INS-5678-90',
    },
    license: {
      number: 'DL1234567',
      expiry: '2025-12-31',
    },
    availability: true,
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [showAlert, setShowAlert] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        // User clicked outside the component, close it
        // You can add your logic here to close the component
        console.log('Clicked outside the component');
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDriverData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleVehicleChange = (event) => {
    const { name, value } = event.target;
    setDriver(prevState => ({
      ...prevState,
      vehicle: {
        ...prevState.vehicle,
        [name]: value
      }
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

  if (!driverData) {
    return <div>Loading...</div>;
  }

 
  return (
    <div className="fullBody container mt-5">
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
                  <h3>Vehicle Information</h3>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Make</Form.Label>
                      <Form.Control type="text" name="make" value={driver.vehicle.make} onChange={handleVehicleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Model</Form.Label>
                      <Form.Control type="text" name="model" value={driver.vehicle.model} onChange={handleVehicleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Registration Number</Form.Label>
                      <Form.Control type="text" name="registration" value={driver.vehicle.registration} onChange={handleVehicleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Insurance Details</Form.Label>
                      <Form.Control type="text" name="insurance" value={driver.vehicle.insurance} onChange={handleVehicleChange} />
                    </Form.Group>
                    <Form.Control type="submit" className='bg-primary' value={'Update Vehicle Info'} variant="primary"/>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="documents" title="Documents">
              <Card>
                <Card.Body>
                  <h3>Documents</h3>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5>Driver's License</h5>
                        <p className="mb-0">License Number: {driver.license.number}</p>
                        <p className="mb-0">Expiry Date: {driver.license.expiry}</p>
                      </div>
                      <span className="document-status verified">Verified</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5>Vehicle Registration</h5>
                        <p className="mb-0">Registration Number: {driver.vehicle.registration}</p>
                      </div>
                      <span className="document-status pending">Pending Verification</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5>Insurance Document</h5>
                        <p className="mb-0">Policy Number: {driver.vehicle.insurance}</p>
                      </div>
                      <span className="document-status verified">Verified</span>
                    </ListGroup.Item>
                  </ListGroup>
                  <Form.Control type="submit" className='bg-primary' value={'Manage Documents'} variant="primary"/>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DriverProfiles;