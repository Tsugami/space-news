import { container } from 'tsyringe';
import { AutofillArticlesScheduledJob } from './modules/autofill/autofill-articles.cronjob';

import './container';

export const startApp = async () => {
  const autofillArticleScheduledJob = container.resolve(AutofillArticlesScheduledJob);
  autofillArticleScheduledJob.init();
};
