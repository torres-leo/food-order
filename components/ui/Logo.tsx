import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = ({ redirect }: { redirect?: string }) => {
	return (
		<div className={`flex justify-center mb-10 select-none`}>
			{redirect ? (
				<Link href={`/${redirect}`} className='block relative size-40'>
					<Image fill alt='Logo Fresh Coffe' src='/images/logo.svg' />
				</Link>
			) : (
				<div className='block relative size-40'>
					<Image fill alt='Logo Fresh Coffe' src='/images/logo.svg' />
				</div>
			)}
		</div>
	);
};

export default Logo;
