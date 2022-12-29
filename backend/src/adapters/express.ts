import type { Container } from 'inversify';

import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ArticleController } from '#/modules/articles/articles.controller';
import { HttpException } from '#/modules/common/http-exception';
import { StatusCode } from '#/constants';

export const createExpressApp = (container: Container) => {
  const app = express();

  const articleController = container.get(ArticleController);
  app.get(
    '/articles',
    wrapError((req, res) => articleController.onGet(req, res)),
  );
  app.use(handleError);

  return app;
};

const handleError: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({ error: { message: err.message, path: err.path } });
  } else {
    res.status(StatusCode.SERVER_INTERNAL_ERROR).json({
      error: { message: 'SERVER_INTERNAL_ERROR' },
    });
  }

  return next();
};

type RequestFunction = (req: Request, res: Response) => Promise<unknown>;

const wrapError =
  (handler: RequestFunction) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };
