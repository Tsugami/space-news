import { ExternalArticle } from '#/modules/external-articles/external-articles.interface';

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

export interface ArticleService {
  createMany(articles: ExternalArticle[]): Promise<void>;
}
