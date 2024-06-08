import { z } from 'zod';

const IMG_MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

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
	image: z
		.any()
		.refine((files) => files?.[0]?.size <= IMG_MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine(
			(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
			'Only .jpg, .jpeg, .png and .webp formats are supported.'
		),
});
