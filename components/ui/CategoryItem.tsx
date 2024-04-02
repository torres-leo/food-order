import { Category } from '@prisma/client';
import Image from 'next/image';

type CategoryIconProps = {
	category: Category;
};

function CategoryItem({ category }: CategoryIconProps) {
	return (
		<div
			className={`flex items-center gap-3 w-full border-t border-white/10 p-2 h-16 last-of-type:border-b hover:bg-white/15 hover:cursor-pointer select-none`}>
			<picture className='size-10 relative'>
				<Image src={`/images/icon_${category.slug}.svg`} alt='category icon' fill />
			</picture>
			<p>{category.name}</p>
		</div>
	);
}

export default CategoryItem;
