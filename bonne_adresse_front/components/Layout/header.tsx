import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto py-4 flex flex-row items-center justify-between">
        <Link href="/">
          {/* Logo SVG */}
          <Image
            src="/src/logo/logo-la-bonne-adresse.svg"
            alt="La Bonne Adresse"
            width={250}
            height={250}
            className="mr-3"
          />
        </Link>
        <Link href="/teams">
          {/* Logo SVG */}
          <span className="text-1xl font-bold font-heading bg-primary text-primary-foreground rounded-md px-6 py-2 hover:bg-primary/80">
            La Teams
          </span>
        </Link>
      </div>
    </header>
  );
}
