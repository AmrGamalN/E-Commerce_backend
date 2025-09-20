export class CustomError extends Error {
    statusCode;
    statusText;
    error;
    constructor(message, statusCode=500, statusText="Internal Server Error",error=undefined) {
        super(message);
        this.message= message;
        this.statusCode = statusCode;
        this.statusText=  statusText;
        this.error=error;
        this.stack = (new Error()).stack;

    }   }