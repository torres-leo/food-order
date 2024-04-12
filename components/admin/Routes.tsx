'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OrderIcon from '../Icons/OrderIcon';
import StoreIcon from '../Icons/StoreIcon';
import ProductsIcon from '../Icons/ProductsIcon';

type RouteProps = {
	link: {
		url: string;
		text: string;
		blank: boolean;
		icon: string;
	};
};

const Route = ({ link }: RouteProps) => {
	const pathName = usePathname();
	const isActive = pathName === link.url;

	const renderIcon = (icon: string) => {
		if (icon === 'order') {
			return (
				<OrderIcon className={`w-6 h-6 text-amber-400 ${isActive ? 'text-black bg-white rounded-full p-[2px]' : ''}`} />
			);
		} else if (icon === 'products') {
			return (
				<ProductsIcon
					className={`w-6 h-6 text-amber-400 ${isActive ? 'text-white bg-white rounded-full p-[2px]' : ''}`}
				/>
			);
		}
		return (
			<StoreIcon className={`w-6 h-6 text-amber-400 ${isActive ? 'text-white bg-white rounded-full p-[2px]' : ''}`} />
		);
	};

	return (
		<Link
			key={link.url}
			href={link.url}
			target={link.blank ? '_blank' : '_self'}
			className={`flex items-center gap-3 w-full border-t border-white/10 p-2 h-16 last-of-type:border-b hover:bg-white/15 hover:cursor-pointer select-none ${
				isActive ? 'bg-amber-400 text-black font-bold hover:bg-amber-400' : ''
			} `}>
			{renderIcon(link.icon)}
			{link.text}
		</Link>
	);
};

export default Route;
