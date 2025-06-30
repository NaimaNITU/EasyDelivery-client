import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import deliveryData from "../assets/warehouses.json";

// Custom hook to move the map
const MapFlyTo = ({ position }) => {
  const map = useMap();
  if (position) {
    map.setView(position, 10); // Zoom to the searched district
  }
  return null;
};

const BangladeshMap = () => {
  const [search, setSearch] = useState("");
  const [found, setFound] = useState(null);
  const markerRefs = useRef([]);

  const handleSearch = () => {
    const query = search.toLowerCase();
    const match = deliveryData.find(
      (item) =>
        item.district.toLowerCase().includes(query) ||
        item.covered_area.some((area) => area.toLowerCase().includes(query))
    );

    if (match) {
      const index = deliveryData.indexOf(match);
      setFound([match.latitude, match.longitude]);
      const marker = markerRefs.current[index];
      if (marker) {
        marker.openPopup();
      }
    } else {
      alert("No match found");
    }
  };

  return (
    <div className="w-full">
      {/* Search Box */}
      <div className="flex items-center gap-2 mt-10 mb-4 px-4">
        <input
          type="text"
          placeholder="Search by district or area"
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary text-black">
          Search
        </button>
      </div>

      {/* Map */}
      <div className="h-[600px] w-full">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Fly to result location */}
          {found && <MapFlyTo position={found} />}

          {/* All District Markers */}
          {deliveryData.map((area, index) => (
            <Marker
              key={index}
              position={[area.latitude, area.longitude]}
              ref={(el) => (markerRefs.current[index] = el)}
              eventHandlers={{
                mouseover: () => markerRefs.current[index].openPopup(),
                mouseout: () => markerRefs.current[index].closePopup(),
              }}
            >
              <Popup>
                <strong>{area.district}</strong>
                <br />
                Areas: {area.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
