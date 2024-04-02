const Section = ({
	className,
	children,
	wpClasses,
}: {
	className?: string;
	children: React.ReactNode;
	wpClasses?: string;
}) => {
	return (
		<section className={`section ${className}`}>
			<div className={`wrapper ${wpClasses}`}>{children}</div>
		</section>
	);
};

export default Section;
