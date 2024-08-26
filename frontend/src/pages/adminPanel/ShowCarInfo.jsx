import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import EditCarInfo from './EditCarInfo';

function ShowCarInfo() {
  const [cars, setCars] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchCarsInfo() {
      try {
        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get('/api/admin/carsInfo', { headers });
        setCars(response.data.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    }

    fetchCarsInfo();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredCars = cars.filter(car => 
    car.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.plate_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (carId) => {
    setIsEditModalOpen(carId);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(null);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch}/>
      <div className="row">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div className="card col-sm-6 col-md-4 col-lg-3 p-3" key={car.id}>
              <img src={`http://localhost:8000${car.driver.your_photo}`}  
              className="card-img-top rounded mx-auto" 
              alt={car.model}
               />
              <div className="card-body">
                <div className="card-title">
                  <label className="me-1 fw-bold">Name:</label>
                  <span>{car.driver.name}</span>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <label className="me-1 fw-bold">Model:</label>
                  <span>{car.model}</span>
                </li>
                <li className="list-group-item">
                  <label className="me-1 fw-bold">Year:</label>
                  <span>{car.year}</span>
                </li>
                <li className="list-group-item">
                  <label className="me-1 fw-bold">Plate Number:</label>
                  <span>{car.plate_number}</span>
                </li>
                <li className="list-group-item">
                  <label className="me-1 fw-bold">Color:</label>
                  <span>{car.color}</span>
                </li>
              </ul>
              <button className="btn btn-info mt-1" onClick={() => handleEditClick(car.id)}>
                Edit
              </button>
              {isEditModalOpen === car.id && (
              <EditCarInfo
                  isOpen={true}
                  onClose={handleCloseEditModal}
                  carId={car.id}
                  carModel={car.model}
                  carYear={car.year}
                  carPlateNum={car.plate_number}
                  carColor={car.color}
              />
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-white mt-4">
            <p>No results found...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowCarInfo;