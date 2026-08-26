import { isValidObjectId } from 'mongoose';
import { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import { Country } from '../../schemas/country.schema.js';
import { CreateCountryPayload, UpdateCountryPayload } from './countries.payloads.js';

type TCreateCountryPayload = z.infer<typeof CreateCountryPayload>;
type TUpdateCountryPayload = z.infer<typeof UpdateCountryPayload>;

export class CountriesService {
    public async create(payload: TCreateCountryPayload) {
        try {
            // 1 - Payload validations
            const result = CreateCountryPayload.safeParse(payload);

            if (!result.success) {
                throw new AppError(422, {
                    errors: z.treeifyError(result.error),
                });
            }

            // 2 - Create the country
            const country = await Country.create({
                name: result.data.name,
            });

            return country;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(500, {
                message: 'Error creating country',
            });
        }
    }

    public async listAll() {
        try {
            const countries = await Country.find();
            return countries;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(500, {
                message: 'Error listing countries',
            });
        }
    }

    public async update(countryId: string, payload: TUpdateCountryPayload) {
        try {
            // 1 - Validate country ID
            if (!isValidObjectId(countryId)) {
                throw new AppError(400, {
                    error: 'Invalid country identifier',
                });
            }

            // 2 - Payload validations
            const result = UpdateCountryPayload.safeParse(payload);

            if (!result.success) {
                throw new AppError(422, {
                    errors: z.treeifyError(result.error),
                });
            }

            // 3 - Check if country exists
            const country = await Country.findById(countryId);
            if (!country) {
                throw new AppError(404, {
                    error: 'Country not found',
                });
            }

            // 4 - Update country values
            const { name } = result.data;
            if (name) {
                country.name = name;
            }

            await country.save();

            return country;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(500, {
                message: 'Error updating country',
            });
        }
    }

    public async delete(countryId: string) {
        try {
            // 1 - Validate country ID
            if (!isValidObjectId(countryId)) {
                throw new AppError(400, {
                    error: 'Invalid country identifier',
                });
            }

            // 2 - Delete country
            await Country.deleteOne({ _id: countryId });
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(500, {
                message: 'Error deleting country',
            });
        }
    }
}
