'use server';

import { ProductSchema } from '@/src/validator/productSchema';
import { prisma } from '../prisma';

export async function createProduct(data: unknown) {
	const result = ProductSchema.safeParse(data);

	if (!result.success) {
		return {
			errors: result.error.issues,
		};
	}

	try {
		await prisma.product.create({
			data: {
				name: result.data.name,
				price: result.data.price,
				categoryId: result.data.categoryId,
				imageId: result.data.imageId,
				image_name: result.data.name.replaceAll(' ', '_').replaceAll('-', '').toLowerCase(),
			},
		});
	} catch (error) {
		console.log(error);
	}
}
