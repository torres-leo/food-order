import ProductsTable from '@/components/Products/ProductsTable';
import SearchForm from '@/components/Products/SearchForm';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';

type SearchProductPageProps = {
	searchParams: {
		search: string;
	};
};

async function searchProducts(search: string) {
	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: search,
				mode: 'insensitive',
			},
		},
		include: {
			category: true,
		},
	});

	return products;
}

async function SearchProductPage({ searchParams }: SearchProductPageProps) {
	const products = await searchProducts(searchParams.search);

	const renderProducts = () => {
		if (!products) {
			return (
				<div className='flex h-1/2 items-center justify-center'>
					<h2 className='text-center text-5xl font-semibold text-gray-400'>
						No products found for:{' '}
						<span className='underline underline-offset-8'>&lsquo;{searchParams.search}&rsquo;</span>
						<span className='text-4xl'>🧐</span>
					</h2>
				</div>
			);
		}

		return <ProductsTable products={products} />;
	};

	return (
		<>
			<Heading className='mb-10'>Results</Heading>

			<div className='flex flex-col gap-y-4 mb-6 w-2/3'>
				<SearchForm />
				{searchParams.search ? (
					<span className='block text-white text-2xl underline underline-offset-4'>for: {searchParams.search}</span>
				) : (
					''
				)}
			</div>

			{renderProducts()}
		</>
	);
}

export default SearchProductPage;
