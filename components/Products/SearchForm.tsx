'use client';

import { toast } from 'react-toastify';
import { redirect, useRouter, useParams } from 'next/navigation';
import { searchProductSchema } from '@/src/validator/searchProduct';

export default function SearchForm({ className }: { className?: string }) {
	const router = useRouter();
	const params = useParams();

	console.log(params);

	const handleSearchForm = (formData: FormData) => {
		const data = {
			search: formData.get('search'),
		};

		const result = searchProductSchema.safeParse(data);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});
			return;
		}

		router.push(`/admin/products/search?search=${data.search}`);
		redirect(`/admin/products/search?search=${data.search}`);
	};

	return (
		<form className={`search-form ${className}`} action={handleSearchForm}>
			<input type='text' placeholder='Search product..' className='search-form__input' name='search' />
			<input type='submit' value='Search' className='search-form__submit' />
		</form>
	);
}
