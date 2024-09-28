import React, { useState, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import UserCenterMapButton from "../userPage/UserCenterMapButton"
import DriverRuotingM from "./DriverRuotingM";
import axios from "axios";

const iconO = L.divIcon({
  html: '<i class="bi bi-geo-alt-fill fs-3 text-primary"></i>',
  className: "custom-marker-icon",
});

const iconD = L.divIcon({
  html: '<i class="bi bi-geo-alt-fill fs-3 text-danger"></i>',
  className: "custom-marker-icon",
});

const DriverMap = ({destinationCoords, destinationCoords1, isDisabled }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const mapRef = useRef(null);
  const tripId = localStorage.getItem('trip_id')
  const [buttonText, setButtonText] = useState('Start Trip');
  const [successMessage, setSuccessMessage] = useState('');
  

  console.log(tripId)
  // Initialize origin and destination only once
  useEffect(() => {
    setOrigin(userLocation);
    setDestination(destinationCoords);
  }, [userLocation, destinationCoords]);


  const startTrip = async () => {
    if (destinationCoords && destinationCoords1) {
      setOrigin(destinationCoords);
      setDestination(destinationCoords1);
      setButtonText('Completed');
 
      try {
        const response = await axios.post(`/api/trip/start/${tripId}`, {
          
        });
        setSuccessMessage(response.data.message);
        console.log('Trip started successfully:', response.data);
      } catch (error) {
        console.error('Error starting trip:', error);
      }
    }
  };

  const handleCompletedClick = async () => {
    if (buttonText === 'Completed') {
      try {
        const response = await axios.post(`/api/trip/complete/${tripId}`, {
          message: 'Trip completed successfully',
        });
        setSuccessMessage(response.data.message);
        console.log('Trip completed successfully:', response.data);
      } catch (error) {
        console.error('Error completing trip:', error);
      }
    }
  };


  // Get current position of user
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = [
              position.coords.latitude,
              position.coords.longitude,
            ];
            setUserLocation(userLocation);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);

  // Center the map on user position
  const centerMapOnUser = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo(userLocation, 17);
    }
  };

  const position = userLocation || [34.509904, 69.064005];
  const zoom_level = 17;



  return (
    <div>
      <MapContainer
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        ref={mapRef}
        className="userMap"
        center={position}
        zoom={zoom_level}
        scrollWheelZoom={true}
        rotate={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <Marker position={userLocation} icon={iconO}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}

        {origin && origin.lat !== undefined && origin.lon !== undefined && (
          <Marker
          title="origin"
            position={[origin.lat, origin.lon]}
            icon={iconO}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const position = marker.getLatLng();
                setOrigin({ lat: position.lat, lon: position.lng });
              },
            }}
          >
            <Popup>Origin</Popup>
          </Marker>
        )}

        {destination && destination.lat !== undefined && destination.lon !== undefined && (
          <Marker
            title="destination"
            position={[destination.lat, destination.lon]}
            icon={iconD}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const position = marker.getLatLng();
                setDestination({ lat: position.lat, lon: position.lng });
              },
            }}
          >
            <Popup>Destination</Popup>
          </Marker>
        )}

        {destination && origin && mapRef.current && (
          <DriverRuotingM
            originCoords={origin}
            destinationCoords={destination}
            map={mapRef.current}
          />
        )}

        <UserCenterMapButton onCenterMap={centerMapOnUser} />
        <div style={{ display: "flex", position: "relative", top: "10px", left: "60px", zIndex: "1000" }}>
          <button style={{height: '30px', width: '70px', borderRadius: '5px'}}
          onClick={buttonText === 'Completed' ? handleCompletedClick : startTrip}
          className="start-trip-button bg-primary" disabled={isDisabled}>
            {buttonText}
          </button>
        </div>
        {successMessage && <p className="text-success fs-3" style={{
        display: "flex", 
        position: "relative", 
        margin: "0px",
        top: "-30px", 
        left: "300px", 
        zIndex: "1000" }}>{successMessage}</p>}
      </MapContainer>
    </div>
  );
};

export default DriverMap;