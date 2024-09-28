// src/components/NotificationComponent.jsx

import React, { useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios'; // Import Axios

const GetNotification = () => {
    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('9a70a9abd2a13265d9c3', {
            cluster: 'ap1',
        });

        const channel = pusher.subscribe('my-channel');

        // Bind to the event
        channel.bind('MyEvent', (data) => {
            console.log('Event received:', data);
            alert(`Received notification: ${data.message}`); // Use data.message to display the message
        });

        // Cleanup on component unmount
        return () => {
            pusher.unsubscribe('my-channel');
        };
    }, []);

    const sendNotification = () => {
        axios.post('/api/notifications')
            .then(response => {
                console.log(response.data); // Log the response data
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h1>Public Notifications</h1>
            <button onClick={sendNotification}>Send Notification</button>
        </div>
    );
};

export default GetNotification;