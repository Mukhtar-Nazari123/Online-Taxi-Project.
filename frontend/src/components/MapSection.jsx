import React, { useState, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./mapSection.css";
import UserCenterMapButton from "../pages/userPage/UserCenterMapButton";
import RoutingMachine from "./RoutingMachine";

const iconO = L.divIcon({
  html: '<i class="bi bi-geo-alt-fill fs-3 text-primary"></i>',
  className: "custom-marker-icon",
});

const iconD = L.divIcon({
  html: '<i class="bi bi-geo-alt-fill fs-3 text-danger"></i>',
  className: "custom-marker-icon",
});

const MapSection = ({ originCoords, destinationCoords }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const mapRef = useRef(null);

  // Initialize origin and destination only once
  useEffect(() => {
    setOrigin(originCoords);
    setDestination(destinationCoords);
  }, [originCoords, destinationCoords]);

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

        {origin && destination && mapRef.current && (
          <RoutingMachine
            originCoords={origin}
            destinationCoords={destination}
            map={mapRef.current}
          />
        )}
        <UserCenterMapButton onCenterMap={centerMapOnUser} />
      </MapContainer>
    </div>
  );
};

export default MapSection;