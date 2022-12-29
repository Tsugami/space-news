import cron from 'node-cron';

import { AutoFillArticlesUsecase } from '#/modules/autofill/autofill-articles.usecase';
import { logger } from '#/modules/logging/logger';
import { inject, injectable } from 'inversify';
import { Scope } from '#/constants';

@injectable()
export class AutofillArticlesScheduledJob {
  #EVERY_9_AM = '0 0 9 * * *';
  #task!: cron.ScheduledTask;

  constructor(
    @inject(Scope.AUTOFILL_ARTICLE_USECASE)
    private readonly autofillArticlesUsecase: AutoFillArticlesUsecase,
  ) {}

  get started() {
    return !!this.#task;
  }

  init() {
    if (this.started) {
      return false;
    }

    this.#task = cron.schedule(this.#EVERY_9_AM, () => {
      this.autofillArticlesUsecase.registerAll();
    });

    logger.info('cronjob to register all external data configured');

    return true;
  }

  kill() {
    if (this.started) {
      return false;
    }

    this.#task?.stop();

    return true;
  }
}
