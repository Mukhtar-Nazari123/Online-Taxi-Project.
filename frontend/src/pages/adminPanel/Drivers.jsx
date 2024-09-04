import React, { useEffect, useState } from 'react';
import "./passengers.css";
import SearchBar from './SearchBar';
import axios from 'axios';
import EditDriverDoc from './EditDriverDoc';

function Drivers() {
  const [showEdit, setShowEdit] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); 
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('/api/admin/drivers', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchDrivers();
  }, []);

  const handleDelete = (driverId) => {
    const confirmDelete = window.confirm(`Do you want to delete this driver?`);
    if (confirmDelete) {
      axios.delete(`/api/admin/drivers/${driverId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        // Assuming you have a 'drivers' state variable
        setDrivers(drivers.filter(driver => driver.id !== driverId));
        alert('Driver deleted successfully!');
      })
      .catch(error => {
        console.error(error);
        alert('Something went wrong while deleting the driver. Please try again later.');
      });
    }
  };


  const handleStatusClick = async (driverId) => {
    const confirmChange = window.confirm(`Do you want to change the status of this driver?`);
    
    if (confirmChange) {
      try {
        // 1. Find the current driver
        const currentDriver = drivers.find(driver => driver.id === driverId);
  
        // 2. Determine the new status
        const newStatus = currentDriver.status === 'disabled' ? 'enabled' : 'disabled';
  
        // 3. Send a PUT request to update the driver's status
        const response = await axios.put(
          `/api/admin/drivers/${driverId}/status`, // Your API endpoint
          { status: newStatus }, // Send 'enabled' or 'disabled'
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        // 4. Update the local state with the new status
        setDrivers(prevDrivers => 
          prevDrivers.map(driver => 
            driver.id === driverId ? { ...driver, status: newStatus } : driver
          )
        );
  
        // 5. Handle success or error (optional)
        if (response.status === 200) {
          console.log('Driver status updated successfully!');
        } else {
          console.error('Error updating driver status:', response.data);
        }
      } catch (error) {
        console.error('Error updating driver status:', error);
        // Handle errors (e.g., display an error message)
      }
    }
  };


  const handleEditClick = (driverId) => { 
    setSelectedDriverId(driverId); // Set the driver ID
    setShowEdit(true);
  };

  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredDrivers = drivers.filter(driver => 
    driver.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const EditcloseModal = () => {
    setShowEdit(false); // Update state to hide the modal
  };


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
            <table className="passengerTable table caption-top table-hover fs-4">
              <caption className='text-white fs-3'>Drivers</caption>
              <thead>
                <tr>
                  <th className='th' scope="col">Id</th>
                  <th className='th' scope="col">Name</th>
                  <th className='th' scope="col">Photo</th>
                  <th className='th' scope="col">Id Card</th>
                  <th className='th' scope="col">License</th>
                  <th className='th' scope="col">Address</th>
                  <th className='th' scope="col">Status</th>
                  <th className='update' scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.length ? (
                  filteredDrivers.map((driver, index) => (
                    <tr key={index}>
                      <th scope="row">{driver.id}</th>
                      <td>{driver.user_name}</td>
                      <td>
                      <img 
                        src={`http://localhost:8000${driver.your_photo}`} 
                        alt="Your Img" 
                        width={40} 
                        height={40}
                        onClick={() => handleImageClick(`http://localhost:8000${driver.your_photo}`)} 
                      />
                      </td>
                      <td>
                      <img 
                        src={`http://localhost:8000${driver.id_card_photo}`} 
                        alt="ID Card Img" 
                        width={40}
                        height={40}
                        onClick={() => handleImageClick(`http://localhost:8000${driver.id_card_photo}`)} 
                      />
                      </td>
                      <td>
                        <img 
                          src={`http://localhost:8000${driver.license_photo}`} 
                          alt='license img' 
                          width={40}
                          height={40}
                          onClick={() => handleImageClick(`http://localhost:8000${driver.license_photo}`)} // Trigger modal on click
                        />
                      </td>
                      <td>{driver.address}</td>
                      <td>
                        <div className='statusButton fs-5' onClick={() => handleStatusClick(driver.id)}>
                            {driver.status === 'disabled' ? 'Disabled' : 'Enabled'}
                        </div>
                      </td>
                      <td className='d-flex justify-content-center'>
                        <button className='btn btn-success me-1' type='button' onClick={() => handleEditClick(driver.id)}>Edit</button>
                        <button className='btn btn-danger' type='button' onClick={() => handleDelete(driver.id)} >Delete</button>
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
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img className='image' src={selectedImage} alt="Enlarged Img"/>
          </div>
        </div>
      )}
      {showEdit && (
        <div className="modal1" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={EditcloseModal}>&times;</span>
            <EditDriverDoc onClose={EditcloseModal} driverId={selectedDriverId} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Drivers;