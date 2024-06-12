const PhotoIcon = ({ className }: { className?: string }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className={className}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M15 8h.01' />
		<path d='M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z' />
		<path d='M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5' />
		<path d='M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3' />
	</svg>
);

export default PhotoIcon;