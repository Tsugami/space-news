import type {
  ExternalArticle,
  ExternalArticleService,
  GetAllExternalArticlesInput,
} from './external-articles.interface';
import axios from 'axios';

export class ExternalSpaceNewsArticleService implements ExternalArticleService {
  async *findAll(input: GetAllExternalArticlesInput): AsyncGenerator<ExternalArticle[]> {
    const request = (skip: number) => {
      const base_uri = 'https://api.spaceflightnewsapi.net/v3';
      const route = '/articles';

      return axios.get<ExternalArticle[]>(`${base_uri}${route}`, {
        params: { _limit: input.perPage, _start: skip },
      });
    };

    const skip = 0;
    let hasNext = true;

    while (hasNext) {
      try {
        const res = await request(skip);
        if (res.data.length < input.perPage) {
          hasNext = false;
        }

        yield res.data;
      } catch (er) {
        console.log('err', er);
      }
    }
  }
}
