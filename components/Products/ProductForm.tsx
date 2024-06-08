'use client';

import FloatingInput from '../ui/FloatingInput';
import DropdownCategory from './DropdownCategory';
import { useState } from 'react';
import Image from 'next/image';

type ProductFormProps = {
	categories: { id: number; name: string }[];
};

export default function ProductForm({ categories }: ProductFormProps) {
	const [imageProd, setImageProd] = useState<string>('');

	return (
		<div className='flex flex-col gap-y-6 text-white'>
			<FloatingInput label='product name' id='product-name' inputType='text' />

			<FloatingInput label='price' id='product-price' inputType='number' />

			<DropdownCategory options={categories} placeholder='Select Category...' />

			<input
				name='file'
				type='file'
				accept='.png, .jpeg, .jpg, .webp'
				onChange={(e) => {
					const file = e.target.files?.[0];

					if (file) {
						setImageProd(URL.createObjectURL(file));
					} else {
						setImageProd('');
					}
				}}
			/>

			{imageProd && (
				<div className='relative w-1/2 mx-auto h-60'>
					<Image src={imageProd} fill alt='image product' className='bg-cover bg-center bg-no-repeat rounded border' />
				</div>
			)}
		</div>
	);
}
