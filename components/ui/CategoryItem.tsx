import { Category } from '@prisma/client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type CategoryIconProps = {
	category: Category;
};

function CategoryItem({ category }: CategoryIconProps) {
	const params = useParams<{ category: string }>();

	return (
		<Link
			href={`/order/${category.slug}`}
			className={`flex items-center gap-3 w-full border-t border-white/10 p-2 h-16 last-of-type:border-b hover:bg-white/15 hover:cursor-pointer select-none ${
				category.slug === params.category ? 'bg-amber-400 text-black font-bold hover:bg-amber-400' : ''
			}`}>
			<picture className='size-10 relative'>
				<Image src={`/images/icon_${category.slug}.svg`} alt='category icon' fill />
			</picture>
			<p className='text-white'>{category.name}</p>
		</Link>
	);
}

export default CategoryItem;
