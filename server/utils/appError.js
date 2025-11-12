export class AppError {
    constructor(message,statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        Error.captureStackTrace(this,this.constructor)
    }
}