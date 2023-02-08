export class CustomError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'CustomError';
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}

export class HTTPError extends CustomError {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super();
    this.name = 'HTTPError';
    this.status = status;
    this.message = message;
  }
}
