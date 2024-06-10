import OrderCard from '@/components/Order/OrderCard';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';
import { Order, OrderProducts } from '@prisma/client';

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
		if (!orders.length) return;

		return (
			<div className='grid grid-cols-[repeat(auto-fill,minmax(200px,500px))] gap-5 place-content-center'>
				{orders.map((order) => (
					<OrderCard order={order} key={crypto.randomUUID()} />
				))}
			</div>
		);
	};

	return (
		<>
			<Heading>Manage Orders</Heading>

			{renderOrders()}
		</>
	);
}
