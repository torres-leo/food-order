'use client';

import FloatingInput from '../ui/FloatingInput';
import DropdownCategory from './DropdownCategory';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useGlobalStore } from '@/store/global';
import { Product } from '@prisma/client';
import { getImagePath } from '@/src/utils/getImagePath';

type ProductFormProps = {
	categories: { id: number; name: string }[];
	product?: Product;
};

export default function ProductForm({ categories, product }: ProductFormProps) {
	const [imageProd, setImageProd] = useState<string>('');
	const { setImageProduct } = useGlobalStore();

	useEffect(() => {
		if (product) {
			const image = getImagePath(product.imagePath);

			setImageProd(image);

			if (image.startsWith('/images/products')) {
				setImageProduct(image.split('/').pop()?.split('.')[0] as string);
			} else {
				setImageProduct(image);
			}
		}
	}, [product, setImageProduct]);

	return (
		<div className='flex flex-col gap-y-6 text-white'>
			<FloatingInput label='product name' id='product-name' inputType='text' defaultValue={product?.name} />

			<FloatingInput label='price' id='product-price' inputType='number' defaultValue={product?.price} />

			<DropdownCategory options={categories} placeholder='Select Category...' defaultValue={product?.categoryId} />

			<input
				name='file'
				type='file'
				accept='.png, .jpeg, .jpg, .webp'
				onChange={(e) => {
					const file = e.target.files?.[0];

					if (!file && product?.imagePath) return setImageProduct(product.imagePath);
					else if (file) {
						setImageProd(URL.createObjectURL(file));
						setImageProduct(file.name);
					}
				}}
			/>

			{imageProd && (
				<div className='relative w-1/2 mx-auto h-60 rounded-md'>
					<Image
						src={imageProd}
						fill
						alt='image product'
						className='bg-cover bg-center bg-no-repeat border rounded-md'
					/>
					<Image
						src={imageProd}
						fill
						alt='image product'
						className='bg-cover bg-center bg-no-repeat border rounded-md blur-sm -z-10 '
					/>
				</div>
			)}
		</div>
	);
}
