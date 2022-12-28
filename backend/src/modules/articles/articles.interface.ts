import { ExternalArticle } from '#/modules/external-articles/external-articles.interface';

export interface ArticleService {
  createMany(articles: ExternalArticle[]): Promise<void>;
}
