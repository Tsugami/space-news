export interface Article {
  id: number;
  featured: boolean;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  launches: Array<{
    id: string;
    provider: string;
  }>;
  events: Array<{
    id: string;
    provider: string;
  }>;
}

export interface ArticleListInput {
  skip: number;
  take: number;
}

interface PaginationMetadata {
  total: number;
}

export interface ArticleListOutput {
  results: Article[];
  metadata: PaginationMetadata;
}

import { useQuery } from "react-query";
import axios from "axios";
const API = "http://localhost:3001";

export const useManyArticles = () => {
  return useQuery("articles", () => {
    return axios
      .get<ArticleListOutput>(`${API}/articles`, { params: { take: 5 } })
      .then((res) => res.data);
  });
};
