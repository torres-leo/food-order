import { redirect } from 'next/navigation';

import { prisma } from '@/src/lib/prisma';

import AddProductLink from '@/components/admin/AddProductLink';
import Heading from '@/components/ui/Heading';
import Pagination from '@/components/Products/Pagination';
import ProductsTable from '@/components/Products/ProductsTable';
import SearchForm from '@/components/Products/SearchForm';
import axios from 'axios';

async function productCount() {
	return await prisma.product.count();
}

// async function getImages() {
// 	'use server';
// 	const cloudflareUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`;

// 	try {
// 		const images = await axios(cloudflareUrl, {
// 			headers: {
// 				Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
// 				'X-Auth-Key': process.env.CLOUDFLARE_KEY,
// 			},
// 		});

// 		return images.data.result;
// 	} catch (error) {}
// }

async function getProducts(page: number, pageSize: number) {
	const skip = (page - 1) * pageSize;

	const products = await prisma.product.findMany({
		take: pageSize,
		skip,
		include: {
			category: true,
		},
	});

	return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {
	const page = +searchParams.page || 1;
	const pageSize = 10;

	const productsData = getProducts(page, pageSize);
	const totalProductsData = productCount();

	const [products, totalProducts] = await Promise.all([productsData, totalProductsData]);
	const totalPages = Math.ceil(totalProducts / pageSize);

	if (page > totalPages) {
		redirect(`/admin/products?page=${totalPages}`);
	}

	return (
		<>
			<Heading>Manage Products</Heading>

			<div className='mb-10 flex items-center gap-x-3 w-full'>
				<AddProductLink />

				<SearchForm />
			</div>

			<section className='flex flex-col justify-center items-center gap-y-10'>
				<ProductsTable products={products} />
				<Pagination page={page} totalPages={totalPages} />
			</section>
		</>
	);
}
