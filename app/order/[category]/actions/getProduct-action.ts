'use server';
import { prisma } from '@/src/lib/prisma';

export async function getProducts(category: string) {
	const products = await prisma.product.findMany({
		where: {
			category: {
				slug: category,
			},
		},
	});

	return products;
}
