import { useEffect, useCallback } from 'react';
import axios from 'axios';

function GetDriverLocation({ status }) {
    const driverId = localStorage.getItem('driver_id');

    const sendLocationToDatabase = useCallback(async (lat, long, currentStatus) => {
        try {
            const payload = {
                latitude: lat,
                longitude: long,
                status: currentStatus ? 'on' : 'off',
            };

            await axios.post(`/api/driver/${driverId}/location`, payload, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
        } catch (error) {
            console.error('Error updating location:', error.response?.data || error.message);
        }
    }, [driverId]);  // Include driverId in dependencies

    const getUserLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    sendLocationToDatabase(lat, long, status);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, [sendLocationToDatabase, status]);

    const updateStatusToOffline = useCallback(() => {
        if (status) {
            sendLocationToDatabase(0, 0, false); // Update status to 'off'
        }
    }, [sendLocationToDatabase, status]);

    useEffect(() => {
        getUserLocation();

        let intervalId;
        if (status) {
            intervalId = setInterval(() => {
                getUserLocation();
            }, 60000);
        }

        
        window.addEventListener('offline', updateStatusToOffline);
        window.addEventListener('online', getUserLocation);

        const handleBeforeUnload = (event) => {
            updateStatusToOffline();
            event.preventDefault();
            return true;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearInterval(intervalId); // Cleanup on unmount
            window.removeEventListener('offline', updateStatusToOffline);
            window.removeEventListener('online', getUserLocation);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [status, getUserLocation, updateStatusToOffline]);

    return null;
}

export default GetDriverLocation;