import { z } from 'zod';

export const orderSchema = z.object({
	name: z.string().min(3, 'Name is required and must be at least 3 characters'),
	total: z.number().min(1, 'Total is required and must be at least $1'),
	order: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
			price: z.number(),
			quantity: z.number(),
			subtotal: z.number(),
		})
	),
});
