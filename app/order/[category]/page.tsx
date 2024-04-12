'use client';
import { useEffect, useState } from 'react';
import { Product } from '@prisma/client';

import { getProducts } from '@/src/utils/getProducts';
import { useStatesStore } from '@/store/states';

import HamburgerIcon from '@/components/Icons/HamburgerIcon';
import Loading from '@/components/Loading';
import ProductCard from '@/components/Products/ProductCard';
import Section from '@/components/SectionContainer/Section';
import Heading from '@/components/ui/Heading';

function OrderPage({ params }: { params: { category: string } }) {
	const [products, setProducts] = useState<Product[]>();
	const { orderSideBar, handleOrderSideBar, loading, setLoading } = useStatesStore();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const data = await getProducts(params.category);
				setProducts(data);
			} catch (error) {
				console.error('Error fetching products:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [params.category, setLoading]);

	const renderProducts = () => {
		if (loading) return <Loading />;

		return (
			<div
				className={`grid grid-cols-1 gap-x-6 items-start gap-y-10 place-items-center xl:place-items-start transition overflow-y-auto max-h-screen pb-44 scrollbar ${
					orderSideBar
						? 'lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3'
						: 'md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
				}`}>
				{products?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		);
	};

	return (
		<Section className='' wpClasses=''>
			<div className='flex items-center justify-between mb-10'>
				<Heading>Menu</Heading>
				<button className='relative' onClick={handleOrderSideBar}>
					<HamburgerIcon className='size-10 dark:hover:opacity-65' />
					<HamburgerIcon className='size-10 absolute top-0 hover:blur-lg hover:opacity-65' />
				</button>
			</div>

			{renderProducts()}
		</Section>
	);
}

export default OrderPage;
