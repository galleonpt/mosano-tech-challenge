import type { NextFunction, Request, Response } from 'express';

const DEFAULT_API_KEY = 'super-secret-key';

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
    try {
        const apiKey = request.headers['x-api-key'];

        if (!apiKey || apiKey !== DEFAULT_API_KEY) {
            return response.status(401).json({
                error: 'Invalid authentication',
            });
        }

        next();
    } catch (error) {
        console.error('Error getting auth', error);
        throw new Error('Error getting auth');
    }
};
