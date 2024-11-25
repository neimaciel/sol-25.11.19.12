import React from 'react';
import Map, { Marker, Source, Layer, LineLayer } from 'react-map-gl';
import { MapPin } from 'lucide-react';

interface Location {
  city: string;
  state: string;
  coordinates?: [number, number];
}

interface RouteMapProps {
  origin: Location;
  destination: Location;
  stops?: Location[];
}

const defaultCoordinates = {
  'SP': [-46.6333, -23.5505],
  'RJ': [-43.1729, -22.9068],
  'MG': [-43.9346, -19.9208],
  'PR': [-49.2731, -25.4195],
  'SC': [-48.5482, -27.5945],
  'RS': [-51.2177, -30.0346],
  'BA': [-38.5108, -12.9714],
  'PE': [-34.8811, -8.0539],
  'CE': [-38.5433, -3.7172],
  'AM': [-60.0217, -3.1190],
  'PA': [-48.4902, -1.4558],
  'GO': [-49.2647, -16.6869],
  'DF': [-47.9292, -15.7801],
  'MT': [-56.0949, -15.5989],
  'MS': [-54.6462, -20.4428],
  'ES': [-40.3128, -20.3155]
};

const getCoordinatesForLocation = (location: Location): [number, number] => {
  if (location.coordinates) {
    return location.coordinates;
  }
  return defaultCoordinates[location.state as keyof typeof defaultCoordinates] || [-49.2731, -25.4195];
};

const lineLayer: LineLayer = {
  id: 'route',
  type: 'line',
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#3b82f6',
    'line-width': 3
  }
};

// Use import.meta.env instead of process.env for Vite
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2V5IiwibWFwYm94IjoidG9rZW4ifQ.example';

export default function RouteMap({ origin, destination, stops = [] }: RouteMapProps) {
  const originCoords = getCoordinatesForLocation(origin);
  const destCoords = getCoordinatesForLocation(destination);
  const stopCoords = stops.map(stop => getCoordinatesForLocation(stop));
  
  const allPoints = [originCoords, ...stopCoords, destCoords];
  
  const bounds = allPoints.reduce(
    (acc, point) => ({
      minLng: Math.min(acc.minLng, point[0]),
      maxLng: Math.max(acc.maxLng, point[0]),
      minLat: Math.min(acc.minLat, point[1]),
      maxLat: Math.max(acc.maxLat, point[1])
    }),
    {
      minLng: originCoords[0],
      maxLng: originCoords[0],
      minLat: originCoords[1],
      maxLat: originCoords[1]
    }
  );

  const viewport = {
    longitude: (bounds.minLng + bounds.maxLng) / 2,
    latitude: (bounds.minLat + bounds.maxLat) / 2,
    zoom: 5
  };

  const routeData = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: allPoints
    }
  };

  return (
    <Map
      {...viewport}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {allPoints.map((point, index) => (
        <Marker
          key={index}
          longitude={point[0]}
          latitude={point[1]}
        >
          <div className="text-blue-600">
            <MapPin className="h-6 w-6" />
          </div>
        </Marker>
      ))}

      <Source type="geojson" data={routeData}>
        <Layer {...lineLayer} />
      </Source>
    </Map>
  );
}