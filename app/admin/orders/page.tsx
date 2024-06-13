import OrderCard from '@/components/Order/OrderCard';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

async function getPendingOrders() {
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

	return orders;
}

export default async function page() {
	const orders = await getPendingOrders();

	const renderOrders = () => {
		if (!orders.length) {
			return <h3 className='text-white text-center text-2xl font-semibold'>There are no orders</h3>;
		}

		return (
			<div className='grid grid-cols-[repeat(auto-fill,minmax(200px,500px))] gap-5 place-content-center'>
				{orders.map((order) => (
					<OrderCard order={order} key={crypto.randomUUID()} />
				))}
			</div>
		);
	};

	const refreshOrders = async () => {
		'use server';

		revalidatePath('/admin/orders');
	};

	return (
		<section className='max-w-[1200px] w-full mx-auto px-10'>
			<Heading>Manage Orders</Heading>

			<form action={refreshOrders} className='mb-10'>
				<input type='submit' value='Update Orders' className='update-orders' />
			</form>

			{renderOrders()}
		</section>
	);
}
