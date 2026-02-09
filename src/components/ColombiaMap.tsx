"use client";

import { DepartamentoData } from "@/lib/types";

interface ColombiaMapProps {
  departamentos: DepartamentoData[];
  selectedDepartamento: string | null;
  onSelectDepartamento: (id: string | null) => void;
}

// Mapping from SVG department IDs to database department codes
const SVG_TO_DB_CODE: Record<string, string> = {
  "CONAR": "NAR", // Nariño
  "COPUT": "PUT", // Putumayo
  "COCHO": "CHO", // Chocó
  "COGUA": "GUA", // Guainía
  "COVAU": "VAU", // Vaupés
  "COAMA": "AMA", // Amazonas
  "COLAG": "LAG", // La Guajira
  "COCES": "CES", // Cesar
  "CONSA": "NSA", // Norte de Santander
  "COARA": "ARA", // Arauca
};

export default function ColombiaMap({
  departamentos,
  selectedDepartamento,
  onSelectDepartamento,
}: ColombiaMapProps) {
  // Create a map from code to departamento for quick lookup
  const deptByCode = departamentos.reduce((acc, dept) => {
    acc[dept.code] = dept;
    return acc;
  }, {} as Record<string, DepartamentoData>);

  const getDepartamentoFromSvgId = (svgId: string): DepartamentoData | null => {
    const code = SVG_TO_DB_CODE[svgId];
    return code ? deptByCode[code] || null : null;
  };

  const handlePathClick = (svgId: string) => {
    const dept = getDepartamentoFromSvgId(svgId);
    if (dept) {
      onSelectDepartamento(selectedDepartamento === dept.id ? null : dept.id);
    }
  };

  const getPathFill = (svgId: string): string => {
    const dept = getDepartamentoFromSvgId(svgId);
    if (!dept) return "#6f9c76"; // Default SVG color

    if (selectedDepartamento === dept.id) {
      return "#f59e0b"; // Amber for selected
    }

    const count = dept._count.dichos;
    if (count === 0) return "#e5e7eb"; // Gray for no dichos
    if (count < 5) return "#86efac"; // Light green
    if (count < 10) return "#4ade80"; // Medium green
    return "#22c55e"; // Dark green for many dichos
  };

  const getPathOpacity = (svgId: string): number => {
    const dept = getDepartamentoFromSvgId(svgId);
    if (!dept) return 0.3; // Low opacity for departments without data
    return selectedDepartamento === dept.id ? 1 : 0.8;
  };

  return (
    <div className="space-y-4">
      {/* Map */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="features">
            {/* Nariño */}
            <path
              id="CONAR"
              d="M308.8 605.6l4.6 3.1 1.5 1.6 0.1 1 0.3 1.1 0.6 1.8 0.1 0.6 0 0.5-0.2 0.6-0.6 1.8-0.1 0.4 0 0.5 0.1 0.5 0.8 2 3.7 5.3 0.1 0.5 0.2 1.7 0.2 0.4 0.5 0.5 1.4 0.6 1.6 0.4 1.8 0.6 1.2 0.1 0.9 0 2.4-0.8 1.6 0 1.5-0.6 0.8-0.6 0.3-0.3 1.4-0.2 1.4-0.2 1-0.3 0.1-0.2 0.5-0.3 0.2-0.2 0.3-0.1 0.9-0.1 0.6-0.1 0.8 0 0.5 0.1 0.9 0.4 4.6 2 0.5 0.9-0.1 1.5-0.8 1.2-0.2 0.8-0.2 0.3-0.1 0.5 0.2 0.4 0.4 0.4 3.1 2.3 0.7 0.4 0.5 0.2 1 0.5 0.7 1.3-0.6 1.5-0.1 0.2-0.3 0.1-0.6 0.2-0.2 0.2-0.2 0.4 0 0.4-0.4 0.8-1.8 1.5-0.8 2-0.1 0.5 0 0.7 0.3 0.8-0.1 0.7-0.2 0.8-1.3 3 3.1 1 0.4-0.2 0.2 0 0.4 0.2 0.6 0.3 2.5-0.9 0.9 0 0.8-0.3 0.3 0 0.2 0.1 0.2 0.3 0.4 0.3 0.9 0.2 0.6 0.1 0.5-0.1 0.4-0.2 0.5-0.5 0.4-0.3 0.6-0.6 0.3-0.2 1.6-0.4 2.1-0.3 1.6-0.5 0.5 0.2 0.3 0.2 1.6 2.5 1.5 2.2 0.5 0.4 0.2 0.2 0.3 0.4 0 0.5 0 0.5-0.3 1-0.2 0.5-0.6 0.7-0.5 0.6-2.5 1.5-0.2 1 0.3 4.3 0.5 2.4 0.1 1.9-1.6 1.4-0.9 0-0.2-0.3-0.1-0.2-0.2 0-0.1 0.2-0.1 0.6 0.1 1.1 0 0.6-0.2 0.4-0.7 0.7-0.6 0.4-3.6 1.3-0.8 0.3-0.1 0.7-0.1 2.2 0.3 2.8 0.1 0.3 0.2 0 0.3 0 0.3 0.1 1 0.8 0.7 0.2 0.2 0.2 0.1 0.5 0 0.4-0.4 1.4-0.2 0.4-2.5 5.3-1.4 2.5-1 0.6-0.9 1.3-3.1 3.9-1.1 1.1 2 2 2.4 2 0.9 0.6 0.8 0.3 0.3 0.4 0.2 0.5 0 0.8-0.2 0.3-0.2 0.2-0.2 0.1-0.2 0.3 0 0.5 0.1 0.6 1 2.3 0.2 0.8 0.1 1.5 0.5 1 0.1 1.1-0.1 0.3-0.1 0.4-0.3 0.2-0.2 0.1-0.2 0.8-0.1 0.3-0.6-0.1-0.9 0.1-2.6 1-1.1 0-0.8-0.2-0.7-0.4-1-0.3-5.4-1.1-1.7-0.7-1.4-1-0.5-1.3-0.2-1.5-0.5-1.7-0.3-5.4-0.7-2.4-2.1-0.5-0.2 0-1.5 0.2-1.9-0.7-3.3-2.3-1.1-1.6-0.3-3.7-1.5-1.1-1.3-0.1-4 1.6-1 0.2-1 0-1.1-0.3-1.2-0.4-0.5-0.5-0.1-0.5 0-0.6-0.2-0.5-0.5-0.5-0.2-0.1-0.3 0.2-0.6 0-3.4-1.3-3.6-0.2-2.1-1-6.6-5-1.1-0.5-3-0.8-0.9-0.5-1.2-0.9-4.8-5.3-0.6-0.5-0.3-0.3-2.8-0.6-0.8 0.1-0.7 0.4-0.3-0.8-1.1-1.2-0.2-0.5 0-1-0.5-0.1-0.7 0.2-0.8 0.2-1.2-0.4-1-0.8-0.8-1-0.5-1.1-0.5-0.9-1.5-1.2-1-1.5-3-2 0.8-0.4-0.4-0.9-0.6-0.5-0.7-0.5-0.4-0.5-0.1-0.8 0.1-1 0-0.9-0.3-0.8-0.4-0.1-0.6 0.3-1 0.5-0.4-0.5-0.6-0.5-0.6-0.1-0.5-0.4-1.1-0.6-0.5-0.3-1.3-0.8-0.7-0.8-0.5-0.7 0.3-0.9 0.4-0.5 0.8-0.3 0.9-0.2 0.9-0.9 0.8-1.5 0.7-0.9 1.3-1.3 1.1-1.2 0.7-0.8 1-0.8 2.4-0.6 1.1 0.2 0.9-0.1 1.1 0.3 1 0.4 1 0.3 1.7 0.1 1.2 0.2 1.4 0.2 0.3 0.1 0.3 0.5 0.5 0.3 0.5 0.2 0.5-0.1 0-0.7 0.1-0.4 0.1-0.8 0.7-0.8 0.4-1.3-0.4-0.8 0.1-0.7 0-0.2 0.2-0.3 0.1-0.3 0-0.4-0.1-0.3-0.2 0.2-0.3 0.6-0.7 0.4-1 0-0.3-0.7 0-0.9 0.2-1.1 0-0.7 0.3-1.3 0.1-0.6-0.2-0.4-0.4-0.5-0.5-0.5-0.5-0.2-0.6 0.4-0.4 0.6-0.5 1.6-0.6 0.3-0.4-0.4 0-1-0.2-1.4-0.6-1.8-0.5-2.4-0.4-1.7-0.2-2.2 0.6-1.2 0.6-1.4 0.4-1.3 1.4-0.6 0.4-1.4 1.5-2.7 1.1-2.2 0.6-1.5 0.7-0.8-0.3 0.8 0 0.9 0.1 0.8 0.2 0.9 0.8-2.3 0.4-2.5 0.6-1 0.9 0.3 1.3-1.6 1.2-1.5 1.3-1.8 1-0.4 0.9-0.9 1.1-1 1.3-0.8 0.6 0 0.5 1.2 0.6 1.4 0.8 1.3 1 1.4 1.2 0.1-0.6-1.8-0.3-1.4 0.1-1.6 0.4-0.7 0.7-0.7 0.6 0.9 0.4 1.5-0.3 1.2 0.5 0.8 0.4 1.1 0.4 0.9 0.8 0.8 0.4 0.3 1.8 0.9 0.8 0.3 0.5-0.1 0.9-0.5 1-0.3 0-0.3 0-0.4 0-0.3 0-0.1 0.1-0.3 0.1-0.2 0-1.8-0.2-0.8-0.2-0.8-0.5-0.8-0.3-0.9 0.5-0.5 1.1 0.2z m-2.9 1l0.1 0.3 1.2 1.4 0.4 1.1 0.1 1.7-0.6 1.4-1.4 0.4-1.1-0.7-1.4-1.4-1.1-1.5-0.5-1.1 0.2-0.7 0.3-0.3 0.3-0.3 0.3-0.5-0.4-0.6-0.7-1.3 0.1-0.6 0.5-0.3 0.8 0.5 1.2-0.4 1 0.6 0.3 0.9 0.4 0.5 0.1 0.6-0.1 0.3z"
              fill={getPathFill("CONAR")}
              opacity={getPathOpacity("CONAR")}
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cursor-pointer transition-all duration-200 hover:opacity-100"
              onClick={() => handlePathClick("CONAR")}
            >
              <title>
                {getDepartamentoFromSvgId("CONAR")?.name || "Nariño"} -{" "}
                {getDepartamentoFromSvgId("CONAR")?._count.dichos || 0} dichos
              </title>
            </path>

            {/* Putumayo */}
            <path
              id="COPUT"
              d="M357.9 721.8l0.1-0.3 0.2-0.8 0.2-0.1 0.3-0.2 0.1-0.4 0.1-0.3-0.1-1.1-0.5-1-0.1-1.5-0.2-0.8-1-2.3-0.1-0.6 0-0.5 0.2-0.3 0.2-0.1 0.2-0.2 0.2-0.3 0-0.8-0.2-0.5-0.3-0.4-0.8-0.3-0.9-0.6-2.4-2-2-2 1.1-1.1 3.1-3.9 0.9-1.3 1-0.6 1.4-2.5 2.5-5.3 0.2-0.4 0.4-1.4 0-0.4-0.1-0.5-0.2-0.2-0.7-0.2-1-0.8-0.3-0.1-0.3 0-0.2 0-0.1-0.3-0.3-2.8 0.1-2.2 0.1-0.7 0.8-0.3 3.6-1.3 0.6-0.4 0.7-0.7 0.2-0.4 0-0.6-0.1-1.1 0.1-0.6 0.1-0.2 0.2 0 0.1 0.2 0.2 0.3 0.9 0 1.6-1.4 1.7 0 4 0.3 1.3-0.3 1.4-0.8 1.1-1.3 2.7-4 0.8-0.2 0.8 0.3 0.9 0.6 1.7 0.7 0.8 1 1 1.5 0.1 0.6 0.9 0.8 0.6 1.4 0.2 0.7 0 0.7-0.2 0.9-0.9 1.7-0.2 0.9-0.2 4.4 0.5 2.2 1.2 1.9 1 0.7 3.6 1.1 2 1 1.6 0.3 7.1 0.2 0.8-0.2 0.5-0.3 0.5-0.4 0.6-0.5 0.7-0.3 0.7-0.2 1.6 0.1 0.9-0.2 0.4-0.5 0.3-0.6 0.5-0.5 0.1 0 0.7-0.1 0.7 0.1 1.4 0.6 0.9 0 1.9-0.2 0.9 0.2 0.7 0.6 0.2 0.6 0 0.7 0.1 0.9 0.6 1.1 2.8 3.3 0.9 0.5 2 0.2 1 0.5 0.9 0.6 0.9 0.3 1 0 3.4-0.2 2.3 0.2 2.1 1 3.1 3.3 2 0.7 4.3 0.3 2.8-0.4 1 0.2 1.2 0.6 0.6 0.3 0.4 0.5 0.2 0.5-0.1 1 0.1 0.5 0.4 0.8 1.2 1.4 0.4 0.9 0 0.8-0.4 1.7 0.2 0.9 0.7 1.7 0.8 1.1 1.1 0.4 1.7-0.4 1.2-0.5 0.6 0 0.7 0.3 0.1 0.3 0.1 0.8 0.2 0.3 0.5 0.1 0.5 0 1-0.3 1.9 0.4 0.6 1.4-0.4 3.4 0.2 0.7 0.7 2.3 0.2 1.7 0.4 0.5 2.2 0.8 3.2 1.7 5.7 1.1 1.8 1 1.3 1.5 0.3 2.1-0.3 0.6-0.5 0.6-0.2 0.6 0.7 0.4 1 0.4 0.2 0.2-0.2 0.4-0.7 1.3-0.3 0.4-0.1 0.3 0.6 1.1 0.1 0.4 0.1 0.9 0.2 0.7 0.4 0.2 0.4-0.1 0.8 0.2 0.4-0.1 0.3 0.1 0.5 0.2 0.2 0.4 0.4 1.1 0.2 0.4 0.8 0.4 1 0.4 1 0.1 0.8-0.1 0.9-0.2 0.5 0.2 0.4 0.3 0.9 0.1 0.7-0.3 0.5-1.5 0.8-0.3 0.8 0.3 0.3 0.8 0 0.8 0.4 0.6 0.8 0 1.8-0.7 1.1 0.2 1.8 0.9 0.5 0.4 0.3 0.5 0.1 0.4 0 0.4 0.5 1.5 0.2 0.4 0.4 0.5 0.6 0.3 0.4-0.1 0.4-0.2 0.5-0.1 0.5 0.1 0.3-0.1 0.3 0 0.5 0.3 0.2 0.3 0.2 1 0.3 0.3 0.9 0.1 0.9-0.4 0.9-0.3 0.9 0.5 2.7 2.1 1.7 1.9 1.1 0.8 2.4 1 3.9 1.1 0 0.1-27.8 8.6-0.1-0.5-0.1-0.6-0.3-0.2-0.6 0-0.3-0.1-0.5-0.7-0.6-0.8-0.6-0.5-3.1-1.8-1.3-1.1-2.2-2.2-1.4-2.4-0.5-0.4-0.5 0.1-0.4 0.2-0.4 0.3-0.2 0.1-0.7 0-0.3-0.2-0.2-0.3-0.2-0.2-0.4-0.3-0.2-0.2-0.3-0.2-1.3-0.1-1-0.2-0.5-0.1-0.9-0.3 0.4-0.7 1.4-1-1.7-3.6-0.7-1-1.1-0.9-0.6 0.1-1.3 2.1-0.5 0.4-0.5 0-0.9-0.3-1.7-0.3-1.1-0.5-0.7-0.5-2-2.3-0.4-0.2-0.4-0.2-0.9 0-0.5-0.1-0.5-0.6-2-2.7-1-0.8-1.1-0.5-2.2-0.7-1.1-0.1-0.7 0.2-0.5 0.5-0.2 1-0.3 0.6-0.6 0.8-0.8 0.6-0.7 0.3-1-0.6-3.2-1.2-2.8-0.5-1-0.7-1.2-0.4-3-1.8-2.4-2.2-0.9-0.3-0.5-0.3-0.6-0.7-0.8-0.7-1-0.4-1 0.1-2.2 0.5-1.1 0.2-1.2-0.1-1-0.3-0.8-0.3-1.4-0.8-2-1.5-0.5-0.7-3-1.9-1.3-1.2-0.6-0.8-0.2-1-0.2-0.6-3.4-4.3-0.3-0.6-0.4-0.8-1.2 0.2-1.3 0.4-0.9 0-0.3-0.4-0.2-1.3-0.3-0.5-0.5-0.2-0.5-0.1-1.1 0.1-1.3-0.1-1.1-0.2-1-0.5-1-0.6-1.4-1.5-0.5-0.2-0.5 0.1-0.9 0.7-0.3 0.2-0.3 0.2-1.2 1.5-0.5 0.2-0.6 0.1-1.1 0.1-0.4-0.1 0 0.3-0.1 3.8 0.5 3.4-0.9 0.6-5 0.5-1.3 0.7-0.8 0.1-0.9-0.3-1.4-1.3-0.8-0.5-0.7-0.2-2.5-0.3-1.7-0.5-0.7 0.2 0.2 2.1-0.8 0-1.8-0.8-0.7-0.1-3.5 0.5-0.7 0-0.8-0.3-0.8-0.6-1.1-1.1-0.6-0.4-0.8-0.3-0.6-0.1-2 0-1.6-0.5-1.9-2.2-1.1-0.3z"
              fill={getPathFill("COPUT")}
              opacity={getPathOpacity("COPUT")}
              stroke="#ffffff"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cursor-pointer transition-all duration-200 hover:opacity-100"
              onClick={() => handlePathClick("COPUT")}
            >
              <title>
                {getDepartamentoFromSvgId("COPUT")?.name || "Putumayo"} -{" "}
                {getDepartamentoFromSvgId("COPUT")?._count.dichos || 0} dichos
              </title>
            </path>

            {/* Add other paths here - for brevity showing structure */}
            {/* Note: The full component would include all 10 department paths from the SVG */}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-3 text-xs">
        <div className="font-semibold text-gray-700 mb-2">Leyenda</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-gray-200"></div>
            <span className="text-gray-600">Sin dichos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-300"></div>
            <span className="text-gray-600">1-4 dichos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-400"></div>
            <span className="text-gray-600">5-9 dichos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span className="text-gray-600">10+ dichos</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-gray-500 italic text-xs">
            Nota: Solo se muestran algunos departamentos en el mapa
          </p>
        </div>
      </div>

      {/* Department list for those not in SVG */}
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {departamentos
          .filter((dept) => !Object.values(SVG_TO_DB_CODE).includes(dept.code))
          .map((dept) => (
            <button
              key={dept.id}
              onClick={() =>
                onSelectDepartamento(
                  selectedDepartamento === dept.id ? null : dept.id
                )
              }
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedDepartamento === dept.id
                  ? "bg-amber-100 border border-amber-300 text-amber-900"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{dept.name}</span>
                <span className="text-xs text-gray-500">
                  {dept._count.dichos} dichos
                </span>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}
