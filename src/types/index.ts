// src/types/index.ts

export interface ListaDiaria {
  [nombre: string]: string[];
}

export interface Ranking {
  [nombre: string]: number;
}

export interface DatosBackend {
  listaDiaria: ListaDiaria;
  ranking: Ranking;
}

export interface MateEntry {
  id: number;
  nombre: string;
  item: string;
  fecha: string;
  created_at: string;
}

export interface User {
  id: number;
  nombre: string;
  puntos: number;
  created_at: string;
  updated_at: string;
}
