import OrderSidebar from '@/components/Order/Sidebar';
import OrderSummary from '@/components/Order/Summary';
import ToastNotify from '@/components/ui/ToastNotify';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Fast Food - Products',
	description: 'Fast Food',
};

export default function OrderLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className='md:flex '>
				<OrderSidebar />

				<main className='md:flex-1 pl-2 xl:pl-4 pt-5 pr-2 overflow-y-hidden md:h-screen sb-g'>{children}</main>

				<OrderSummary />
			</div>

			<ToastNotify />
		</>
	);
}
