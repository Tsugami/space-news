import { AutofillArticlesScheduledJob } from './modules/autofill/autofill-articles.cronjob';

import { createContainer } from './container';

export const startApp = async () => {
  const container = createContainer();

  const autofillArticleScheduledJob = container.get(AutofillArticlesScheduledJob);
  autofillArticleScheduledJob.init();
};
