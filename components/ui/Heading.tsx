export default function Heading({ children }: Readonly<{ children: React.ReactNode }>) {
	return <h1 className='text-5xl font-bold text-center flex-1 text-yellow-500'>{children}</h1>;
}
