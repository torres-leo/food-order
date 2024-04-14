import Link from 'next/link';
import Logo from '../ui/Logo';
import AdminRoute from '@/components/admin/Route';

const adminNavigation = [
	{ url: '/admin/orders', text: 'Orders', blank: false, icon: 'order' },
	{ url: '/admin/products', text: 'Products', blank: false, icon: 'products' },
	{ url: '/order/coffee', text: 'Ver Quiosco', blank: true, icon: 'store' },
];

export default function AdminSidebar() {
	const renderLinks = adminNavigation.map((link) => <AdminRoute key={link.url} link={link} />);

	return (
		<aside className='aside'>
			<Logo redirect='admin/orders' />
			<div className=''>
				<p className='mb-6 text-center font-semibold text-xl select-none'>Navegacion</p>
				<nav className='flex flex-col justify-center items-center'>{renderLinks}</nav>
			</div>
		</aside>
	);
}
