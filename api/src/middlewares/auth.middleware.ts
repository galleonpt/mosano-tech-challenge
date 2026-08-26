import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';

const DEFAULT_API_KEY = 'super-secret-key';

export const authMiddleware = (request: Request, _response: Response, next: NextFunction) => {
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || apiKey !== DEFAULT_API_KEY) {
        throw new AppError(401, {
            error: 'Unauthorized',
        });
    }

    next();
};
