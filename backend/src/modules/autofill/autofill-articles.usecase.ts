import type { ArticleService } from '#/interfaces/articles.interface';
import type { ExternalArticleService } from '#/interfaces/external-articles.interface';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AutoFillArticlesUsecase {
  constructor(
    @inject('ArticleService')
    private readonly articleService: ArticleService,
    @inject('ExternalArticleService')
    private readonly externalArticleService: ExternalArticleService,
  ) {}

  async registerAll() {
    const options = { perPage: 100 };

    for await (const articles of this.externalArticleService.findAll(options)) {
      await this.articleService.createMany(articles);
    }
  }
}