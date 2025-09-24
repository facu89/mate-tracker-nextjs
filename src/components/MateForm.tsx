"use client";

import React, { useState } from "react";

interface MateFormProps {
  onFormSubmit: (nombre: string, item: string) => void;
  loading?: boolean;
}

const MateForm: React.FC<MateFormProps> = ({
  onFormSubmit,
  loading = false,
}) => {
  const [nombre, setNombre] = useState<string>("");
  const [item, setItem] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nombre && item && !loading) {
      onFormSubmit(nombre, item);
      setItem(""); // Reseteamos la selección del item después de enviar
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            ¿Quién sos?
          </label>
          <select
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="">Seleccioná tu nombre</option>
            <option value="Facundo">Facundo</option>
            <option value="Mateo">Mateo</option>
            <option value="Ana">Ana</option>
            <option value="Axel">Axel</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="item"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            ¿Qué vas a llevar?
          </label>
          <select
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="">Seleccioná un item</option>
            <option value="Mate">Mate 🧉</option>
            <option value="Yerba">Yerba 🌿</option>
            <option value="Termo">Termo 🌡️</option>
            <option value="Comida">Comida 🥪</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!nombre || !item || loading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default MateForm;
