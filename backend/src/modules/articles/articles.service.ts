import { inject, injectable } from 'inversify';

import { ArticleService as IArticleService } from '#/modules/articles/articles.interface';
import { ExternalArticle } from '#/modules/external-articles/external-articles.interface';
import { PrismaService } from '#/modules/prisma/prisma.service';
import { Scope } from '#/constants';

@injectable()
export class ArticleService implements IArticleService {
  constructor(@inject(Scope.PRISMA_SERVICE) private readonly prismaService: PrismaService) {}

  async createMany(articles: ExternalArticle[]): Promise<void> {
    for (const externalArticle of articles) {
      const input = {
        external_id: String(externalArticle.id),
        featured: externalArticle.featured,
        imageUrl: externalArticle.imageUrl,
        newsSite: externalArticle.newsSite,
        summary: externalArticle.summary,
        title: externalArticle.title,
        url: externalArticle.url,
        events: {
          connectOrCreate: externalArticle.events.map((event) => ({
            create: { external_id: String(event.id), provider: event.provider },
            where: { external_id: String(event.id) },
          })),
        },
        launches: {
          connectOrCreate: externalArticle.launches.map((launch) => ({
            create: { external_id: String(launch.id), provider: launch.provider },
            where: { external_id: String(launch.id) },
          })),
        },
      };

      await this.prismaService.articles.upsert({
        create: input,
        update: input,
        where: { external_id: String(externalArticle.id) },
      });
    }
  }
}
