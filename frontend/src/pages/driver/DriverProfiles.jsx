import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Tab, Form, Button, Card, Alert } from 'react-bootstrap';
import './driverProfile.css';
import axios from 'axios';
import ChangePwd from './ChangePwd';
import UpdateCarInfo from './UpdateCarInfo';
import GetDriverLocation from './GetDriverLocation';

const DriverProfiles = () => {
    const driverId = localStorage.getItem('driver_id');
    const [driverData, setDriverData] = useState({
        name: '',
        email: '',
        phone: '',
        id: '',
        address: '',
        photo: '',
    });
    const [driver, setDriver] = useState({
        availability: true,
        status: 'Active',
    });

    const [activeTab, setActiveTab] = useState('personal');
    const [showAlert, setShowAlert] = useState(false);
    const [validationErrors, setValidationErrors] = useState(null); // State for validation errors
    const containerRef = useRef(null);
    const [showContainer, setShowContainer] = useState(true);
    const [successMessage, setSuccessMessage] = useState(''); 

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', driverData.name);
        formData.append('email', driverData.email);
        formData.append('phone_number', driverData.phone);
        formData.append('address', driverData.address);
        
        const photoInput = document.querySelector('input[name="photo"]');
        if (photoInput && photoInput.files[0]) {
            formData.append('your_photo', photoInput.files[0]);
        }

        console.log('Submitting:', Array.from(formData.entries())); // Log the FormData entries

        try {
            const response = await axios.post(`/api/driver/updateProfile/${driverId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setDriverData(response.data.driver);
            setSuccessMessage('Profile updated successfully!');
            setShowAlert(true);
            setValidationErrors(null); 
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Capture validation errors
                setValidationErrors(error.response.data.errors);
            } else {
                console.error('Error updating driver data:', error.response ? error.response.data : error.message);
            }
        }
    };

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
                    {validationErrors && (
                        <Alert variant="danger">
                            <ul>
                                {Object.keys(validationErrors).map((key) => (
                                    <li key={key}>{validationErrors[key].join(', ')}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}
                     {successMessage && (
                        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
                            {successMessage}
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
                                    {activeTab === 'vehicle' && <UpdateCarInfo />}
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="documents" title="Change Password">
                            <Card>
                                <Card.Body>
                                    <ChangePwd />
                                </Card.Body>
                                <GetDriverLocation status={driver.availability} />
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>)
    );
};

export default DriverProfiles;