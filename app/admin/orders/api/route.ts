import { prisma } from '@/src/lib/prisma';

export async function GET() {
	const orders = await prisma.order.findMany({
		where: {
			status: false,
		},

		// Next code is for get the products that are related to the order
		include: {
			orderProducts: {
				include: {
					product: true,
				},
			},
		},
	});

	return Response.json(orders);
}
