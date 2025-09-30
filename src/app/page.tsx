"use client";

import { useState, useEffect } from "react";
import { DatosBackend } from "@/types";
import { MateForm, ListaDiariaComponent, RankingComponent } from "@/components";

export default function Home() {
  const [datos, setDatos] = useState<DatosBackend | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const obtenerDatos = async () => {
    try {
      const response = await fetch("/api/mate");
      if (!response.ok) {
        throw new Error("Error al obtener los datos del servidor");
      }
      const data: DatosBackend = await response.json();
      setDatos(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const actualizarDatos = async (nombre: string, item: string) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/mate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, item }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al actualizar los datos");
      }

      const nuevosDatos: DatosBackend = await response.json();
      setDatos(nuevosDatos);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-4">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                obtenerDatos();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <span className="text-5xl">🧉</span>
            Organización de Mates
          </h1>
          <p className="text-gray-600">
            ¡Organicemos quién trae qué para el mate! (Ya arrelgé el sistema de
            puntos, ahora si suma bien)
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <MateForm onFormSubmit={actualizarDatos} loading={submitting} />
            {datos && <ListaDiariaComponent lista={datos.listaDiaria} />}
          </div>

          <div>{datos && <RankingComponent ranking={datos.ranking} />}</div>
        </div>

        {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
