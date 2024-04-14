type HeadingProps = {
	readonly children: React.ReactNode;
	className?: string;
};

export default function Heading({ children, className }: HeadingProps) {
	return <h1 className={`text-5xl font-bold text-center flex-1 text-yellow-500 ${className}`}>{children}</h1>;
}
