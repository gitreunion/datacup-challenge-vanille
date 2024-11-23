"use client";
import React from "react";

export default function ModelExemple() {
  return (
    <>
      <h4 className="text-secondary font-semibold font-sans text-xl">
        Modèle du fichier d’importation
      </h4>
      <h3 className="text-gray-600 mt-6 font-sans text-md">
        La structure de votre fichier d’importation doit correspondre au modèle
        d’exemple. (csv, excel).
      </h3>
      <div className="mt-4 bg-gray-200 h-auto rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center bg-gray-300 rounded-tl-lg">
                num_voie
              </th>
              <th className="px-4 py-2 text-center bg-gray-300 ">cp_no_voie</th>
              <th className="px-4 py-2 text-center bg-gray-300">type_voie</th>
              <th className="px-4 py-2 text-center bg-gray-300 ">nom_voie</th>
              <th className="px-4 py-2 text-center bg-gray-300 ">
                code_postal
              </th>
              <th className="px-4 py-2 text-center bg-gray-300 ">
                nom_commune
              </th>
              <th className="px-4 py-2 text-center bg-gray-300 opacity-30">
                lat
              </th>
              <th className="px-4 py-2 text-center bg-gray-300 rounded-tr-lg opacity-30">
                long
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-center border-t border-gray-300">
                55
              </td>
              <td className="px-4 py-2 text-center border-gray-300">bis</td>
              <td className="px-4 py-2 text-center border-gray-300">Chemin</td>
              <td className="px-4 py-2 text-center border-gray-300">
                DES BARRIERES
              </td>
              <td className="px-4 py-2 text-center border-gray-300">97426</td>
              <td className="px-4 py-2 text-center border-t border-gray-300">
                Les Trois-Bassins
              </td>
              <td className="px-4 py-2 text-center border-t border-gray-300 opacity-30">
                45.555
              </td>
              <td className="px-4 py-2 text-center border-t border-gray-300 opacity-30">
                -5.555
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
