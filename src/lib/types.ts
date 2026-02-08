export interface DichoWithRelations {
  id: string;
  text: string;
  meaning: string | null;
  author: string | null;
  isAnonymous: boolean;
  createdAt: string;
  user: {
    id: string;
    username: string;
    name: string;
    avatar: string | null;
  };
  departamento: {
    id: string;
    name: string;
    code: string;
    region: string;
  };
  _count: {
    likes: number;
    comments: number;
    shares: number;
  };
  comments: CommentData[];
}

export interface CommentData {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    name: string;
    avatar: string | null;
  };
}

export interface DepartamentoData {
  id: string;
  name: string;
  code: string;
  region: string;
  _count: {
    dichos: number;
  };
}
