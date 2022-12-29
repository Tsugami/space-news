import 'reflect-metadata';

import { AutoFillArticlesUsecase } from '#/modules/autofill/autofill-articles.usecase';

import { createContainer } from '../container';

const container = createContainer();

const autofill = container.resolve(AutoFillArticlesUsecase);
autofill.registerAll().then(() => console.log('autofill finished!'));
