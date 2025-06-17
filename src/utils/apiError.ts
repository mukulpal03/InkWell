class ApiError extends Error {
  public success: boolean;
  constructor(
    public statusCode: number,
    public message: string,
    public errors?: any,
    public stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = statusCode < 400;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
