'use server';

import { orderSchema } from '@/src/validator/schema';
import { prisma } from '@/src/lib/prisma';

export async function CreateOrder(data: unknown) {
	const result = orderSchema.safeParse(data);

	if (!result.success) return { errors: result.error.issues };

	try {
		await prisma.order.create({
			data: {
				name: result.data.name,
				total: result.data.total,
				orderProducts: {
					create: result.data.order.map((product) => ({
						productId: product.id,
						quantity: product.quantity,
					})),
				},
			},
		});
	} catch (error) {
		console.log(error);
	}
}
