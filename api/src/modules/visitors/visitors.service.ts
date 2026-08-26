import { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import { Country } from '../../schemas/country.schema.js';
import { Visitor } from '../../schemas/visitor.schema.js';
import { CreateVisitorPayload } from './visitors.payloads.js';

type TCreateVisitorPayload = z.infer<typeof CreateVisitorPayload>;

export class VisitorsService {
    public async create(payload: TCreateVisitorPayload) {
        try {
            // 1 - Payload validations
            const result = CreateVisitorPayload.safeParse(payload);

            if (!result.success) {
                throw new AppError(422, {
                    errors: z.treeifyError(result.error),
                });
            }

            // 2 - Get the selected country
            const country = await Country.findById(result.data.country_id);
            if (!country) {
                throw new AppError(404, {
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

            return visitor;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(500, {
                message: 'Error creating visitor',
            });
        }
    }

    public async listAll() {
        try {
            const visitors = await Visitor.find();
            return visitors;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(500, {
                message: 'Error listing visitors',
            });
        }
    }
}
