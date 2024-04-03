import { Category } from '@prisma/client';
import { prisma } from '@/src/lib/prisma';
import CategoryItem from '../ui/CategoryItem';
import Link from 'next/link';

async function getCatergories(): Promise<Category[]> {
	return await prisma.category.findMany();
}

export default async function OrderSidebar() {
	const categories = await getCatergories();

	const renderCategories = categories.map((category) => {
		return (
			<Link key={category.id} href={`/order/${category.slug}`}>
				<CategoryItem category={category} />
			</Link>
		);
	});

	return (
		<aside className='md:w-72 md:h-screen bg-white/90 dark:bg-white/10 py-6 px-3 overflow-y-hidden'>
			<h3 className='mb-6 text-center font-semibold text-xl select-none'>Categories</h3>
			<nav>{renderCategories}</nav>
		</aside>
	);
}
