import 'reflect-metadata';

import { AutoFillArticlesUsecase } from './autofill-articles.usecase';
import { expect, it, describe, vi } from 'vitest';
import type {
  ExternalArticle,
  ExternalArticleService,
} from '#/modules/external-articles/external-articles.interface';
import type { ArticleService } from '#/modules/articles/articles.interface';

const unsafeClass = <T>(obj: Partial<T>): T => {
  return obj as T;
};

describe('Autofill Articles UseCase', () => {
  it('should register external articles', async () => {
    const externalArticleServiceSpy = unsafeClass<ExternalArticleService>({
      findAll: vi.fn(async function* () {
        yield [{ id: 1 }] as ExternalArticle[];
        yield [{ id: 2 }] as ExternalArticle[];
      }),
    });

    const articleServiceSpy = unsafeClass<ArticleService>({ createMany: vi.fn() });

    const autofill = new AutoFillArticlesUsecase(articleServiceSpy, externalArticleServiceSpy);

    await autofill.registerAll();

    expect(externalArticleServiceSpy.findAll).toBeCalledTimes(1);
    expect(articleServiceSpy.createMany).toHaveBeenCalledWith([{ id: 1 }]);
    expect(articleServiceSpy.createMany).toHaveBeenCalledWith([{ id: 2 }]);
  });
});
