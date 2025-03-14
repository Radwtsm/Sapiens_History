import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, GeoJSON } from "react-leaflet";
import L, { Icon, GeoJSON as LeafletGeoJSON } from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJsonObject } from "geojson";


type MapProps = {
  selectedEvent: { 
    position?: [number, number]; 
    content?: string; 
    path?: [number, number][]; 
    date?: string;
  } | null;
};

const geojsonData: GeoJsonObject = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Ancient City" },
      "geometry": {
        "type": "Point",
        "coordinates": [31.8700, 35.4433] // Example: Jericho
      }
    },
    {
      "type": "Feature",
      "properties": { "name": "Migration Path" },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-100.0, 40.0], 
          [-105.0, 45.0], 
          [-110.0, 50.0]
        ]
      }
    }
  ]
} as GeoJsonObject;


const FitBounds = ({ event }: { event: MapProps["selectedEvent"] }) => {
  const map = useMap();

  useEffect(() => {
    if (!event) return;
    
    if (event.path && event.path.length > 0) {
      const bounds = L.latLngBounds(event.path);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (event.position) {
      map.setView(event.position, 8, { animate: true });
    }
  }, [event, map]);

  return null;
};

export default function Map({ selectedEvent }: MapProps) {
  return (
    <MapContainer
      center={selectedEvent?.position || [51.505, -0.09]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Add GeoJSON Layer */}
      <GeoJSON 
        data={geojsonData} 
        style={() => ({ color: "blue", weight: 2 })} 
        pointToLayer={(feature, latlng) => 
          L.marker(latlng, {
            icon: new Icon({ iconUrl: '/marker-icon.png', iconSize: [25, 41] })
          }).bindPopup(feature.properties.name)
        }
      />

      {/* Draw Migration Path */}
      {selectedEvent?.path && <Polyline positions={selectedEvent.path} color="red" />}

      {selectedEvent?.position && (
        <Marker icon={new Icon({ iconUrl: '/marker-icon.png', iconSize: [25, 41] })} position={selectedEvent.position}>
          <Popup>{selectedEvent.content}</Popup>
        </Marker>
      )}

      <FitBounds event={selectedEvent} />
    </MapContainer>
  );
}
