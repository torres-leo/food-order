'use client';
import { Category } from '@prisma/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { getCategories } from '@/src/lib/actions/getCategories';

import CategoryItem from '../ui/CategoryItem';

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
		return (
			<Link key={category.id} href={`/order/${category.slug}`}>
				<CategoryItem category={category} />
			</Link>
		);
	});

	return (
		<aside className='md:w-60 xl:w-72 md:h-screen bg-white/90 dark:bg-white/10 py-6 px-3 overflow-y-hidden'>
			<h3 className='mb-6 text-center font-semibold text-xl select-none'>Categories</h3>
			<nav>{renderCategories}</nav>
		</aside>
	);
}
