import Pagination from '@/components/Products/Pagination';
import ProductsTable from '@/components/Products/ProductsTable';
import SearchForm from '@/components/Products/SearchForm';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function productCount() {
	return await prisma.product.count();
}

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
			<Heading className='mb-10'>Manage Products</Heading>

			<div className='mb-10 flex items-center gap-x-3 w-full'>
				<Link
					href={`/admin/products/add`}
					className='block min-w-fit py-2 px-3 border-2 border-amber-400 rounded text-amber-300 hover:bg-amber-400 hover:text-white transition'>
					<span className='font-semibold rounded-full text-base'>+</span> Add Product
				</Link>

				<SearchForm />
			</div>

			<section className='flex flex-col justify-center items-center gap-y-10'>
				<ProductsTable products={products} />
				<Pagination page={page} totalPages={totalPages} />
			</section>
		</>
	);
}
