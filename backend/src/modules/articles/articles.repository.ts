import { injectable } from 'inversify';

import { ArticleService as IArticleService } from '#/modules/articles/articles.interface';
import { ExternalArticle } from '#/modules/external-articles/external-articles.interface';

@injectable()
export class ArticleService implements IArticleService {
  createMany(_articles: ExternalArticle[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
