"use client";

import React from "react";
import { Ranking } from "@/types";

interface RankingProps {
  ranking: Ranking;
}

const RankingComponent: React.FC<RankingProps> = ({ ranking }) => {
  const rankingArray = Object.entries(ranking).sort(([, a], [, b]) => b - a);

  const getMedal = (index: number) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "🏅";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>🏆</span>
        Ranking de Puntos
      </h2>
      <h3> (Ya arrelgé el sistema de puntos, ahora si suma bien)</h3>
      <div className="space-y-3">
        {rankingArray.map(([nombre, puntos], index) => (
          <div
            key={nombre}
            className={`flex items-center justify-between p-4 rounded-lg ${
              index === 0
                ? "bg-yellow-50 border-2 border-yellow-200"
                : index === 1
                ? "bg-gray-50 border-2 border-gray-200"
                : index === 2
                ? "bg-orange-50 border-2 border-orange-200"
                : "bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getMedal(index)}</span>
              <div>
                <span className="font-semibold text-gray-800">{nombre}</span>
                <div className="text-sm text-gray-500">
                  Posición #{index + 1}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-800">{puntos}</div>
              <div className="text-sm text-gray-500">
                {puntos === 1 ? "punto" : "puntos"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingComponent;
