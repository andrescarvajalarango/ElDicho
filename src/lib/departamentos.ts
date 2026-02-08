export interface DepartamentoInfo {
  code: string;
  name: string;
  region: string;
}

export const REGIONES = {
  ANDINA: "Andina",
  CARIBE: "Caribe",
  PACIFICA: "Pac\u00edfica",
  ORINOQUIA: "Orinoqu\u00eda",
  AMAZONIA: "Amazon\u00eda",
  INSULAR: "Insular",
} as const;

export const REGION_COLORS: Record<string, { fill: string; hover: string }> = {
  Andina: { fill: "#4CAF50", hover: "#388E3C" },
  Caribe: { fill: "#2196F3", hover: "#1565C0" },
  "Pac\u00edfica": { fill: "#9C27B0", hover: "#6A1B9A" },
  "Orinoqu\u00eda": { fill: "#FF9800", hover: "#E65100" },
  "Amazon\u00eda": { fill: "#009688", hover: "#00695C" },
  Insular: { fill: "#607D8B", hover: "#37474F" },
};

export const DEPARTAMENTOS: DepartamentoInfo[] = [
  { code: "AMA", name: "Amazonas", region: REGIONES.AMAZONIA },
  { code: "ANT", name: "Antioquia", region: REGIONES.ANDINA },
  { code: "ARA", name: "Arauca", region: REGIONES.ORINOQUIA },
  { code: "ATL", name: "Atl\u00e1ntico", region: REGIONES.CARIBE },
  { code: "BOL", name: "Bol\u00edvar", region: REGIONES.CARIBE },
  { code: "BOY", name: "Boyac\u00e1", region: REGIONES.ANDINA },
  { code: "CAL", name: "Caldas", region: REGIONES.ANDINA },
  { code: "CAQ", name: "Caquet\u00e1", region: REGIONES.AMAZONIA },
  { code: "CAS", name: "Casanare", region: REGIONES.ORINOQUIA },
  { code: "CAU", name: "Cauca", region: REGIONES.ANDINA },
  { code: "CES", name: "Cesar", region: REGIONES.CARIBE },
  { code: "CHO", name: "Choc\u00f3", region: REGIONES.PACIFICA },
  { code: "COR", name: "C\u00f3rdoba", region: REGIONES.CARIBE },
  { code: "CUN", name: "Cundinamarca", region: REGIONES.ANDINA },
  { code: "GUA", name: "Guain\u00eda", region: REGIONES.AMAZONIA },
  { code: "GUV", name: "Guaviare", region: REGIONES.AMAZONIA },
  { code: "HUI", name: "Huila", region: REGIONES.ANDINA },
  { code: "LAG", name: "La Guajira", region: REGIONES.CARIBE },
  { code: "MAG", name: "Magdalena", region: REGIONES.CARIBE },
  { code: "MET", name: "Meta", region: REGIONES.ORINOQUIA },
  { code: "NAR", name: "Nari\u00f1o", region: REGIONES.ANDINA },
  { code: "NSA", name: "Norte de Santander", region: REGIONES.ANDINA },
  { code: "PUT", name: "Putumayo", region: REGIONES.AMAZONIA },
  { code: "QUI", name: "Quind\u00edo", region: REGIONES.ANDINA },
  { code: "RIS", name: "Risaralda", region: REGIONES.ANDINA },
  { code: "SAP", name: "San Andr\u00e9s y Providencia", region: REGIONES.INSULAR },
  { code: "SAN", name: "Santander", region: REGIONES.ANDINA },
  { code: "SUC", name: "Sucre", region: REGIONES.CARIBE },
  { code: "TOL", name: "Tolima", region: REGIONES.ANDINA },
  { code: "VAC", name: "Valle del Cauca", region: REGIONES.ANDINA },
  { code: "VAU", name: "Vaup\u00e9s", region: REGIONES.AMAZONIA },
  { code: "VID", name: "Vichada", region: REGIONES.ORINOQUIA },
  { code: "BOG", name: "Bogot\u00e1 D.C.", region: REGIONES.ANDINA },
];
