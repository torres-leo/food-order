import ToastNotify from '@/components/ui/ToastNotify';
import AdminSidebar from '@/components/admin/Sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Food Order - Admin',
	description: 'Food Order',
};

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className='md:flex'>
				<AdminSidebar />

				<main className='md:flex-1 pl-2 xl:pl-4 pt-10 pr-2 overflow-y-auto md:h-screen sb-g'>{children}</main>
			</div>

			<ToastNotify />
		</>
	);
}
