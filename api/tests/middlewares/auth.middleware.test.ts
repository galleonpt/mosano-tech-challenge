import { describe, expect, it, jest } from '@jest/globals';
import type { NextFunction } from 'express';
import { AppError } from '../../src/errors/AppError.js';
import { authMiddleware } from '../../src/middlewares/auth.middleware.js';

describe('authMiddleware', () => {
    it('should throw an error if the header is not defined', () => {
        const request = {
            headers: {},
        } as unknown as Request;

        const response = {} as unknown as Response;
        const next = jest.fn() as NextFunction;

        expect(() => authMiddleware(request, response, next)).toThrow(AppError);
    });

    it('should throw an error if the header is not the correct one', () => {
        const request = {
            headers: {
                'x-api-key': 'wrong-key',
            },
        } as unknown as Request;

        const response = {} as unknown as Response;
        const next = jest.fn() as NextFunction;

        expect(() => authMiddleware(request, response, next)).toThrow(AppError);
    });

    it('should call the next function', () => {
        const request = {
            headers: {
                'x-api-key': 'super-secret-key',
            },
        } as unknown as Request;

        const response = {} as unknown as Response;
        const next = jest.fn() as NextFunction;

        authMiddleware(request, response, next);

        expect(next).toHaveBeenCalled();
    });
});
