'use client';
import { Category } from '@prisma/client';
import { useEffect, useState } from 'react';

import { getCategories } from '@/src/utils/getCategories';

import CategoryItem from '../ui/CategoryItem';
import Logo from '../ui/Logo';
import Link from 'next/link';

export default function OrderSidebar() {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const data = await getCategories();
				setCategories(data);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		fetchCategories();
	}, []);

	const renderCategories = categories.map((category) => {
		return <CategoryItem category={category} key={category.id} />;
	});

	return (
		<aside className='aside flex flex-col justify-between'>
			<div>
				<Logo redirect='order/coffee' />
				<p className='mb-6 text-center font-semibold text-xl select-none'>Categories</p>
				<nav>{renderCategories}</nav>
			</div>

			<Link
				href='/admin/orders'
				target='_blank'
				className='capitalize text-amber-400 text-center w-fit mx-auto hover:text-white transition-colors px-4 py-1 border border-amber-400'>
				Go to admin page
			</Link>
		</aside>
	);
}
