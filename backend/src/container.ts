import { container } from 'tsyringe';
import { ArticleService } from './modules/articles/articles.repository';
import { AutofillArticlesScheduledJob } from './modules/autofill/autofill-articles.cronjob';
import { AutoFillArticlesUsecase } from './modules/autofill/autofill-articles.usecase';
import { ExternalSpaceNewsArticleService } from './modules/external-articles/external-articles.service';
import { logger } from './modules/logging/logger';

const registries = [
  { token: 'ExternalArticleService', useClass: ExternalSpaceNewsArticleService },
  { token: 'ArticleService', useClass: ArticleService },
  { token: 'AutoFillArticlesUsecase', useClass: AutoFillArticlesUsecase },
  { token: 'AutofillArticlesScheduledJob', useClass: AutofillArticlesScheduledJob },
];

for (const registry of registries) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  container.register(registry.token, registry.useClass);

  container.afterResolution(
    registry.token,
    (_t, result: object) => {
      if ('init' in result && typeof result.init === 'function') {
        result.init();
      }

      logger.info(`[${registry.token}] registered!`);
    },
    { frequency: 'Once' },
  );
}
