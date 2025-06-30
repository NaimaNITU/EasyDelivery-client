import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import districData from "../assets/warehouses.json";
import { useRef } from "react";

const Coverage = () => {
  const markerRef = useRef();
  return (
    <div className="p-6 bg-white">
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>

      <div className="h-[600px] w-full">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {districData.map((area, index) => {
            return (
              <Marker
                key={index}
                position={[area.latitude, area.longitude]}
                ref={markerRef}
                eventHandlers={{
                  mouseover: () => markerRef.current.openPopup(),
                  mouseout: () => markerRef.current.closePopup(),
                }}
              >
                <Popup>
                  <strong>{area.district}</strong>
                  <br />
                  <span>Areas: {area.covered_area.join(", ")}</span>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
