import Link from 'next/link';

const AddProductLink = () => {
	return (
		<Link
			href={`/admin/products/add`}
			className='block min-w-fit py-2 px-3 border-2 border-amber-400 rounded text-amber-300 hover:bg-amber-400 hover:text-white transition'>
			<span className='font-semibold rounded-full text-base'>+</span> Add Product
		</Link>
	);
};

export default AddProductLink;
