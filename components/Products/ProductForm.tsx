import { prisma } from '@/src/lib/prisma';
import FloatingInput from '../ui/FloatingInput';
import DropdownCategory from './DropdownCategory';

async function getCategories() {
	return await prisma.category.findMany({
		select: {
			id: true,
			name: true,
		},
	});
}

export default async function ProductForm() {
	const categories = await getCategories();

	return (
		<div className='flex flex-col gap-y-4 text-white'>
			<FloatingInput label='product name' id='product-name' inputType='text' />

			<FloatingInput label='price' id='product-price' inputType='text' />

			<DropdownCategory options={categories} placeholder='Select Category...' />
		</div>
	);
}
