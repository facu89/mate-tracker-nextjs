// src/lib/mockData.ts

import { DatosBackend } from "@/types";

export const mockData: DatosBackend = {
  listaDiaria: {
    Facundo: ["Mate", "Yerba"],
    Ana: ["Termo"],
  },
  ranking: {
    Facundo: 2,
    Mateo: 0,
    Ana: 1,
    Axel: 0,
  },
};
