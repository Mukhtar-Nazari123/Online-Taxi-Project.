import React, { useEffect, useState } from 'react';
import "./passengers.css";
import SearchBar from './SearchBar';
import axios from 'axios';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/admin/messages', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessages(response.data.data); // Adjust to match your API response structure
      } catch (error) {
        console.error('Error fetching messages:', error);
        alert('Failed to fetch messages. Please try again later.');
      }
    };
    fetchMessages();
  }, []);

  const handleDelete = (messageId) => {
    const confirmDelete = window.confirm(`Do you want to delete this message?`);

    if (confirmDelete) {
      axios.delete(`api/admin/deleteMessage/${messageId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        setMessages(messages.filter(message => message.id !== messageId));
        alert('Message deleted successfully!');
      })
      .catch(error => {
        console.error(error);
        alert('Something went wrong while deleting the message. Please try again later.');
      });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredMessages = messages.filter(message => 
    message.trip.driver.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.text.toLowerCase().includes(searchQuery.toLowerCase())
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
              <caption className='text-white fs-3'>Messages</caption>
              <thead>
                <tr>
                  <th className='th' scope="col">Id</th>
                  <th className='th' scope="col">Driver Name</th>
                  <th className='th' scope="col">Text</th>
                  <th className='th' scope="col">Rating</th>
                  <th className='update' scope="col">Option</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.length ? (
                  filteredMessages.map((message) => (
                    <tr key={message.id}>
                      <th scope="row">{message.id}</th>
                      <td>{message.trip.driver.user.name}</td>
                      <td>{message.text}</td>
                      <td>{message.rating}</td>
                      <td className='d-flex justify-content-center'>
                        <button className='btn btn-danger' type='button' onClick={() => handleDelete(message.id)}>Delete</button>
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

export default Messages;