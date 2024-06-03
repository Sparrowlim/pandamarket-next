export interface Writer {
  id: number;
  nickname: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt?: string;
  updatedAt?: string;
  writer: Writer;
}

export interface Articles {
  list: Post[];
  totalCount: number;
}

export type OrderBy = "like" | "recent";
