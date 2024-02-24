class CustomError extends Error {
    constructor(code, message, statusCode) {
      super(message);
      this.name = this.constructor.name;
      this.code = code || 'INTERNAL_SERVER_ERROR';
      this.statusCode = statusCode || 500;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = CustomError;
  