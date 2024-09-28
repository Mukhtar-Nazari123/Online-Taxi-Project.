import React, { useEffect, useState } from 'react';
import "./passengers.css";
import SearchBar from './SearchBar';
import axios from 'axios';

function Trips() {
  const [trips, setTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/tripInfo', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (tripId) => {
    const confirmDelete = window.confirm(`Do you want to delete the data?`);

    if (confirmDelete) {
      axios.delete(`/api/admin/delete/${tripId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        setTrips(trips.filter(trip => trip.id !== tripId));
        alert('Trip deleted successfully.');
      })
      .catch(error => {
        console.error(error);
        alert('Something went wrong while deleting the user account. Please try again later.');
      });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = trips.filter(trip => 
    trip.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.destination.includes(searchQuery)
  );

  return (
    <div>
      <div className='container-fluid'>
        {/* Existing code for the dashboard cards */}
      </div>

      <div>
        <div className='container-fluid'>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className='container-fluid'>
          <div className="table-responsive">
            <table className="passengerTable table caption-top table-hover bg-white fs-4">
              <caption className='text-white fs-3'>All The Trips</caption>
              <thead>
                <tr>
                  <th className='th' scope="col">Id</th>
                  <th className='th' scope="col">Passenger</th>
                  <th className='th' scope="col">Driver</th>
                  <th className='th' scope="col">Origin</th>
                  <th className='th' scope="col">Destination</th>
                  <th className='th' scope="col">Distance</th>
                  <th className='th' scope="col">Start</th>
                  <th className='th' scope="col">End</th>
                  <th className='th' scope="col">Number</th>
                  <th className='th' scope="col">Fare</th>
                  <th className='th' scope="col">status</th>
                  <th className='update' scope="col">Option</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length ? (
                  filteredUsers.map((trip, index) => (
                    <tr key={index}>
                      <th scope="row">{trip.id}</th>
                      <td>{trip.user ? trip.user.name : 'N/A'}</td>
                      <td>{trip.driver ? trip.driver.user.name : 'N/A'}</td>
                      <td>{trip.origin}</td>
                      <td>{trip.destination}</td>
                      <td>{trip.distance} Km</td>
                      <td>{trip.start_time}</td>
                      <td>{trip.end_time}</td>
                      <td>{trip.passenger_count}</td>
                      <td>{trip.fare_amount} Afs</td>
                      <td>{trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}</td>
                      <td className='d-flex justify-content-center'>
                        <button className='btn btn-danger' type='button' onClick={() => handleDelete(trip.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No results found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trips;