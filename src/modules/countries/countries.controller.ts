import type { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { z } from 'zod';
import { Country } from '../../schemas/country.schema.js';

const CreateCountryPayload = z.object({
    name: z.string(),
});

const UpdateCountryPayload = z.object({
    name: z.string().optional(),
});

class CountriesController {
    public async create(request: Request, response: Response) {
        try {
            // 1 - Payload validations
            const result = CreateCountryPayload.safeParse(request.body);

            if (!result.success) {
                return response.status(422).json({
                    error: z.treeifyError(result.error),
                });
            }

            // 2 - Create the country
            const country = await Country.create({
                name: result.data.name,
            });

            response.status(201).json(country);
        } catch (error) {
            console.log('Error creating country', error);
            throw new Error('Error creating country');
        }
    }

    public async listAll(request: Request, response: Response) {
        try {
            const countries = await Country.find();
            response.status(200).json(countries);
        } catch (error) {
            console.log('Error listing countries', error);
            throw new Error('Error listing countries');
        }
    }

    public async update(request: Request, response: Response) {
        try {
            const countryId = request.params.country_id;

            // 1 - Payload validations
            const result = UpdateCountryPayload.safeParse(request.body);

            if (!result.success) {
                return response.status(422).json({
                    error: z.treeifyError(result.error),
                });
            }

            const country = await Country.findById(countryId);
            if (!country) {
                return response.status(404).json({
                    error: 'Country not found',
                });
            }

            // 2 - Update country values
            const { name } = result.data;
            if (name) {
                country.name = name;
            }

            await country.save();

            response.status(201).json(country);
        } catch (error) {
            console.log('Error creating country', error);
            throw new Error('Error creating country');
        }
    }

    public async delete(request: Request, response: Response) {
        try {
            const countryId = request.params.country_id;

            if (!isValidObjectId(countryId)) {
                return response.status(400).json({
                    error: 'Invalid country identifier',
                });
            }

            await Country.deleteOne({ _id: countryId });
            response.status(204).send();
        } catch (error) {
            console.log('Error deleting country', error);
            throw new Error('Error deleting country');
        }
    }
}

export default new CountriesController();
