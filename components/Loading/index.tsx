const Loading = () => {
	const renderDivs = () => {
		const divs = [];
		for (let i = 1; i <= 12; i++) {
			divs.push(<div key={i} className={`sk-circle${i} sk-child`}></div>);
		}
		return divs;
	};

	return <div className='sk-circle'>{renderDivs()}</div>;
};

export default Loading;
