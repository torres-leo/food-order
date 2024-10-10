'use server';
import { prisma } from '@/src/lib/prisma';
import { OrderIdSchema } from '@/src/validator/orderIdSchema';
import { revalidatePath } from 'next/cache';

export async function cancelOrder(formData: FormData) {
	const data = {
		orderId: formData.get('order_id')!,
	};

	const result = OrderIdSchema.safeParse(data);

	if (result.success) {
		try {
			await prisma.orderProducts.deleteMany({ where: { orderId: result.data.orderId } });
			await prisma.order.delete({ where: { id: result.data.orderId } });
			revalidatePath('/admin/orders');
		} catch (error) {
			console.log(error);
		}
	}
}
