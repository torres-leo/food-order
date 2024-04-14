const CheckIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={className}>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M7 12l5 5l10 -10' />
			<path d='M2 12l5 5m5 -5l5 -5' />
		</svg>
	);
};

export default CheckIcon;
