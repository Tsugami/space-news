export class HttpException extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly path?: (string | number)[],
  ) {
    super(message);
  }
}
