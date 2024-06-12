'use client';

import { useRouter } from 'next/navigation';

export default function GoBackButton({ className = '' }) {
	const router = useRouter();

	return (
		<button
			onClick={() => router.back()}
			className={`bg-black/30 border font-semibold text-white border-amber-400 p-2 rounded-md transition-colors hover:bg-amber-400 hover:border-black hover:text-black text-center duration-500 ${className}`}>
			Go back
		</button>
	);
}
