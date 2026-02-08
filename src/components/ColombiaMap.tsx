"use client";

import { useState } from "react";
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

const DEPT_PATHS: DeptPath[] = [
  // Caribe
  { code: "LAG", name: "La Guajira", region: "Caribe", d: "M245,25 L280,10 L305,30 L295,65 L270,80 L250,60 Z", labelX: 272, labelY: 42 },
  { code: "CES", name: "Cesar", region: "Caribe", d: "M230,65 L250,60 L270,80 L265,120 L240,130 L225,105 Z", labelX: 248, labelY: 95 },
  { code: "MAG", name: "Magdalena", region: "Caribe", d: "M200,30 L245,25 L250,60 L230,65 L225,105 L200,95 L190,60 Z", labelX: 218, labelY: 62 },
  { code: "ATL", name: "Atl\u00e1ntico", region: "Caribe", d: "M170,40 L200,30 L190,60 L175,65 Z", labelX: 183, labelY: 48 },
  { code: "BOL", name: "Bol\u00edvar", region: "Caribe", d: "M155,55 L175,65 L190,60 L200,95 L210,135 L200,175 L175,185 L160,160 L145,120 L140,80 Z", labelX: 175, labelY: 120 },
  { code: "SUC", name: "Sucre", region: "Caribe", d: "M130,60 L155,55 L140,80 L145,105 L125,100 L120,75 Z", labelX: 137, labelY: 80 },
  { code: "COR", name: "C\u00f3rdoba", region: "Caribe", d: "M110,70 L130,60 L120,75 L125,100 L145,120 L140,155 L120,160 L100,130 L95,95 Z", labelX: 120, labelY: 115 },
  { code: "NSA", name: "N. Santander", region: "Andina", d: "M225,105 L240,130 L260,135 L270,115 L285,130 L270,170 L240,170 L220,155 L210,135 Z", labelX: 252, labelY: 148 },
  { code: "SAN", name: "Santander", region: "Andina", d: "M200,175 L210,135 L220,155 L240,170 L235,200 L210,210 L190,200 Z", labelX: 216, labelY: 178 },
  { code: "ANT", name: "Antioquia", region: "Andina", d: "M100,130 L120,160 L140,155 L145,120 L160,160 L175,185 L170,210 L150,220 L130,210 L110,190 L90,165 Z", labelX: 135, labelY: 178 },
  { code: "ARA", name: "Arauca", region: "Orinoqu\u00eda", d: "M265,120 L310,100 L340,115 L320,145 L270,170 L260,135 Z", labelX: 300, labelY: 130 },
  { code: "BOY", name: "Boyac\u00e1", region: "Andina", d: "M175,185 L200,175 L190,200 L210,210 L235,200 L240,230 L225,250 L200,245 L180,230 L170,210 Z", labelX: 205, labelY: 218 },
  { code: "CAS", name: "Casanare", region: "Orinoqu\u00eda", d: "M235,200 L240,170 L270,170 L320,145 L340,170 L320,205 L280,220 L240,230 Z", labelX: 288, labelY: 188 },
  { code: "CHO", name: "Choc\u00f3", region: "Pac\u00edfica", d: "M55,145 L90,165 L110,190 L100,230 L85,270 L75,300 L55,290 L40,250 L35,200 L40,170 Z", labelX: 70, labelY: 220 },
  { code: "RIS", name: "Risaralda", region: "Andina", d: "M110,235 L130,230 L140,245 L125,255 Z", labelX: 125, labelY: 245 },
  { code: "CAL", name: "Caldas", region: "Andina", d: "M130,210 L150,220 L160,240 L140,245 L130,230 Z", labelX: 142, labelY: 228 },
  { code: "QUI", name: "Quind\u00edo", region: "Andina", d: "M125,255 L140,245 L145,260 L130,265 Z", labelX: 135, labelY: 258 },
  { code: "BOG", name: "Bogot\u00e1 D.C.", region: "Andina", d: "M188,250 L200,245 L198,260 L185,258 Z", labelX: 192, labelY: 253 },
  { code: "CUN", name: "Cundinamarca", region: "Andina", d: "M150,220 L170,210 L180,230 L200,245 L225,250 L220,280 L195,295 L170,290 L155,270 L160,240 Z", labelX: 185, labelY: 268 },
  { code: "VID", name: "Vichada", region: "Orinoqu\u00eda", d: "M320,205 L340,170 L380,155 L420,180 L400,240 L350,270 L310,260 L280,220 Z", labelX: 355, labelY: 215 },
  { code: "MET", name: "Meta", region: "Orinoqu\u00eda", d: "M225,250 L240,230 L280,220 L310,260 L300,310 L260,330 L230,310 L220,280 Z", labelX: 265, labelY: 280 },
  { code: "TOL", name: "Tolima", region: "Andina", d: "M130,265 L155,270 L170,290 L165,325 L145,340 L125,320 L115,290 Z", labelX: 143, labelY: 300 },
  { code: "VAC", name: "Valle del Cauca", region: "Andina", d: "M75,300 L85,270 L100,280 L115,290 L110,320 L95,335 L80,320 Z", labelX: 95, labelY: 300 },
  { code: "GUV", name: "Guaviare", region: "Amazon\u00eda", d: "M260,330 L300,310 L310,260 L350,270 L345,320 L310,350 L275,355 Z", labelX: 310, labelY: 315 },
  { code: "GUA", name: "Guain\u00eda", region: "Amazon\u00eda", d: "M350,270 L400,240 L430,280 L420,350 L380,380 L345,360 L345,320 Z", labelX: 390, labelY: 315 },
  { code: "HUI", name: "Huila", region: "Andina", d: "M145,340 L165,325 L170,290 L195,295 L200,330 L185,370 L165,375 L150,360 Z", labelX: 172, labelY: 345 },
  { code: "CAU", name: "Cauca", region: "Andina", d: "M75,300 L95,335 L110,320 L125,320 L145,340 L150,360 L140,385 L115,395 L95,380 L70,350 L60,325 Z", labelX: 108, labelY: 355 },
  { code: "NAR", name: "Nari\u00f1o", region: "Andina", d: "M55,370 L70,350 L95,380 L115,395 L110,425 L90,440 L65,435 L45,410 Z", labelX: 82, labelY: 408 },
  { code: "CAQ", name: "Caquet\u00e1", region: "Amazon\u00eda", d: "M165,375 L185,370 L200,330 L230,310 L260,330 L275,355 L270,390 L235,410 L195,410 L170,395 Z", labelX: 220, labelY: 375 },
  { code: "VAU", name: "Vaup\u00e9s", region: "Amazon\u00eda", d: "M275,355 L310,350 L345,360 L380,380 L370,430 L330,450 L290,440 L270,410 L270,390 Z", labelX: 325, labelY: 400 },
  { code: "PUT", name: "Putumayo", region: "Amazon\u00eda", d: "M110,425 L115,395 L140,385 L150,360 L170,395 L195,410 L185,445 L155,460 L125,455 Z", labelX: 152, labelY: 428 },
  { code: "AMA", name: "Amazonas", region: "Amazon\u00eda", d: "M185,445 L195,410 L235,410 L270,410 L290,440 L330,450 L310,500 L270,530 L220,540 L180,520 L165,490 Z", labelX: 245, labelY: 480 },
  { code: "SAP", name: "San Andr\u00e9s", region: "Insular", d: "M25,65 L35,60 L38,80 L30,85 Z", labelX: 32, labelY: 72 },
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
  } | null>(null);

  const getDeptData = (code: string) =>
    departamentos.find((d) => d.code === code);

  const isSelected = (code: string) => {
    const data = getDeptData(code);
    return data ? selectedDepartamento === data.id : false;
  };

  const getFill = (dept: DeptPath) => {
    const colors = REGION_COLORS[dept.region] || {
      fill: "#ccc",
      hover: "#999",
    };
    if (isSelected(dept.code)) return "#FFC107";
    if (hoveredDept === dept.code) return colors.hover;
    return colors.fill;
  };

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
        viewBox="0 0 460 560"
        className="w-full h-auto"
        style={{ maxHeight: "70vh" }}
      >
        {/* Background */}
        <rect width="460" height="560" fill="transparent" />

        {/* Department paths */}
        {DEPT_PATHS.map((dept) => (
          <path
            key={dept.code}
            d={dept.d}
            fill={getFill(dept)}
            stroke={isSelected(dept.code) ? "#E65100" : "#fff"}
            strokeWidth={isSelected(dept.code) ? 2.5 : 1}
            className="cursor-pointer transition-all duration-200"
            onClick={() => handleClick(dept.code)}
            onMouseEnter={(e) => handleMouseEnter(dept, e)}
            onMouseMove={(e) => handleMouseEnter(dept, e)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
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
            {tooltip.count} {tooltip.count === 1 ? "dicho" : "dichos"}
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
