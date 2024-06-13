/* eslint-disable no-unused-vars */
'use client';

import useSWR from 'swr';
import Heading from '@/components/ui/Heading';
import Logo from '@/components/ui/Logo';
import React from 'react';
import Loading from '@/components/Loading';
import LatestOrderItem from '@/components/Order/LatestOrderItem';
import { UserOrder } from '@/src/types/UserOrder';

export default function OrdersStatus() {
	const url = `orders/api`;

	const fetcher = () =>
		fetch(url)
			.then((res) => res.json())
			.then((data) => data);

	const { data, error, isLoading } = useSWR<UserOrder[]>(url, fetcher, {
		refreshInterval: 60000,
		revalidateOnFocus: false,
	});

	if (isLoading) return <Loading />;

	return (
		<section className='mt-10 max-w-[1200px] w-full mx-auto'>
			<Heading>Orders Ready</Heading>

			<div className='px-8 w-fit bg-white/30 mx-auto rounded relative mb-10'>
				<Logo />
			</div>

			{data?.length ? (
				<div className='grid grid-cols-3 gap-5 w-full'>
					{data.map((order) => {
						return <LatestOrderItem key={order.id} order={order} />;
					})}
				</div>
			) : (
				<h3 className='text-white text-center text-2xl font-semibold'>There are no orders ready</h3>
			)}
		</section>
	);
}
