import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../utils/fixLeafletIcon";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const [districts, setDistricts] = useState([]);

  // Fetch JSON from public folder
  useEffect(() => {
    fetch("/public/data/warehouses.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  return (
    <div className="p-6 bg-white">
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>

      {/* Search Box (future feature) */}
      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="Search district..."
          className="border px-4 py-2 rounded-md w-full max-w-md"
        />
      </div>

      <div className="h-[600px] w-full">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full rounded-md shadow"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Loop through loaded districts */}
          {districts.map((district, index) => (
            <Marker
              key={index}
              position={[district.latitude, district.longitude]}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{district.district}</strong>
                  <br />
                  <span className="text-gray-600">Region:</span>{" "}
                  {district.region}
                  <br />
                  <span className="text-gray-600">City:</span> {district.city}
                  <br />
                  <span className="text-gray-600">Covered Areas:</span>
                  <ul className="list-disc list-inside">
                    {district.covered_area.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                  <br />
                  <a
                    href={district.flowchart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Flowchart
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
