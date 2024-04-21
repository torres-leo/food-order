import Link from 'next/link';

type PaginationProps = {
	page: number;
	totalPages: number;
};

export default function Pagination({ page, totalPages }: PaginationProps) {
	const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

	const renderNumberPages = pages.map((currentPage) => (
		<Link
			key={currentPage}
			href={`/admin/products?page=${currentPage}`}
			className={`px-2 py-1 border hover:bg-white/10 transition ${
				page === currentPage && 'bg-amber-400 text-black font-medium'
			}`}>
			{currentPage}
		</Link>
	));

	return (
		<nav className='flex justify-center'>
			{page >= 1 && (
				<Link
					href={`/admin/products?page=${page - 1}`}
					className={`px-2 py-1 border-t border-l border-b rounded rounded-e-none hover:bg-white/15 ${
						page === 1 ? 'opacity-50 pointer-events-none' : ''
					}`}>
					&laquo;
				</Link>
			)}

			<div className='flex'>{renderNumberPages}</div>

			{page <= totalPages && (
				<Link
					href={`/admin/products?page=${page + 1}`}
					className={`px-2 py-1 border-t border-r border-b rounded rounded-s-none hover:bg-white/15 ${
						page === totalPages ? 'opacity-50 pointer-events-none' : ''
					}`}>
					&raquo;
				</Link>
			)}
		</nav>
	);
}
