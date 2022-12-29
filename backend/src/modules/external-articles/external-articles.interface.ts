export interface ExternalArticle {
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

export type GetAllExternalArticlesInput = { perPage: number; max: number };

export interface ExternalArticleService {
  findAll(input: GetAllExternalArticlesInput): AsyncGenerator<ExternalArticle[]>;
}
