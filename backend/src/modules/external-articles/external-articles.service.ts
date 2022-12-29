import type {
  ExternalArticle,
  ExternalArticleService,
  GetAllExternalArticlesInput,
} from './external-articles.interface';
import axios from 'axios';
import { injectable } from 'inversify';

@injectable()
export class ExternalSpaceNewsArticleService implements ExternalArticleService {
  async *findAll(input: GetAllExternalArticlesInput): AsyncGenerator<ExternalArticle[]> {
    const request = (skip: number) => {
      const base_uri = 'https://api.spaceflightnewsapi.net/v3';
      const route = '/articles';

      return axios.get<ExternalArticle[]>(`${base_uri}${route}`, {
        params: { _limit: input.perPage, _start: skip },
      });
    };

    let skip = 0;
    let hasNext = true;

    while (hasNext) {
      const res = await request(skip);
      if (res.data.length < input.perPage || skip + res.data.length >= input.max) {
        hasNext = false;
      }

      yield res.data;
      skip += input.perPage;
    }
  }
}
