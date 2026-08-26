import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const CreateVisitorPayload = z.object({
    name: z.string(),
    surname: z.string(),
    country_id: z.string().refine(isValidObjectId),
    birthday: z.coerce.date().refine((date) => date <= new Date(), 'Birthday cannot be in the future'),
});
