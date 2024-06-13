'use client';

type InputType = 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | 'tel';

type FloatingInputProps = {
	id: string;
	inputClassName?: string;
	label: string;
	labelClassName?: string;
	inputType: InputType;
	defaultValue?: string | number;
};

const FloatingInput = ({ label, inputClassName, labelClassName, id, inputType, defaultValue }: FloatingInputProps) => {
	const handleInputNumber = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		if (inputType === 'number') {
			if (['e', 'E', '+', '-'].includes(evt.key)) {
				evt.preventDefault();
			}
		}
	};

	return (
		<div className='relative'>
			<input
				type={inputType}
				id={id}
				name={id}
				className={`input-floating peer ${inputClassName}`}
				placeholder=' '
				onKeyDown={handleInputNumber}
				// defaultValue={defaultValue}
				defaultValue={defaultValue ? defaultValue : ''}
				step={inputType === 'number' ? '0.01' : ''}
			/>
			<label htmlFor={id} className={`input-floating--label ${labelClassName ? labelClassName : ''}`}>
				{label}
			</label>
		</div>
	);
};

export default FloatingInput;
