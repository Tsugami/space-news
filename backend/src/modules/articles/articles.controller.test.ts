import 'reflect-metadata';

import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createExpressApp } from '#/adapters/express';
import { createContainer } from '#/container';
import { Scope } from '#/constants';
import { Article, ArticleService } from './articles.interface';

describe('GET Articles', () => {
  const unsafeClass = <T>(obj: Partial<T>): T => {
    return obj as T;
  };

  const mockResult = {
    metadata: { total: 1 },
    results: [
      unsafeClass<Article>({ id: 1 }),
      unsafeClass<Article>({ id: 2 }),
      unsafeClass<Article>({ id: 3 }),
    ],
  };

  const articleService = unsafeClass<ArticleService>({
    async findMany() {
      return mockResult;
    },
  });

  const createApp = () => {
    const container = createContainer();

    container.unbind(Scope.ARTICLE_SERVICE);
    container.bind(Scope.ARTICLE_SERVICE).toDynamicValue(() => articleService);

    return createExpressApp(container);
  };

  const app = createApp();

  it('should returns 200 when success', async () => {
    const response = await request(app).get('/articles').expect(200);

    expect(response.body).toStrictEqual(mockResult);
  });

  it('should returns 200 when pass valid take query is provided', async () => {
    const response = await request(app).get('/articles?=take=1').expect(200);

    expect(response.body).toStrictEqual(mockResult);
  });

  it('should returns 400 when invalid take query is provided', async () => {
    const response = await request(app).get('/articles?take=invalid_take').expect(400);

    expect(response.body).toStrictEqual({
      error: {
        message: 'Expected number, received nan',
        path: ['take'],
      },
    });
  });

  it('should returns 200 when pass valid skip query is provided', async () => {
    const response = await request(app).get('/articles?=skip=1').expect(200);

    expect(response.body).toStrictEqual(mockResult);
  });

  it('should returns 400 when invalid skip query is provided', async () => {
    const response = await request(app).get('/articles?skip=invalid_skip').expect(400);

    expect(response.body).toStrictEqual({
      error: {
        message: 'Expected number, received nan',
        path: ['skip'],
      },
    });
  });
});
