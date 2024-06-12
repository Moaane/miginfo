"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

export default function Map() {
  return (
    <MapContainer
      preferCanvas={true}
      center={[-6.571046633944176, 106.81366623227682]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "16rem", marginBottom: "3rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={[-6.571046633944176, 106.81366623227682]}
        fillColor="blue"
        fillOpacity={0.5}
        radius={10}
      >
        <Popup>
          This Marker icon is displayed correctly with{" "}
          <i>leaflet-defaulticon-compatibility</i>.
        </Popup>
      </CircleMarker>
    </MapContainer>
  );
}
