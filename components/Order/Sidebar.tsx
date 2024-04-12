'use client';
import { Category } from '@prisma/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { getCategories } from '@/src/utils/getCategories';

import CategoryItem from '../ui/CategoryItem';
import Logo from '../ui/Logo';

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
		<aside className='aside'>
			<Logo redirect='order/coffee' />
			<p className='mb-6 text-center font-semibold text-xl select-none'>Categories</p>
			<nav>{renderCategories}</nav>
		</aside>
	);
}
