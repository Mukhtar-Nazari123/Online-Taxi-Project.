import React, { useState, useEffect, useRef } from 'react';
import { Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import './editCarInfo.css'

function EditCarInfo({ isOpen, onClose, carId, carModel, carYear, carPlateNum, carColor }) {
    const [car, setCar] = useState({
        id: carId,
        model: carModel,
        year: carYear,
        plate_number: carPlateNum,
        color: carColor,
      });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showContainer, setShowContainer] = useState(true);
  const containerRef = useRef(null);


  const handleCarChange = (event) => {
    setCar((prevCar) => ({
      ...prevCar,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
  
    try {
      const response = await axios.put(`/api/car/update/${car.id}`, car, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.status) {
        setSuccess(true);
        setError('');
        console.log('Car information updated successfully!', response.data.data);
      } else {
        const errorMsg = response.data.errors
          ? Object.values(response.data.errors).flat().join(', ')
          : 'An unexpected error occurred.';
        setError(errorMsg);
        setSuccess(false);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(', ')
        : 'An unexpected error occurred.';
      setError(errorMsg);
      setSuccess(false);
    }
  };

  const handleClose = () => {
    setShowContainer(false);
  };


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

  return (
    isOpen ? ( showContainer && <div className='carCard'ref={containerRef}>
        <div className="close-btn3" onClick={handleClose}>
            &times;
        </div>
      <h3>Car Information</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Car information updated successfully.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Model</Form.Label>
          <Form.Control type="text" name="model" value={car.model} onChange={handleCarChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control type="text" name="year" value={car.year} onChange={handleCarChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Plate Number</Form.Label>
          <Form.Control type="text" name="plate_number" value={car.plate_number} onChange={handleCarChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Color</Form.Label>
          <select
            id="color"
            className="form-select"
            name="color"
            value={car.color}
            onChange={handleCarChange}
            required
          >
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Silver">Silver</option>
            <option value="Gray">Gray</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Brown">Brown</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Orange">Orange</option>
            <option value="Purple">Purple</option>
            <option value="Beige">Beige</option>
            <option value="Gold">Gold</option>
            <option value="Turquoise">Turquoise</option>
            <option value="Matte Black">Matte Black</option>
            <option value="Metallic Blue">Metallic Blue</option>
          </select>
        </Form.Group>
        <Form.Control type="submit" className="bg-primary" value={'Update Car Info'} onChange={handleCarChange} />
      </Form>
    </div>): null
  );
}

export default EditCarInfo;