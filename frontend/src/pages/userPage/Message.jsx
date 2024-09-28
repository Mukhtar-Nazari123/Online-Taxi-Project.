import React, { useState } from 'react';
import axios from 'axios';
import './message.css';

const Message = ({ tripId, show, handleClose }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!show) return null;

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || rating === 0) return;

    const newMessage = {
      text: inputMessage,
      rating: rating,
      trip_id: tripId,
    };

    try {
      const response = await axios.post(`/api/trip/message/${tripId}`, newMessage);
      console.log('Message saved:', response.data);
      setSuccessMessage('Your message saved successfully!');
      setInputMessage('');
      setRating(0);
      setErrorMessage('');
    } catch (error) {
      console.error('Error saving message:', error);
      setErrorMessage('Failed to save message. Please try again.');
      setSuccessMessage('');
    }

    setInputMessage('');
    setRating(0);
  };

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="chat-container col-8 col-lg-4 col-sm-6">
      <div className="close-Btnnn" onClick={handleClose}>
          &times;
      </div>
      <div className="chat-header">
        <h2 className="text-center">How Was Your Trip?</h2>
      </div>
      <div className="p-3">      
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="mb-3">
          <label htmlFor="rating" className="form-label fs-2">Rate your driver:</label>
          <div className="rating-stars fs-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'active' : ''}`}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="input-group mb-3">
          <textarea
            className="form-control"
            placeholder="Type your message..."
            rows="2"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            required
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;