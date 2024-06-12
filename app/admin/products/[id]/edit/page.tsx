import EditProductForm from '@/components/Products/EditProductForm';
import ProductForm from '@/components/Products/ProductForm';
import GoBackButton from '@/components/ui/GoBackButton';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';
import { notFound } from 'next/navigation';

async function getCategories() {
	return await prisma.category.findMany({
		select: {
			id: true,
			name: true,
		},
	});
}

async function getProductById(id: number) {
	const product = await prisma.product.findUnique({
		where: {
			id,
		},
	});

	if (!product) {
		notFound();
	}

	return product;
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
	const categories = await getCategories();

	const product = await getProductById(+params.id);

	return (
		<>
			<Heading>Edit Product</Heading>
			<GoBackButton className='mb-10' />
			<EditProductForm categories={categories} product={product}>
				<ProductForm categories={categories} product={product}></ProductForm>
			</EditProductForm>
		</>
	);
}
