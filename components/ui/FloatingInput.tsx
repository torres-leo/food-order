type InputType = 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | 'tel';

type FloatingInputProps = {
	id: string;
	inputClassName?: string;
	label: string;
	labelClassName?: string;
	inputType: InputType;
};

const FloatingInput = ({ label, inputClassName, labelClassName, id, inputType }: FloatingInputProps) => {
	return (
		<div className='relative'>
			<input type={inputType} id={id} className={`input-floating peer ${inputClassName}`} placeholder=' ' />
			<label htmlFor={id} className={`input-floating--label ${labelClassName}`}>
				{label}
			</label>
		</div>
	);
};

export default FloatingInput;
