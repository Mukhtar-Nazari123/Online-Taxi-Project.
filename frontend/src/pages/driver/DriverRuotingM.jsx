import L from "leaflet";
import { useEffect } from "react";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';

const DriverRuotingM = ({ originCoords, destinationCoords, map }) => {
  console.log("destination", destinationCoords);
  console.log("user Location", originCoords);

  useEffect(() => {
    if (!map || !originCoords || !destinationCoords) return;

    const control = L.Routing.control({
      waypoints: [
        L.latLng(
            Array.isArray(originCoords) ? originCoords[0] : originCoords.lat,
            Array.isArray(originCoords) ? originCoords[1] : originCoords.lon
          ),
          L.latLng(
            Array.isArray(destinationCoords) ? destinationCoords[0] : destinationCoords.lat,
            Array.isArray(destinationCoords) ? destinationCoords[1] : destinationCoords.lon
          ),
      ],
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.6, weight: 4 }]
      },
      zoomControl: false,
      addWaypoints: true,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: true,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
      createMarker: () => null,
      reverseWaypoints: false,
    }).addTo(map); 

    control.on('routesfound', (e) => {
      const route = e.routes[0];
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

  return null;
};

export default DriverRuotingM;