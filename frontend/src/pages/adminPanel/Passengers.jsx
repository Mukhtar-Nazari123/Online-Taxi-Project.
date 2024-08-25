import React, { useEffect, useState } from 'react';
import "./passengers.css";
import SearchBar from './SearchBar';
import axios from 'axios';

function Passengers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm(`Do you want to delete the user account?`);

    if (confirmDelete) {
      axios.delete(`/api/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        setUsers(users.filter(user => user.id !== userId));
        alert('User account deleted successfully!');
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

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone_number.includes(searchQuery)
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
            <table className="passengerTable table caption-top table-hover fs-4">
              <caption className='text-white fs-3'>Passengers</caption>
              <thead>
                <tr>
                  <th className='th' scope="col">Id</th>
                  <th className='th' scope="col">Name</th>
                  <th className='th' scope="col">Email</th>
                  <th className='th' scope="col">Phone</th>
                  <th className='update' scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length ? (
                  filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <th scope="row">{user.id}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone_number}</td>
                      <td className='d-flex justify-content-center'>
                        <button className='btn btn-success me-1' type='button'>Edit</button>
                        <button className='btn btn-danger' type='button' onClick={() => handleDelete(user.id)}>Delete</button>
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

export default Passengers;