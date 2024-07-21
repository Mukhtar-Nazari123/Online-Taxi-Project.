import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';

const RoutineMachine = ({ originCoords, destinationCoords }) => {
  console.log('Origin Latitude:', originCoords.lat);
  console.log('Origin Longitude:', originCoords.lon);
  console.log('destination Latitude:', destinationCoords.lat);
  console.log('destination Longitude:', destinationCoords.lon);

  const instance = L.Routing.control({
    waypoints: [
      L.latLng(originCoords.lat, originCoords.lon),
      L.latLng(destinationCoords.lat, destinationCoords.lon)
    ],
    lineOptions: {
      styles: [{ color: "blue", opacity: 0.6, weight: 4 }]
    },
    zoomControl: true,
    initialView: {
      center: [originCoords.lat, originCoords.lon],
      zoom: 18,
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
    router: L.Routing.osrmv1({
      serviceUrl: 'https://router.project-osrm.org/route/v1',
    }),
    createMarker: function () {
      return null;
    },
    reverseWaypoints: false,

  });

  return instance;
};

const RoutingMachine = createControlComponent(RoutineMachine);

export default RoutingMachine;