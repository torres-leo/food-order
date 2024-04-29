import AddProductForm from '@/components/Products/AddProductForm';
import ProductForm from '@/components/Products/ProductForm';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';

async function getCategories() {
	return await prisma.category.findMany({
		select: {
			id: true,
			name: true,
		},
	});
}

const AddProductPage = async () => {
	const categories = await getCategories();

	return (
		<>
			<Heading>New Product</Heading>

			<AddProductForm categories={categories}>
				<ProductForm categories={categories} />
			</AddProductForm>
		</>
	);
};

export default AddProductPage;
