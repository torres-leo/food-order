'use server';

import { ProductSchema } from '@/src/validator/productSchema';
import { prisma } from '../prisma';
import { revalidatePath } from 'next/cache';

export async function updateProduct(data: unknown, id: number) {
	const result = ProductSchema.safeParse(data);

	if (!result.success) {
		return {
			errors: result.error.issues,
		};
	}

	try {
		await prisma.product.update({
			where: {
				id,
			},
			data: {
				name: result.data.name,
				price: result.data.price,
				categoryId: result.data.categoryId,
				imagePath: result.data.imagePath,
			},
		});

		revalidatePath('/admin/products');
	} catch (error) {
		console.log(error);
	}
}
