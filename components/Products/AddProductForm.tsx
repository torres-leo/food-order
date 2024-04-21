import ProductForm from './ProductForm';

export default async function AddProductForm() {
	return (
		<form
			action=''
			className='flex flex-col gap-y-6 max-w-[700px] w-full mx-auto border bg-white/10 py-5 px-10 rounded'>
			<ProductForm />

			<input
				type='submit'
				value='save product'
				className='border-2 border-green-500 rounded w-1/2 font-medium capitalize mx-auto py-2 hover:cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-200 ease-in-out tracking-wide'
			/>
		</form>
	);
}
