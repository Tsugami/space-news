import { inject, injectable } from 'inversify';
import { z } from 'zod';

import { Scope, StatusCode } from '#/constants';
import { HttpRequest, HttpResponse } from '#/modules/common/interfaces';
import { validateHttpRequest } from '#/modules/common/http-validation';

import { ArticleService } from './articles.service';

@injectable()
export class ArticleController {
  constructor(@inject(Scope.ARTICLE_SERVICE) private readonly articleService: ArticleService) {}

  #GET_SCHEMA = z.object({
    skip: z.preprocess(Number, z.number().min(0)).default(0),
    take: z.preprocess(Number, z.number().max(100).min(1)).default(100),
  });

  async onGet(req: HttpRequest, res: HttpResponse) {
    const input = await validateHttpRequest(req?.query, this.#GET_SCHEMA);
    const data = await this.articleService.findMany(input);

    res.header('X-Total-Count', data.metadata.total.toString());
    res.status(StatusCode.OK);
    res.json(data);
  }
}
