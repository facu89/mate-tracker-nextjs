"use client";

import React from "react";
import { ListaDiaria } from "@/types";

interface ListaDiariaProps {
  lista: ListaDiaria;
}

const ListaDiariaComponent: React.FC<ListaDiariaProps> = ({ lista }) => {
  const personasApuntadas = Object.keys(lista);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>📝</span>
        Lista de hoy
      </h2>
      {personasApuntadas.length > 0 ? (
        <div className="space-y-4">
          {personasApuntadas.map((nombre) => (
            <div key={nombre} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                {nombre} lleva:
              </h3>
              <div className="flex flex-wrap gap-2">
                {lista[nombre].map((item, index) => (
                  <span
                    key={`${nombre}-${item}-${index}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          Aún nadie se ha apuntado. ¡Sé el primero! 😉
        </p>
      )}
    </div>
  );
};

export default ListaDiariaComponent;
