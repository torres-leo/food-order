import Heading from '@/components/ui/Heading';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center'>
			<Heading>Product Not Found</Heading>
			<Link
				href='/admin/products'
				className='bg-black/30 border font-semibold text-white border-amber-400 p-2 rounded-md transition-colors hover:bg-amber-400 hover:border-black hover:text-black text-center duration-500'>
				Go back
			</Link>
		</div>
	);
}
