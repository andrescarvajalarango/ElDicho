"use client";

import { useState, useCallback } from "react";
import { REGION_COLORS } from "@/lib/departamentos";
import { DepartamentoData } from "@/lib/types";

interface ColombiaMapProps {
  departamentos: DepartamentoData[];
  selectedDepartamento: string | null;
  onSelectDepartamento: (id: string | null) => void;
}

interface DeptPath {
  code: string;
  name: string;
  region: string;
  d: string;
  labelX: number;
  labelY: number;
}

// SVG paths for all 33 departments of Colombia
// Viewbox: 0 0 500 620, geographic projection based on real boundaries
const DEPT_PATHS: DeptPath[] = [
  // ═══════════════════════════════════════
  // REGION CARIBE (North coast)
  // ═══════════════════════════════════════
  {
    code: "LAG",
    name: "La Guajira",
    region: "Caribe",
    d: "M285,18 L310,8 L338,18 L348,38 L340,62 L325,78 L308,85 L295,78 L280,60 L272,42 Z",
    labelX: 312,
    labelY: 45,
  },
  {
    code: "CES",
    name: "Cesar",
    region: "Caribe",
    d: "M260,68 L280,60 L295,78 L308,85 L302,108 L290,130 L272,140 L255,130 L248,108 L252,85 Z",
    labelX: 278,
    labelY: 105,
  },
  {
    code: "MAG",
    name: "Magdalena",
    region: "Caribe",
    d: "M218,28 L248,22 L272,30 L280,60 L260,68 L252,85 L248,108 L235,105 L222,88 L215,60 Z",
    labelX: 245,
    labelY: 62,
  },
  {
    code: "ATL",
    name: "Atl\u00e1ntico",
    region: "Caribe",
    d: "M192,38 L218,28 L215,60 L205,68 L195,62 Z",
    labelX: 205,
    labelY: 48,
  },
  {
    code: "BOL",
    name: "Bol\u00edvar",
    region: "Caribe",
    d: "M178,52 L195,62 L205,68 L215,60 L222,88 L235,105 L240,128 L235,158 L225,185 L210,195 L195,185 L180,162 L170,135 L165,105 L168,78 Z",
    labelX: 202,
    labelY: 128,
  },
  {
    code: "SUC",
    name: "Sucre",
    region: "Caribe",
    d: "M152,58 L178,52 L168,78 L165,105 L155,108 L142,98 L138,78 Z",
    labelX: 158,
    labelY: 82,
  },
  {
    code: "COR",
    name: "C\u00f3rdoba",
    region: "Caribe",
    d: "M125,72 L152,58 L138,78 L142,98 L155,108 L165,135 L160,162 L142,168 L128,158 L115,135 L108,108 L112,88 Z",
    labelX: 138,
    labelY: 118,
  },

  // ═══════════════════════════════════════
  // REGION ANDINA (Central/Western mountains)
  // ═══════════════════════════════════════
  {
    code: "ANT",
    name: "Antioquia",
    region: "Andina",
    d: "M108,135 L128,158 L142,168 L160,162 L170,135 L180,162 L195,185 L210,195 L205,218 L192,232 L175,238 L158,232 L140,218 L122,200 L108,178 L100,155 Z",
    labelX: 155,
    labelY: 188,
  },
  {
    code: "NSA",
    name: "N. de Santander",
    region: "Andina",
    d: "M255,130 L272,140 L292,138 L308,128 L318,145 L310,170 L295,182 L275,185 L258,175 L245,158 L240,128 L248,108 Z",
    labelX: 282,
    labelY: 155,
  },
  {
    code: "SAN",
    name: "Santander",
    region: "Andina",
    d: "M225,185 L235,158 L240,128 L245,158 L258,175 L275,185 L270,208 L255,222 L238,228 L222,218 L212,205 Z",
    labelX: 248,
    labelY: 195,
  },
  {
    code: "BOY",
    name: "Boyac\u00e1",
    region: "Andina",
    d: "M210,195 L225,185 L222,218 L238,228 L255,222 L265,245 L258,268 L242,278 L225,272 L210,258 L198,242 L192,232 L205,218 Z",
    labelX: 232,
    labelY: 248,
  },
  {
    code: "CUN",
    name: "Cundinamarca",
    region: "Andina",
    d: "M175,238 L192,232 L198,242 L210,258 L225,272 L255,268 L250,298 L235,315 L215,318 L198,310 L182,298 L172,278 L168,258 Z",
    labelX: 212,
    labelY: 282,
  },
  {
    code: "BOG",
    name: "Bogot\u00e1 D.C.",
    region: "Andina",
    d: "M212,270 L222,268 L220,282 L210,280 Z",
    labelX: 216,
    labelY: 275,
  },
  {
    code: "CAL",
    name: "Caldas",
    region: "Andina",
    d: "M148,238 L168,232 L178,252 L168,260 L155,255 Z",
    labelX: 162,
    labelY: 248,
  },
  {
    code: "RIS",
    name: "Risaralda",
    region: "Andina",
    d: "M128,252 L148,245 L155,262 L142,270 Z",
    labelX: 142,
    labelY: 258,
  },
  {
    code: "QUI",
    name: "Quind\u00edo",
    region: "Andina",
    d: "M140,270 L155,262 L160,278 L148,282 Z",
    labelX: 150,
    labelY: 273,
  },
  {
    code: "TOL",
    name: "Tolima",
    region: "Andina",
    d: "M148,282 L168,258 L172,278 L182,298 L178,328 L165,348 L148,352 L135,338 L128,315 L132,295 Z",
    labelX: 155,
    labelY: 315,
  },
  {
    code: "HUI",
    name: "Huila",
    region: "Andina",
    d: "M165,348 L178,328 L182,298 L198,310 L215,318 L218,345 L208,375 L192,388 L175,382 L162,368 Z",
    labelX: 192,
    labelY: 352,
  },
  {
    code: "VAC",
    name: "Valle del Cauca",
    region: "Andina",
    d: "M88,302 L105,285 L120,288 L132,295 L128,315 L135,338 L122,350 L108,345 L95,332 Z",
    labelX: 112,
    labelY: 318,
  },
  {
    code: "CAU",
    name: "Cauca",
    region: "Andina",
    d: "M82,325 L95,332 L108,345 L122,350 L135,338 L148,352 L165,348 L162,368 L158,395 L145,408 L128,412 L108,402 L88,382 L75,358 L72,340 Z",
    labelX: 122,
    labelY: 372,
  },
  {
    code: "NAR",
    name: "Nari\u00f1o",
    region: "Andina",
    d: "M65,375 L75,358 L88,382 L108,402 L128,412 L125,438 L112,455 L95,462 L75,455 L58,435 L52,408 Z",
    labelX: 92,
    labelY: 425,
  },

  // ═══════════════════════════════════════
  // REGION PACIFICA (Western coast)
  // ═══════════════════════════════════════
  {
    code: "CHO",
    name: "Choc\u00f3",
    region: "Pac\u00edfica",
    d: "M52,148 L68,142 L85,152 L100,155 L108,178 L122,200 L115,228 L105,258 L105,285 L88,302 L82,325 L72,340 L58,328 L48,298 L40,258 L38,218 L42,182 Z",
    labelX: 75,
    labelY: 238,
  },

  // ═══════════════════════════════════════
  // REGION ORINOQUIA (Eastern plains)
  // ═══════════════════════════════════════
  {
    code: "ARA",
    name: "Arauca",
    region: "Orinoqu\u00eda",
    d: "M295,128 L308,128 L340,115 L375,118 L388,138 L370,158 L340,168 L310,170 L295,182 L275,185 L270,165 Z",
    labelX: 338,
    labelY: 148,
  },
  {
    code: "CAS",
    name: "Casanare",
    region: "Orinoqu\u00eda",
    d: "M265,208 L275,185 L295,182 L310,170 L340,168 L370,158 L382,178 L375,208 L352,228 L318,238 L290,232 Z",
    labelX: 328,
    labelY: 200,
  },
  {
    code: "VID",
    name: "Vichada",
    region: "Orinoqu\u00eda",
    d: "M375,208 L382,178 L405,168 L438,178 L462,198 L458,238 L445,268 L425,285 L398,278 L372,262 L355,242 Z",
    labelX: 418,
    labelY: 228,
  },
  {
    code: "MET",
    name: "Meta",
    region: "Orinoqu\u00eda",
    d: "M255,268 L265,245 L265,208 L290,232 L318,238 L352,228 L375,208 L355,242 L372,262 L362,295 L338,318 L308,328 L278,322 L258,308 L250,298 Z",
    labelX: 312,
    labelY: 278,
  },

  // ═══════════════════════════════════════
  // REGION AMAZONIA (Southeast)
  // ═══════════════════════════════════════
  {
    code: "GUV",
    name: "Guaviare",
    region: "Amazon\u00eda",
    d: "M308,328 L338,318 L362,295 L372,262 L398,278 L405,308 L392,338 L368,352 L342,348 L318,342 Z",
    labelX: 362,
    labelY: 318,
  },
  {
    code: "GUA",
    name: "Guain\u00eda",
    region: "Amazon\u00eda",
    d: "M398,278 L425,285 L445,268 L462,288 L468,322 L458,358 L440,382 L418,392 L395,378 L388,348 L392,338 L405,308 Z",
    labelX: 435,
    labelY: 335,
  },
  {
    code: "CAQ",
    name: "Caquet\u00e1",
    region: "Amazon\u00eda",
    d: "M192,388 L208,375 L218,345 L235,315 L258,308 L278,322 L308,328 L318,342 L315,368 L298,395 L272,412 L248,418 L222,412 L202,402 Z",
    labelX: 262,
    labelY: 375,
  },
  {
    code: "VAU",
    name: "Vaup\u00e9s",
    region: "Amazon\u00eda",
    d: "M318,342 L342,348 L368,352 L388,348 L395,378 L418,392 L412,428 L388,452 L358,458 L330,448 L305,432 L298,412 L298,395 L315,368 Z",
    labelX: 358,
    labelY: 402,
  },
  {
    code: "PUT",
    name: "Putumayo",
    region: "Amazon\u00eda",
    d: "M125,438 L128,412 L145,408 L158,395 L175,382 L192,388 L202,402 L195,432 L178,452 L158,462 L138,458 Z",
    labelX: 162,
    labelY: 432,
  },
  {
    code: "AMA",
    name: "Amazonas",
    region: "Amazon\u00eda",
    d: "M195,432 L202,402 L222,412 L248,418 L272,412 L298,412 L305,432 L330,448 L358,458 L345,498 L318,528 L282,548 L248,555 L218,548 L192,528 L178,498 L175,468 Z",
    labelX: 268,
    labelY: 495,
  },

  // ═══════════════════════════════════════
  // REGION INSULAR
  // ═══════════════════════════════════════
  {
    code: "SAP",
    name: "San Andr\u00e9s",
    region: "Insular",
    d: "M22,55 L32,48 L38,58 L38,78 L32,85 L22,78 Z",
    labelX: 30,
    labelY: 68,
  },
];

