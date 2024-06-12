'use client';

import FloatingInput from '../ui/FloatingInput';
import DropdownCategory from './DropdownCategory';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useGlobalStore } from '@/store/global';
import { Product } from '@prisma/client';

type ProductFormProps = {
	categories: { id: number; name: string }[];
	product?: Product;
};

export default function ProductForm({ categories, product }: ProductFormProps) {
	const [imageProd, setImageProd] = useState<string>('');
	const { setImageProduct } = useGlobalStore();

	console.log(product);

	// useEffect(() => {
	// 	if (product?.imageId) {
	// 		setImageProduct(product.imageId);
	// 	} else if (product?.image_name) {
	// 		setImageProduct(product.image_name);
	// 	} else {
	// 		setImageProduct('');
	// 	}
	// }, [product, setImageProduct]);

	useEffect(() => {
		if (product) {
			setImageProd(product.imageId ?? `/images/products/${product.image_name}.webp`);
			setImageProduct(product.imageId ?? product.image_name);
		}
	}, []);

	// const renderImageProduct = () => {
	// 	// if (imageProd) return;

	// 	if (product?.imageId) {
	// 		return (
	// 			<>
	// 				<div className='relative w-1/2 mx-auto h-60 rounded-md'>
	// 					<Image
	// 						fill
	// 						src={product.imageId}
	// 						alt={`product ${product.name}`}
	// 						sizes='100'
	// 						quality={85}
	// 						className='rounded-md'
	// 					/>
	// 					<Image
	// 						fill
	// 						src={product.imageId}
	// 						alt={`product ${product.name}`}
	// 						sizes='100'
	// 						quality={85}
	// 						className='rounded-md blur-sm -z-10'
	// 					/>
	// 				</div>
	// 			</>
	// 		);
	// 	} else if (product?.image_name) {
	// 		return (
	// 			<>
	// 				<div className='relative w-1/2 mx-auto h-60 rounded-md'>
	// 					<Image
	// 						fill
	// 						src={`/images/products/${product.image_name}.webp`}
	// 						alt={`product ${product.name}`}
	// 						sizes='100'
	// 						quality={85}
	// 						className='rounded-md'
	// 					/>
	// 					<Image
	// 						fill
	// 						src={`/images/products/${product.image_name}.webp`}
	// 						alt={`product ${product.name}`}
	// 						sizes='100'
	// 						quality={85}
	// 						className='rounded-md blur-sm -z-10'
	// 					/>
	// 				</div>
	// 			</>
	// 		);
	// 	}
	// };

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

					if (!file && product?.imageId) return setImageProduct(product.imageId);
					else if (!file && product?.image_name && product.imageId === null) return setImageProduct(product.image_name);
					else if (file && (!product?.imageId || !product?.image_name)) {
						setImageProd(URL.createObjectURL(file));
						setImageProduct(file.name);
					}

					// if (file) {
					// 	setImageProd(URL.createObjectURL(file));
					// 	setImageProduct(file.name);
					// }
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

			{/* {renderImageProduct()} */}
		</div>
	);
}
