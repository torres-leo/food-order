'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { ProductSchema } from '@/src/validator/productSchema';
import { useGlobalStore } from '@/store/global';
import { Product } from '@prisma/client';
import { updateProduct } from '@/src/lib/actions/update-product';

type EditProductFormProps = {
	children: React.ReactNode;
	categories: { id: number; name: string }[];
	product: Product;
};

export default function EditProductForm({ children, categories, product }: EditProductFormProps) {
	const router = useRouter();
	const { imageProduct, setImageProduct } = useGlobalStore();

	const handleSubmit = async (formData: FormData) => {
		const category = formData.get('category-id');
		const catSelected = categories.find((cat) => cat.name === category);
		const image = formData.get('file');

		let data = {
			name: formData.get('product-name') as string,
			price: formData.get('product-price'),
			categoryId: category ? catSelected?.id : '',
			imagePath: imageProduct,
		};

		const result = ProductSchema.safeParse(data);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});

			return;
		}

		if (imageProduct !== product.imagePath) {
			const uploadImage = await handleUploadImage(image as File);

			data = {
				...data,
				imagePath: uploadImage.data.variants[0],
			};
		} else {
			data = {
				...data,
				imagePath: imageProduct,
			};
		}

		const resultWithIdImage = ProductSchema.safeParse(data);

		if (!resultWithIdImage.success) {
			resultWithIdImage.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});

			return;
		}

		try {
			const createProd = await updateProduct(resultWithIdImage.data, product.id);
			if (createProd?.errors) {
				createProd.errors.forEach((issue) => {
					toast.error(issue.message);
				});
				return;
			}

			setImageProduct('');
			toast.success('Product updated');
			router.push('/admin/products');
		} catch (error) {
			console.log(error);
			toast.error('Error creating product');
		}
	};

	const handleUploadImage = async (image: File) => {
		if (!image) return new Error('No image selected');

		try {
			const imageData = new FormData();
			imageData.append('file', image);
			const { data } = await axios.post('/api/images', imageData);

			if (!data.success) {
				toast.error('Error uploading image');
				return;
			}

			return data;
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
				value='update product'
				className='border-2 border-green-500 rounded w-1/2 font-medium capitalize mx-auto py-2 hover:cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-200 ease-in-out tracking-wide'
			/>
		</form>
	);
}
