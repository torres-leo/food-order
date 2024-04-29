'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { ProductSchema } from '@/src/validator/productSchema';
import { uploadProductImage } from '@/src/utils/upload-image';
import { createProduct } from '@/src/lib/actions/create-product';
import { useGlobalStore } from '@/store/global';

type AddProductFormProps = {
	children: React.ReactNode;
	categories: { id: number; name: string }[];
};

export default function AddProductForm({ children, categories }: AddProductFormProps) {
	const router = useRouter();
	// const [imageProd, setImageProd] = useState(null);
	const { imageProd } = useGlobalStore();

	const handleSubmit = async (formData: FormData) => {
		const category = formData.get('category-id');

		const catSelected = categories.find((cat) => cat.name === category);

		const data = {
			name: formData.get('product-name') as string,
			price: formData.get('product-price'),
			categoryId: category ? catSelected?.id : '',
			// image: imageProd?.name ?? '',
			image: 'test',
		};

		const result = ProductSchema.safeParse(data);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});

			return;
		}

		// try {
		// const uploadInfo = handleUploadImage();
		const createProd = await createProduct(result.data);

		if (createProd?.errors) {
			createProd.errors.forEach((issue) => {
				toast.error(issue.message);
			});
		}
		toast.success('Product created successfully');
		router.push('/admin/products');
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	const handleUploadImage = async () => {
		const imageData = new FormData();
		imageData.append('file', imageProd);

		try {
			const res = await axios.post('/api/uploadImage', imageData);

			if (res.status !== 200) {
				toast.error('Error uploading image');
				return;
			}

			return res.data;
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form
			action={handleSubmit}
			className='flex flex-col gap-y-6 max-w-[700px] w-full mx-auto border bg-white/10 py-5 px-10 rounded'>
			{children}

			<input
				type='submit'
				value='save product'
				className='border-2 border-green-500 rounded w-1/2 font-medium capitalize mx-auto py-2 hover:cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-200 ease-in-out tracking-wide'
			/>
		</form>
	);
}
