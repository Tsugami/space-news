import { AutofillArticlesScheduledJob } from './modules/autofill/autofill-articles.cronjob';

import { createContainer } from './container';
import { createExpressApp } from './adapters/express';
import { logger } from './modules/logging/logger';

export const startApp = async () => {
  const container = createContainer();

  const autofillArticleScheduledJob = container.get(AutofillArticlesScheduledJob);
  autofillArticleScheduledJob.init();

  const app = createExpressApp(container);

  app.listen(3001, () => logger.info('Server running at http://localhost:3001'));
};
