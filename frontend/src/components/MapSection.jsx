import React, { useState, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
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

const kabulProvinceBoundary = [
  [35.0015, 69.1264],
  [34.8419, 69.5577],
  [34.6138, 69.7114],
  [34.4183, 69.5837],
  [34.2417, 69.1876],
  [34.1869, 68.8594],
  [34.3712, 68.5946],
  [34.6243, 68.5134],
  [34.8752, 68.7273],
  [35.0015, 69.1264],
];

const MapSection = ({ originCoords, destinationCoords }) => {
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);
  const kabulPolygon = useRef(null);

  //get current position of user when click on button
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

  //center the on user position
  const centerMapOnUser = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo(userLocation, 17);
    }
  };

  // Filter out any coordinates that are not within the valid range
  const isWithinBounds = (lat, lon) => {
    return lat >= 33.8532 && lat <= 35.3614 && lon >= 68.0603 && lon <= 70.5081;
  };
  const validBoundary = kabulProvinceBoundary.filter(([lat, lon]) =>
    isWithinBounds(lat, lon)
  );

  const position = userLocation || [34.509904, 69.064005];
  const zoom_level = 17;
  return (
    <div>
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
          <Polygon
            ref={kabulPolygon}
            positions={validBoundary}
            color="white"
            fillColor="lightblue"
            weight={1}
          />
          {userLocation && (
            <Marker position={userLocation} icon={iconO}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )}

          {originCoords &&
            originCoords.lat !== undefined &&
            originCoords.lon !== undefined && (
              <Marker
                position={[originCoords.lat, originCoords.lon]}
                icon={iconO}
              >
                <Popup>Origin</Popup>
              </Marker>
            )}

          {destinationCoords &&
            destinationCoords.lat !== undefined &&
            destinationCoords.lon !== undefined && (
              <Marker
                position={[destinationCoords.lat, destinationCoords.lon]}
                icon={iconD}
              >
                <Popup>Destination</Popup>
              </Marker>
            )}
          {destinationCoords &&
            destinationCoords.lat !== undefined &&
            destinationCoords.lon !== undefined && (
              <RoutingMachine
                originCoords={originCoords}
                destinationCoords={destinationCoords}
                map={mapRef.current}
              />
            )}
          <UserCenterMapButton onCenterMap={centerMapOnUser} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapSection;
