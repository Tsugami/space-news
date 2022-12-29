import { ZodSchema, ZodError } from 'zod';

import { StatusCode } from '#/constants';
import { HttpException } from './http-exception';

export const validateHttpRequest = <O, T = object>(
  input: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  zodSchema: ZodSchema<O, any, unknown>,
): O => {
  try {
    return zodSchema.parse(input);
  } catch (err) {
    if (err instanceof ZodError) {
      const issue = err.issues[0];
      throw new HttpException(StatusCode.BAD_REQUEST, issue.message, issue.path);
    }

    throw err;
  }
};
