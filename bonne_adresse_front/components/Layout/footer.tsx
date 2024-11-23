import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-secondary py-3">
      <div className="container flex justify-between items-center">
        <p className="text-secondary-foreground text-sm">
          © Vanille 2024 © - Votre solution de validation d’adresse
        </p>
        {/* Conteneur pour les logos */}
        <div className="flex justify-end">
          {/* Remplacer les sources d'images par vos logos */}
          <Image
            src="/src/logo/logo_ue.png"
            alt="Logo union européenne"
            className="mx-4"
            width={50}
            height={50}
          />
          <Image
            src="/src/logo/region.jpg"
            alt="Logo Région Réunion"
            className="mx-4"
            width={50}
            height={50}
          />
          <Image
            src="/src/logo/logo-feder-reunion.jpg"
            alt="Logo Féder Reunion"
            className="mx-4"
            width={50}
            height={50}
          />
        </div>
      </div>
    </footer>
  );
}
