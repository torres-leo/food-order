'use client';

import useSWR from 'swr';
import OrderCard from '@/components/Order/OrderCard';
import Heading from '@/components/ui/Heading';
import { revalidatePath } from 'next/cache';
import { OrderProducts } from '@prisma/client';
import Loading from '@/components/Loading';

export default function OrdersPage() {
	const url = '/admin/orders/api';

	const fetcher = () =>
		fetch(url)
			.then((res) => res.json())
			.then((data) => data);

	const { data, error, isLoading } = useSWR<OrderProducts[]>(url, fetcher, {
		refreshInterval: 60000,
		revalidateOnFocus: false,
	});

	if (isLoading) return <Loading />;

	const renderOrders = () => {
		if (!data?.length) return;

		return (
			<div className='grid grid-cols-[repeat(auto-fill,minmax(200px,500px))] gap-5 place-content-center'>
				{data?.map((order) => (
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
