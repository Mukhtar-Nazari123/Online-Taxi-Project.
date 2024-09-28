import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './requestInfo.css';

function RequestInfo({ requestData, onClose }) {
  const user_id = localStorage.getItem('id')
  const [time, setTime] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const handleConfirm = async () => {
    try {
      const response = await axios.post('api/trip/tripRequest', {
        user_id: user_id, 
        origin: origin.label,
        origin_latitude: origin.latitude,
        origin_longitude: origin.longitude,
        destination: destination.label,
        destination_latitude: destination.latitude,
        destination_longitude: destination.longitude,
        passenger_count: requestData.number,
        distance: distance,
        fare_amount: fare,
      });

      console.log("Trip created successfully:", response.data);
      onClose(); // Close the modal after confirmation
    } catch (error) {
      console.error("Error creating trip:", error.response ? error.response.data : error.message);
      // You can handle error feedback to the user here
    }
  };

  useEffect(() => {
    const savedRouteData = localStorage.getItem('routeData');
    if (savedRouteData) {
      const parsedData = JSON.parse(savedRouteData);
      setTime(parsedData.time);
      setDistance(parsedData.distance);
      setFare(parsedData.fare);
      
      setOrigin({
        label: parsedData.origin.label,
        latitude: parsedData.origin.lat,
        longitude: parsedData.origin.lon
      });
      
      setDestination({
        label: parsedData.destination.label,
        latitude: parsedData.destination.lat,
        longitude: parsedData.destination.lon
      });
    }
  }, []);

  return (
    <>
      <div className='requestModal'>
        <div className="rClose-btn" onClick={onClose}>
          &times;
        </div>
        <div className="requestModal-content">
          <h4 className='p-2'>Confirm Your Action</h4>
          <p><span className='fw-bold'>Origin: </span>{origin?.label}</p>
          <p><span className='fw-bold'>Destination: </span>{destination?.label}</p>
          <p><span className='fw-bold'>Number: </span>{requestData.number}, <span className='fw-bold'>Time: </span>{time}</p>
          <p><span className='fw-bold'>Distance: </span>{distance} km, <span className='fw-bold'>Fare: </span>{fare} Afs</p>
          <div className="modal-buttons">
            <button onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestInfo;