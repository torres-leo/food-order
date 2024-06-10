import { z } from 'zod';

export const ProductSchema = z.object({
	name: z.string().trim().min(1, { message: "Name can't be empty" }),
	price: z
		.string()
		.trim()
		.transform((value) => parseFloat(value))
		.refine((value) => value > 0, { message: 'Price is not valid' })
		.or(z.number().min(1, { message: 'Must be higher than 0' })),
	categoryId: z
		.string()
		.trim()
		.transform((value) => parseInt(value))
		.refine((value) => value > 0, { message: 'Category is required' })
		.or(z.number().min(1, { message: 'Category is required' })),
	imageId: z.string().min(1, { message: 'Image is required' }),
});
