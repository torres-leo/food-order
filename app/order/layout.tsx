import OrderSidebar from '@/components/Order/Sidebar';
import OrderSummary from '@/components/Order/Summary';

export default function OrderLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className='md:flex '>
				<OrderSidebar />

				<main className='md:flex-1 p-4 pt-5 overflow-y-hidden md:h-screen sb-g'>{children}</main>

				<OrderSummary />
			</div>
		</>
	);
}
