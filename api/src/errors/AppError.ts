export class AppError extends Error {
    constructor(
        public statusCode: number,
        public error: Record<string, unknown>
    ) {
        super(error.message as string);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
