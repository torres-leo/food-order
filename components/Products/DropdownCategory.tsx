'use client';
import { useState } from 'react';
import Select from 'react-dropdown-select';

type Option = {
	id: number;
	name: string;
};

type DropdownCategoryProps = {
	options: Option[];
	placeholder: string;
	className?: string;
	color?: string;
};

export default function DropdownCategory({ options, placeholder, className, color }: DropdownCategoryProps) {
	const [selectedValues, setSelectedValues] = useState<Option[]>([]);

	const handleChange = (values: Option[]) => {
		setSelectedValues(values);
	};

	return (
		<Select
			options={options}
			name='category-id'
			labelField='name'
			valueField='id'
			values={selectedValues}
			onChange={handleChange}
			placeholder={placeholder ?? 'Select..'}
			color={`${color ?? '#EAB308'}`}
			className={`text-white bg-transparent !rounded-lg !border-2 !py-3 !px-2 ${className}`}
		/>
	);
}
