import React, {useState} from 'react';
import './rideInfo.css';
import axios from 'axios';

const RideInfo = ({ show, handleClose, ride }) => {
    const [message, setMessage] = useState('');
    const driverId = ride.driver_id;
    const rideId = ride.id;
    if (!show) return null;

    const handleOkClick = async () => {
        try {
            const response = await axios.post(`api/trip/accepted/${rideId}`, {
                driver_id: driverId,
            });
    
            console.log('Response from backend:', response.data);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error sending ride acceptance:', error);
        }
    };

    return (
        <div className="custom-alert col-lg-4 col-sm-6">
            <div className="close-Btn" onClick={handleClose}>
                &times;
            </div>
            {message && <div className="alert alert-success m-3">{message}</div>}
            <div className="alert-content ml-2">
                <h4 className='header'>New Ride Request</h4>
                <div><span className='fs-5 fw-bold me-2'>Pickup:</span> <span>{ride.origin}</span></div>
                <div><span className='fs-5 fw-bold me-2'>Dropoff:</span> <span>{ride.destination}</span></div>
                <div><span className='fs-5 fw-bold me-2'>Distance:</span> <span>{ride.distance} Km</span></div>
                <div><span className='fs-5 fw-bold me-2'>Number:</span> <span>{ride.passenger_count}</span></div>
                <div><span className='fs-5 fw-bold me-2'>Fare Amount:</span> <span>{ride.fare_amount} Afs</span></div>
                <div><span className='fs-5 fw-bold me-2'>Passenger Name:</span> <span>{ride.user_name}</span></div>
                <div><span className='fs-5 fw-bold me-2'>Phone:</span> <span>{ride.user_phone}</span></div>
                <button className="btn btn-primary ok-btn" onClick={handleOkClick} >Ok</button>
            </div>
        </div>
    );
};

export default RideInfo;