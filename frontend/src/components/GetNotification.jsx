// src/components/NotificationComponent.jsx

import React, { useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios'; // Import Axios

const GetNotification = () => {
    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('74ac6032e10154762e2c', {
            cluster: 'ap2',
        });
        console.log('loooooooooooooo')

        const channel = pusher.subscribe('my-channel');

        channel.bind('MyEvent', (data) => {
            console.log('Event received:', data);
            alert(`Received notification: ${data.message}`);
        });

        return () => {
            pusher.unsubscribe('my-channel');
        };
    }, []);

    const sendNotification = () => {
        axios.get('/api/notifications')
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