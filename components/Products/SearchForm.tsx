import { searchProductSchema } from '@/src/validator/searchProduct';

export default function SearchForm() {
	const handleSearchForm = (formData: FormData) => {
		const data = {
			search: formData.get('search'),
		};

		const result = searchProductSchema.safeParse(data);
		console.log(result);
	};

	return (
		<form className='flex items-center w-full'>
			<input type='text' placeholder='Search product..' className='p-2 w-1/3' />
		</form>
	);
}
