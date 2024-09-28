import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './carInfo.css'

function CarInfo() {
  const [formData, setFormData] = useState({
    driver_id: localStorage.getItem('driver_id'),
    model: '',
    year: '2024',
    plate_number: '',
    color: 'white',
  });
  const [message, setMessage] = useState('');
  const [showContainer, setShowContainer] = useState(true);
  const containerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('/api/car/info', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      const errorMsg = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(', ')
        : 'An unexpected error occurred.';
      setMessage(errorMsg);
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
    (showContainer && <div className='cardBody d-flex justify-content-center col-5' ref={containerRef}>
      <div className='col-12 mt-2'>
      <div className="close-btn" onClick={handleClose}>
            &times;
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className='fs-3 fw-bold'>Car Information</legend>
          <div className='row'>
            <div className="col-md-6">
              <label htmlFor="model" className="form-label">Model</label>
              <input
                type="text"
                className="form-control"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="year" className="form-label">Year</label>
              <input
                type="number"
                className="form-control"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='row mt-3'>
            <div className="col-md-6">
              <label htmlFor="plateNo" className="form-label">Plate No</label>
              <input
                type="text"
                className="form-control"
                id="plateNo"
                name="plate_number"  // Keeping it as plateNo
                value={formData.plate_number}  // Using plateNo
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="color" className="form-label">Color</label>
              <select
                id="color"
                className="form-select"
                name="color"
                value={formData.color}
                onChange={handleChange}
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
            </div>
          </div>
          {message && <div className='text-success'>{message}</div>}
          <div className="mt-3">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </fieldset>
      </form>
    </div>
    </div>)
  );
}

export default CarInfo;