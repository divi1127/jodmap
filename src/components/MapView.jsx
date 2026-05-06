import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapResizer({ selectedItem }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedItem) {
      map.flyTo([selectedItem.lat, selectedItem.lng], 15, {
        duration: 1.2
      });
    }
  }, [selectedItem, map]);

  return null;
}

const MapView = ({ items, selectedItem, onItemClick, completedItems }) => {
  const tamilNaduCenter = [11.1271, 78.6569];

  return (
    <MapContainer 
      center={tamilNaduCenter} 
      zoom={7} 
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      <MapResizer selectedItem={selectedItem} />

      <MarkerClusterGroup
        chunkedLoading
        showCoverageOnHover={false}
        spiderfyOnMaxZoom={true}
      >
        {items.map((item) => (
          <Marker 
            key={item.id} 
            position={[item.lat, item.lng]}
            icon={
              selectedItem?.id === item.id 
                ? redIcon 
                : (completedItems.includes(item.id) ? greenIcon : blueIcon)
            }
            eventHandlers={{
              click: () => onItemClick(item),
            }}
          >
            <Popup>
              <div className="min-w-[150px]">
                <h3 className="font-bold text-slate-900 border-b pb-1 mb-1">{item.Name}</h3>
                <p className="text-[11px] text-slate-600 mb-1 leading-tight">{item.Address}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                    completedItems.includes(item.id) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {completedItems.includes(item.id) ? 'Done' : 'Pending'}
                  </span>
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md font-bold uppercase">
                    {item.Category}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapView;
