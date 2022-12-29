import { Container } from 'inversify';
import { Scope } from './constants';
import { ArticleService } from './modules/articles/articles.repository';
import { AutofillArticlesScheduledJob } from './modules/autofill/autofill-articles.cronjob';
import { AutoFillArticlesUsecase } from './modules/autofill/autofill-articles.usecase';
import { ExternalSpaceNewsArticleService } from './modules/external-articles/external-articles.service';
import { PrismaService } from './modules/prisma/prisma.service';

export const createContainer = () => {
  const container = new Container();

  const prisma = new PrismaService();
  container.bind(Scope.PRISMA_SERVICE).toDynamicValue(() => prisma);

  container
    .bind(Scope.EXTERNAL_ARTICLE_SERVICE)
    .to(ExternalSpaceNewsArticleService)
    .inSingletonScope();

  container.bind(Scope.ARTICLE_SERVICE).to(ArticleService).inSingletonScope();

  container.bind(Scope.AUTOFILL_ARTICLE_USECASE).to(AutoFillArticlesUsecase).inSingletonScope();

  container.bind(AutofillArticlesScheduledJob).toSelf();

  return container;
};
