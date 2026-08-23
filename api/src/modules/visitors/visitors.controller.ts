import type { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { z } from 'zod';
import { Country } from '../../schemas/country.schema.js';
import { Visitor } from '../../schemas/visitor.schema.js';

const CreateVisitorPayload = z.object({
    name: z.string(),
    surname: z.string(),
    country_id: z.string().refine(isValidObjectId),
    birthday: z.coerce.date().refine((date) => date <= new Date(), 'Birthday cannot be in the future'),
});

class VisitorsController {
    public async create(request: Request, response: Response) {
        try {
            // 1 - Payload validations
            const result = CreateVisitorPayload.safeParse(request.body);

            if (!result.success) {
                return response.status(422).json({
                    errors: z.treeifyError(result.error),
                });
            }

            // 2 - Get the selected country
            const country = await Country.findById(result.data.country_id);
            if (!country) {
                return response.status(404).json({
                    error: 'Country not found',
                });
            }

            // 3 - Create the visitor entry with country snapshot
            const visitor = await Visitor.create({
                name: result.data.name,
                surname: result.data.surname,
                country: {
                    name: country.name,
                },
                birthday: result.data.birthday,
                created_at: new Date(),
            });

            response.status(201).json(visitor);
        } catch (error) {
            console.log('Error creating visitor', error);
            throw new Error('Error creating visitor');
        }
    }

    public async listAll(_request: Request, response: Response) {
        try {
            const visitors = await Visitor.find();
            response.status(200).json(visitors);
        } catch (error) {
            console.log('Error listing visitors', error);
            throw new Error('Error listing visitors');
        }
    }
}

export default new VisitorsController();
