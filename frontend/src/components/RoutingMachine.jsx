import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';

const RoutineMachine = ({ originCoords, destinationCoords, map }) => {
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    if (!map || !originCoords || !destinationCoords) return;

    const control = L.Routing.control({
      waypoints: [
        L.latLng(originCoords.lat, originCoords.lon),
        L.latLng(destinationCoords.lat, destinationCoords.lon)
      ],
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.6, weight: 4 }]
      },
      zoomControl: false,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
      createMarker: () => null,
      reverseWaypoints: false,
    }).addTo(map); 

    control.on('routesfound', (e) => {
      const route = e.routes[0];
      const distance = route.summary.totalDistance;
      const speed = 30; // Example speed
      const time = (distance / 1000) / speed * 60;

      // Convert time to hours and minutes
      const hours = Math.floor(time / 60);
      const minutes = Math.round(time % 60);

      // Calculate fare
      const distanceInKm = distance / 1000;
      const farePerKm = 20; // Example fare per km
      const totalFare = (distanceInKm * farePerKm).toFixed(2);

      const newRouteData = {
        distance: `${(distanceInKm).toFixed(1)}`,
        time: `${hours}h ${minutes}min`,
        fare: `${totalFare}`,
        origin: originCoords,
        destination: destinationCoords,
      };

      setRouteData(newRouteData);

      const bounds = L.latLngBounds(route.coordinates.map(coord => [coord.lat, coord.lng]));
      map.fitBounds(bounds);
    });

    return () => {
      console.log("Cleaning up routing control");
      if (control) {
        control.spliceWaypoints(0, control.getWaypoints().length); // Clear waypoints
        map.removeControl(control); 
      }
    };
  }, [map, originCoords, destinationCoords]);

  // Effect to save routeData to local storage whenever it changes
  useEffect(() => {
    if (routeData) {
      localStorage.setItem('routeData', JSON.stringify(routeData));
    }
  }, [routeData]);

  console.log(routeData);

  return null;
};

export default RoutineMachine;