// Mock data para desarrollo sin backend

export interface User {
  id: string;
  username: string;
  name: string;
  avatar?: string;
  bio?: string;
  region?: string;
  createdAt: Date;
}

export interface Departamento {
  id: string;
  name: string;
  code: string;
  region: string;
}

export interface Dicho {
  id: string;
  text: string;
  meaning?: string;
  author?: string;
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  departamentoId: string;
  user?: User;
  departamento?: Departamento;
  likes?: Like[];
  comments?: Comment[];
  _count?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface Like {
  id: string;
  userId: string;
  dichoId: string;
  createdAt: Date;
  user?: User;
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  dichoId: string;
  createdAt: Date;
  user?: User;
}

export interface Share {
  id: string;
  userId: string;
  dichoId: string;
  createdAt: Date;
}

// Datos mock
export const mockUsers: User[] = [
  { id: "demo-user-001", username: "juancho_paisa", name: "Juan Carlos Gomez", bio: "Amante de la cultura antioquena", region: "Antioquia", createdAt: new Date() },
  { id: "1", username: "juancho_paisa", name: "Juan Carlos Gomez", bio: "Amante de la cultura antioquena", region: "Antioquia", createdAt: new Date() },
  { id: "2", username: "la_costena", name: "Maria del Carmen", bio: "Barranquillera de corazon", region: "Atlantico", createdAt: new Date() },
  { id: "3", username: "el_cachaco", name: "Andres Felipe Rojas", bio: "Bogotano orgulloso", region: "Bogota D.C.", createdAt: new Date() },
  { id: "4", username: "la_valluna", name: "Carolina Valencia", bio: "Cali es Cali, lo demas es loma", region: "Valle del Cauca", createdAt: new Date() },
  { id: "5", username: "el_santandereano", name: "Pedro Luis Mantilla", bio: "De Bucaramanga pal mundo", region: "Santander", createdAt: new Date() },
];

export const mockDepartamentos: Departamento[] = [
  { id: "1", name: "Amazonas", code: "AMA", region: "Amazonía" },
  { id: "2", name: "Antioquia", code: "ANT", region: "Andina" },
  { id: "3", name: "Arauca", code: "ARA", region: "Orinoquía" },
  { id: "4", name: "Atlántico", code: "ATL", region: "Caribe" },
  { id: "5", name: "Bolívar", code: "BOL", region: "Caribe" },
  { id: "6", name: "Boyacá", code: "BOY", region: "Andina" },
  { id: "7", name: "Caldas", code: "CAL", region: "Andina" },
  { id: "8", name: "Caquetá", code: "CAQ", region: "Amazonía" },
  { id: "9", name: "Casanare", code: "CAS", region: "Orinoquía" },
  { id: "10", name: "Cauca", code: "CAU", region: "Andina" },
  { id: "11", name: "Cesar", code: "CES", region: "Caribe" },
  { id: "12", name: "Chocó", code: "CHO", region: "Pacífica" },
  { id: "13", name: "Córdoba", code: "COR", region: "Caribe" },
  { id: "14", name: "Cundinamarca", code: "CUN", region: "Andina" },
  { id: "15", name: "Guainía", code: "GUA", region: "Amazonía" },
  { id: "16", name: "Guaviare", code: "GUV", region: "Amazonía" },
  { id: "17", name: "Huila", code: "HUI", region: "Andina" },
  { id: "18", name: "La Guajira", code: "LAG", region: "Caribe" },
  { id: "19", name: "Magdalena", code: "MAG", region: "Caribe" },
  { id: "20", name: "Meta", code: "MET", region: "Orinoquía" },
  { id: "21", name: "Nariño", code: "NAR", region: "Andina" },
  { id: "22", name: "Norte de Santander", code: "NSA", region: "Andina" },
  { id: "23", name: "Putumayo", code: "PUT", region: "Amazonía" },
  { id: "24", name: "Quindío", code: "QUI", region: "Andina" },
  { id: "25", name: "Risaralda", code: "RIS", region: "Andina" },
  { id: "26", name: "San Andrés y Providencia", code: "SAP", region: "Insular" },
  { id: "27", name: "Santander", code: "SAN", region: "Andina" },
  { id: "28", name: "Sucre", code: "SUC", region: "Caribe" },
  { id: "29", name: "Tolima", code: "TOL", region: "Andina" },
  { id: "30", name: "Valle del Cauca", code: "VAC", region: "Andina" },
  { id: "31", name: "Vaupés", code: "VAU", region: "Amazonía" },
  { id: "32", name: "Vichada", code: "VID", region: "Orinoquía" },
  { id: "33", name: "Bogotá D.C.", code: "BOG", region: "Andina" },
];

const now = Date.now();
const createDate = (hoursAgo: number) => new Date(now - hoursAgo * 60 * 60 * 1000);

export const mockDichos: Dicho[] = [
  { id: "1", text: "A papaya puesta, papaya partida", meaning: "Si das la oportunidad, alguien la va a aprovechar", author: "Tradición oral antioqueña", isAnonymous: false, userId: "1", departamentoId: "2", createdAt: createDate(1), updatedAt: createDate(1) },
  { id: "2", text: "El que no arriesga un huevo, no tiene un pollo", meaning: "Hay que arriesgarse para lograr cosas grandes", isAnonymous: false, userId: "1", departamentoId: "2", createdAt: createDate(4), updatedAt: createDate(4) },
  { id: "3", text: "Más vale pájaro en mano que cien volando", meaning: "Es mejor asegurar lo que ya tienes que perseguir lo incierto", author: "Refrán popular", isAnonymous: false, userId: "1", departamentoId: "2", createdAt: createDate(7), updatedAt: createDate(7) },
  { id: "4", text: "Camarón que se duerme se lo lleva la corriente", meaning: "El que se descuida pierde oportunidades", author: "Tradición caribeña", isAnonymous: false, userId: "2", departamentoId: "4", createdAt: createDate(10), updatedAt: createDate(10) },
  { id: "5", text: "Más sabe el diablo por viejo que por diablo", meaning: "La experiencia da más sabiduría que la astucia", isAnonymous: false, userId: "3", departamentoId: "33", createdAt: createDate(13), updatedAt: createDate(13) },
  { id: "6", text: "En tierra de ciegos, el tuerto es rey", meaning: "Entre personas sin conocimiento, el que sabe un poco destaca", author: "Refrán popular", isAnonymous: false, userId: "3", departamentoId: "33", createdAt: createDate(16), updatedAt: createDate(16) },
  { id: "7", text: "Cali es Cali, lo demás es loma", meaning: "Expresión de orgullo caleño que resalta la ciudad como la mejor", author: "Dicho caleño", isAnonymous: false, userId: "4", departamentoId: "30", createdAt: createDate(19), updatedAt: createDate(19) },
  { id: "8", text: "Al que madruga Dios le ayuda", meaning: "El esfuerzo y la diligencia traen buenos resultados", author: "Refrán popular", isAnonymous: false, userId: "5", departamentoId: "17", createdAt: createDate(22), updatedAt: createDate(22) },
  { id: "9", text: "Dime con quién andas y te diré quién eres", meaning: "Las compañías reflejan como es una persona", author: "Tradición cafetera", isAnonymous: false, userId: "1", departamentoId: "7", createdAt: createDate(25), updatedAt: createDate(25) },
  { id: "10", text: "Del dicho al hecho hay mucho trecho", meaning: "Es más fácil decir que hacer", isAnonymous: false, userId: "1", departamentoId: "24", createdAt: createDate(28), updatedAt: createDate(28) },
];

export const mockLikes: Like[] = [
  { id: "1", userId: "2", dichoId: "1", createdAt: new Date() },
  { id: "2", userId: "3", dichoId: "1", createdAt: new Date() },
  { id: "3", userId: "1", dichoId: "4", createdAt: new Date() },
  { id: "4", userId: "5", dichoId: "7", createdAt: new Date() },
];

export const mockComments: Comment[] = [
  { id: "1", text: "Muy cierto, mi abuela siempre decía eso!", userId: "2", dichoId: "1", createdAt: new Date() },
  { id: "2", text: "Clásico colombiano, nunca pasa de moda", userId: "3", dichoId: "4", createdAt: new Date() },
  { id: "3", text: "Así mismito es!", userId: "4", dichoId: "7", createdAt: new Date() },
];

// Funciones helper para simular queries de base de datos
export function getDichosWithRelations(): Dicho[] {
  return mockDichos.map(dicho => ({
    ...dicho,
    user: mockUsers.find(u => u.id === dicho.userId),
    departamento: mockDepartamentos.find(d => d.id === dicho.departamentoId),
    likes: mockLikes.filter(l => l.dichoId === dicho.id),
    comments: mockComments.filter(c => c.dichoId === dicho.id).map(comment => ({
      ...comment,
      user: mockUsers.find(u => u.id === comment.userId),
    })),
    _count: {
      likes: mockLikes.filter(l => l.dichoId === dicho.id).length,
      comments: mockComments.filter(c => c.dichoId === dicho.id).length,
      shares: 0,
    },
  }));
}

export function getDepartamentosWithCount() {
  return mockDepartamentos.map(dept => ({
    ...dept,
    _count: {
      dichos: mockDichos.filter(d => d.departamentoId === dept.id).length,
    },
  }));
}

export function getDichoById(id: string): Dicho | undefined {
  const dicho = mockDichos.find(d => d.id === id);
  if (!dicho) return undefined;

  return {
    ...dicho,
    user: mockUsers.find(u => u.id === dicho.userId),
    departamento: mockDepartamentos.find(d => d.id === dicho.departamentoId),
    likes: mockLikes.filter(l => l.dichoId === dicho.id).map(like => ({
      ...like,
      user: mockUsers.find(u => u.id === like.userId),
    })),
    comments: mockComments.filter(c => c.dichoId === dicho.id).map(comment => ({
      ...comment,
      user: mockUsers.find(u => u.id === comment.userId),
    })),
    _count: {
      likes: mockLikes.filter(l => l.dichoId === dicho.id).length,
      comments: mockComments.filter(c => c.dichoId === dicho.id).length,
      shares: 0,
    },
  };
}

// Variable global para simular mutaciones
let nextId = 100;

export function addLike(dichoId: string, userId: string = "1") {
  const existing = mockLikes.find(l => l.dichoId === dichoId && l.userId === userId);
  if (existing) return existing;

  const newLike: Like = {
    id: String(nextId++),
    userId,
    dichoId,
    createdAt: new Date(),
  };
  mockLikes.push(newLike);
  return newLike;
}

export function removeLike(dichoId: string, userId: string = "1") {
  const index = mockLikes.findIndex(l => l.dichoId === dichoId && l.userId === userId);
  if (index > -1) {
    mockLikes.splice(index, 1);
    return true;
  }
  return false;
}

export function addComment(dichoId: string, text: string, userId: string = "1") {
  const newComment: Comment = {
    id: String(nextId++),
    text,
    userId,
    dichoId,
    createdAt: new Date(),
    user: mockUsers.find(u => u.id === userId),
  };
  mockComments.push(newComment);
  return newComment;
}

export function addDicho(data: Partial<Dicho>): Dicho {
  const newDicho: Dicho = {
    id: String(nextId++),
    text: data.text || "",
    meaning: data.meaning,
    author: data.author,
    isAnonymous: data.isAnonymous || false,
    userId: data.userId || "1",
    departamentoId: data.departamentoId || "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockDichos.push(newDicho);
  return newDicho;
}
