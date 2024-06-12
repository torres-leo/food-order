'use client';
import { useEffect, useState } from 'react';
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
	defaultValue?: number;
};

export default function DropdownCategory({
	options,
	placeholder,
	className,
	color,
	defaultValue,
}: DropdownCategoryProps) {
	const [selectedValues, setSelectedValues] = useState<Option[]>([]);

	useEffect(() => {
		if (defaultValue) {
			const selected = options.filter((option) => option.id === defaultValue);

			setSelectedValues(selected);
		}
	}, [defaultValue]);

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