export default function ColombiaMap({
  departamentos,
  selectedDepartamento,
  onSelectDepartamento,
}: ColombiaMapProps) {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    name: string;
    count: number;
    region: string;
  } | null>(null);

  const getDeptData = useCallback(
    (code: string) => departamentos.find((d) => d.code === code),
    [departamentos]
  );

  const isSelected = useCallback(
    (code: string) => {
      const data = getDeptData(code);
      return data ? selectedDepartamento === data.id : false;
    },
    [getDeptData, selectedDepartamento]
  );

  const getFill = useCallback(
    (dept: DeptPath) => {
      const colors = REGION_COLORS[dept.region] || {
        fill: "#ccc",
        hover: "#999",
      };
      if (isSelected(dept.code)) return "#FFC107";
      if (hoveredDept === dept.code) return colors.hover;
      return colors.fill;
    },
    [isSelected, hoveredDept]
  );

  const handleClick = (code: string) => {
    const data = getDeptData(code);
    if (!data) return;
    if (selectedDepartamento === data.id) {
      onSelectDepartamento(null);
    } else {
      onSelectDepartamento(data.id);
    }
  };

  const handleMouseEnter = (
    dept: DeptPath,
    e: React.MouseEvent<SVGPathElement>
  ) => {
    setHoveredDept(dept.code);
    const data = getDeptData(dept.code);
    const svg = e.currentTarget.closest("svg");
    if (svg) {
      const rect = svg.getBoundingClientRect();
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 10,
        name: dept.name,
        count: data?._count.dichos ?? 0,
        region: dept.region,
      });
    }
  };

  const handleMouseMove = (
    dept: DeptPath,
    e: React.MouseEvent<SVGPathElement>
  ) => {
    const data = getDeptData(dept.code);
    const svg = e.currentTarget.closest("svg");
    if (svg) {
      const rect = svg.getBoundingClientRect();
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 10,
        name: dept.name,
        count: data?._count.dichos ?? 0,
        region: dept.region,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredDept(null);
    setTooltip(null);
  };

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 500 580"
        className="w-full h-auto"
        style={{ maxHeight: "65vh" }}
      >
        {/* Ocean background */}
        <rect width="500" height="580" fill="#f0f7ff" rx="8" />

        {/* Department paths */}
        {DEPT_PATHS.map((dept) => (
          <path
            key={dept.code}
            d={dept.d}
            fill={getFill(dept)}
            stroke={isSelected(dept.code) ? "#D97706" : "#ffffff"}
            strokeWidth={isSelected(dept.code) ? 2.5 : 1}
            className="cursor-pointer transition-all duration-200"
            onClick={() => handleClick(dept.code)}
            onMouseEnter={(e) => handleMouseEnter(dept, e)}
            onMouseMove={(e) => handleMouseMove(dept, e)}
            onMouseLeave={handleMouseLeave}
          />
        ))}

        {/* Bogota marker (small, inside Cundinamarca) */}
        <circle
          cx={216}
          cy={275}
          r={4}
          fill={isSelected("BOG") ? "#FFC107" : "#E53E3E"}
          stroke="#fff"
          strokeWidth={1.5}
          className="cursor-pointer"
          onClick={() => handleClick("BOG")}
        />
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg z-50 whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-semibold">{tooltip.name}</div>
          <div className="text-gray-300 text-xs">
            {tooltip.region} &middot; {tooltip.count}{" "}
            {tooltip.count === 1 ? "dicho" : "dichos"}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {Object.entries(REGION_COLORS).map(([region, colors]) => (
          <div key={region} className="flex items-center gap-1.5 text-xs">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: colors.fill }}
            />
            <span className="text-gray-600">{region}</span>
          </div>
        ))}
      </div>

      {selectedDepartamento && (
        <button
          onClick={() => onSelectDepartamento(null)}
          className="mt-3 w-full text-center text-sm text-amber-700 hover:text-amber-900 font-medium cursor-pointer"
        >
          Limpiar filtro
        </button>
      )}
    </div>
  );
}
