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

import { useInfiniteQuery } from "react-query";
import axios from "axios";
const API = "http://localhost:3001";

export const useManyArticles = () => {
  return useInfiniteQuery(
    "articles",
    ({ pageParam }) => {
      const page = pageParam ?? 1;
      const itemsPerPage = 5;
      const skip = (page - 1) * itemsPerPage;

      return axios
        .get<ArticleListOutput>(`${API}/articles`, {
          params: { take: itemsPerPage, skip },
        })
        .then((res) => ({
          results: res.data?.results ?? [],
          metadata: { nextPageParam: page + 1, previousPageParam: page - 1 },
        }));
    },
    {
      getPreviousPageParam: (data) => data.metadata.previousPageParam,
      getNextPageParam: (data) => data.metadata.nextPageParam,
    },
  );
};
