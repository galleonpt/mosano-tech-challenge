import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';

export const errorHandler = (error: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.error);
    }

    console.error(error);
    return response.status(500).json({
        message: 'Internal server error',
        status: 500,
    });
};
