"use client";

import { useState } from "react";
import { DepartamentoData } from "@/lib/types";
import { COLOMBIA_MAP, SVG_TO_DB_CODE } from "@/lib/colombiaMapData";

interface ColombiaMapProps {
  departamentos: DepartamentoData[];
  selectedDepartamento: string | null;
  onSelectDepartamento: (id: string | null) => void;
}

export default function ColombiaMap({
  departamentos,
  selectedDepartamento,
  onSelectDepartamento,
}: ColombiaMapProps) {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  // Create a map from code to departamento for quick lookup
  const deptByCode = departamentos.reduce((acc, dept) => {
    acc[dept.code] = dept;
    return acc;
  }, {} as Record<string, DepartamentoData>);

  const getDeptFromSvgId = (svgId: string): DepartamentoData | null => {
    const code = SVG_TO_DB_CODE[svgId];
    return code ? deptByCode[code] || null : null;
  };

  const handlePathClick = (svgId: string) => {
    const dept = getDeptFromSvgId(svgId);
    if (dept) {
      onSelectDepartamento(selectedDepartamento === dept.id ? null : dept.id);
    }
  };

  const getPathFill = (svgId: string): string => {
    const dept = getDeptFromSvgId(svgId);
    if (!dept) return "#d1d5db";

    if (selectedDepartamento === dept.id) return "#f59e0b";
    if (hoveredDept === svgId) return "#fbbf24";

    const count = dept._count.dichos;
    if (count === 0) return "#e5e7eb";
    if (count < 5) return "#86efac";
    if (count < 10) return "#4ade80";
    return "#22c55e";
  };

  const hoveredDeptData = hoveredDept ? getDeptFromSvgId(hoveredDept) : null;

  return (
    <div className="space-y-4">
      {/* Map */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 relative">
        {/* Tooltip */}
        {hoveredDept && (
          <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 pointer-events-none">
            {hoveredDeptData
              ? `${hoveredDeptData.name} — ${hoveredDeptData._count.dichos} dichos`
              : COLOMBIA_MAP.locations.find((l) => l.id === hoveredDept)?.name}
          </div>
        )}

        <svg
          viewBox={COLOMBIA_MAP.viewBox}
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Mapa de Colombia"
        >
          <g>
            {COLOMBIA_MAP.locations.map((loc) => (
              <path
                key={loc.id}
                id={loc.id}
                d={loc.path}
                fill={getPathFill(loc.id)}
                stroke="#ffffff"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cursor-pointer transition-colors duration-150"
                onClick={() => handlePathClick(loc.id)}
                onMouseEnter={() => setHoveredDept(loc.id)}
                onMouseLeave={() => setHoveredDept(null)}
              >
                <title>{loc.name}</title>
              </path>
            ))}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-gray-200"></div>
          <span className="text-gray-600">Sin dichos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#86efac" }}></div>
          <span className="text-gray-600">1-4 dichos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#4ade80" }}></div>
          <span className="text-gray-600">5-9 dichos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#22c55e" }}></div>
          <span className="text-gray-600">10+ dichos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#f59e0b" }}></div>
          <span className="text-gray-600">Seleccionado</span>
        </div>
      </div>
    </div>
  );
}
