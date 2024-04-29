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

	await prisma.product.create({
		data: result.data,
	});
}
