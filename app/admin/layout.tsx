import ToastNotify from '@/components/ui/ToastNotify';
import AdminSidebar from '@/components/admin/Sidebar';

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className='md:flex'>
				<AdminSidebar />

				<main className='md:flex-1 pl-2 xl:pl-4 pt-10 pr-2 overflow-y-hidden md:h-screen sb-g'>{children}</main>
			</div>

			<ToastNotify />
		</>
	);
}
