import type { Request, Response } from 'express';
import { VisitorsService } from './visitors.service.js';

export class VisitorsController {
    private visitorsService: VisitorsService;
    constructor() {
        this.visitorsService = new VisitorsService();
    }

    public create = async (request: Request, response: Response) => {
        const payload = request.body;

        const createdVisitor = await this.visitorsService.create(payload);
        response.status(201).json(createdVisitor);
    };

    public listAll = async (_request: Request, response: Response) => {
        const visitors = await this.visitorsService.listAll();
        response.status(200).json(visitors);
    };
}
