import OrderSidebar from '@/components/Order/Sidebar';
import OrderSummary from '@/components/Order/Summary';

export default function OrderLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className='md:flex md:gap-x-10 overflow-x-hidden'>
				<OrderSidebar />

				<main className='md:flex-1 p-4'>{children}</main>

				<OrderSummary />
			</div>
		</>
	);
}
