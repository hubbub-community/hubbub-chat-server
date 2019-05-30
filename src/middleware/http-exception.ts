/**
 * HttpException object has properties that the Error object does not.
 * This class makes TypeScript happy. Otherwise add a status and message to an Error.
 * https://wanago.io/2018/12/17/typescript-express-error-handling-validation/
 */
class HttpException extends Error {
  /** Status code */
  public status: number;
  /** Error message */
  public message: string;
  /** Create an HttpException error */
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
