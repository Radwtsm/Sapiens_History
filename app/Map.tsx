'use client';

import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Polyline } from "react-leaflet";
import L from "leaflet";

type MapProps = {
  selectedEvent: { position?: [number, number]; content?: string; path?: [number, number][] } | null;
};

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
      style={{ height: "50vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selectedEvent?.path && <Polyline positions={selectedEvent.path} color="red" />}

      {selectedEvent?.position && (
        <Marker position={selectedEvent.position}>
          <Popup>{selectedEvent.content}</Popup>
        </Marker>
      )}

      <FitBounds event={selectedEvent} />
    </MapContainer>
  );
}
