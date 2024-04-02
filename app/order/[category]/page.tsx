'use client';
import { Fragment, useEffect, useState } from 'react';
import { Product } from '@prisma/client';

import HamburgerIcon from '@/components/Icons/HamburgerIcon';
import Section from '@/components/SectionContainer/Section';
import { useStatesStore } from '@/store/states';
import { getProducts } from './actions/getProduct-action';
import Loading from '@/components/Loading';
import ProductCard from '@/components/ui/ProductCard';

function OrderPage({ params }: { params: { category: string } }) {
	const [products, setProducts] = useState<Product[]>();
	const { handleOrderSideBar, loading, setLoading } = useStatesStore();

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
		return products?.map((product) => {
			return <ProductCard key={product.id} product={product} />;
		});
	};

	return (
		<Section className='' wpClasses=''>
			<div className='flex items-center justify-between mb-10'>
				<h2>OrderPage</h2>
				<button className='relative' onClick={handleOrderSideBar}>
					<HamburgerIcon className='size-10 dark:hover:opacity-65' />
					<HamburgerIcon className='size-10 absolute top-0 hover:blur-lg' />
				</button>
			</div>

			{loading && <Loading />}
			<div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 '>{renderProducts()}</div>
		</Section>
	);
}

export default OrderPage;
