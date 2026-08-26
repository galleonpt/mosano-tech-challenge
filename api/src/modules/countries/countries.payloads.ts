import { z } from 'zod';

export const CreateCountryPayload = z.object({
    name: z.string(),
});

export const UpdateCountryPayload = z.object({
    name: z.string().optional(),
});
