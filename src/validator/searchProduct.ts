import { z } from 'zod';

export const searchProductSchema = z.object({
	search: z.string().trim().min(1, { message: 'Search query must be at least 1 character long' }),
});
