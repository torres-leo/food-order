import { z } from 'zod';

export const OrderIdSchema = z.object({
	orderId: z
		.string()
		.transform((val) => parseInt(val))
		.refine((val) => val > 0, {
			message: 'Invalid order id',
		}),
});
