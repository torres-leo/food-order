import ProductsTable from '@/components/Products/ProductsTable';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';

async function getProducts() {
	const products = await prisma.product.findMany({
		include: {
			category: true,
		},
	});

	return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage() {
	const products = await getProducts();

	return (
		<>
			<Heading className='mb-10'>Manage Products</Heading>

			<ProductsTable products={products} />
		</>
	);
}
