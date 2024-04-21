import FloatingInput from '../ui/FloatingInput';

export default async function ProductForm() {
	return (
		<div className='flex flex-col gap-y-4 text-white'>
			<FloatingInput label='product name' id='product-name' inputType='text' />

			<FloatingInput label='price' id='product-price' inputType='text' />

			<div className='space-y-2'>
				<label className='' htmlFor='categoryId'>
					Category
				</label>
				<select
					className='block w-full bg-slate-100 text-black rounded py-2 px-2 text-center'
					id='categoryId'
					name='categoryId'>
					<option value='' disabled selected>
						-- Select --
					</option>
				</select>
			</div>
		</div>
	);
}
