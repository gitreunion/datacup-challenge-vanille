"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { AddressMap } from "@/lib/type";
import Skeleton from "react-loading-skeleton";

const blueIcon = L.divIcon({
  className: "custom-marker", // Classe CSS personnalisée
  iconSize: [6, 6], // Taille du point
  iconAnchor: [5, 5], // Position du centre du point
});

export default function ResultMap({
  addressMap,
}: {
  addressMap: AddressMap[];
}) {
  const [isMapReady, setIsMapReady] = useState(false);

  // Le useEffect pour simuler l'initialisation de la carte
  useEffect(() => {
    // Simule un délai d'attente pour la carte (par exemple, chargement de la carte ou des données)
    const timer = setTimeout(() => {
      setIsMapReady(true); // Marque la carte comme prête après 3 secondes
    }, 3000); // 3 secondes de délai simulé

    return () => clearTimeout(timer); // Nettoyer le timer lorsqu'on quitte le composant
  }, []);

  return (
    <div style={{ height: "500px", width: "90%" }}>
      {/* Afficher le Skeleton avant que la carte soit prête */}
      {!isMapReady ? (
        <Skeleton
          height="100%"
          width="100%"
          className="rounded-md shadow-md bg-white block"
        />
      ) : (
        <MapContainer
          center={[-21.1151, 55.5364]} // Coordonnées initiales
          zoom={10} // Niveau de zoom initial
          style={{ height: "100%", width: "100%" }}
          className="rounded-md shadow-md"
          whenReady={() => setIsMapReady(true)} // Définir l'état à true lorsque la carte est prête
        >
          <TileLayer
            url="http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="https://maps.google.com">Google Maps</a>'
          />
          {/* Ajout des marqueurs */}
          {addressMap &&
            addressMap.length > 0 &&
            addressMap.map((point, index) => (
              <Marker
                key={index}
                position={[point.lat, point.long]}
                icon={blueIcon}>
                <Popup>
                  Latitude: {point.lat} <br />
                  Longitude: {point.long}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      )}
    </div>
  );
}
