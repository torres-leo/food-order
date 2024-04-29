'use client';

import { useGlobalStore } from '@/store/global';
import FloatingInput from '../ui/FloatingInput';
import DropdownCategory from './DropdownCategory';

type ProductFormProps = {
	categories: { id: number; name: string }[];
};

export default function ProductForm({ categories }: ProductFormProps) {
	const { setImageProd } = useGlobalStore();

	return (
		<div className='flex flex-col gap-y-6 text-white'>
			<FloatingInput label='product name' id='product-name' inputType='text' />

			<FloatingInput label='price' id='product-price' inputType='number' />

			<DropdownCategory options={categories} placeholder='Select Category...' />

			{/* <input
				name='file'
				type='file'
				accept='.png, .jpeg, .jpg, .webp'
				onChange={(e) => {
					const file = e.target.files?.[0];
					setImageProd(file);
				}}
			/> */}
		</div>
	);
}
