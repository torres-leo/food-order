import Link from 'next/link';

import { formatCurrency } from '@/src/utils/formatCurrency';

import { ProductsWithCategory } from '@/app/admin/products/page';

type ProductsTableProps = {
	products: ProductsWithCategory;
};

export default function ProductsTable({ products }: ProductsTableProps) {
	const renderProducts = products.map((product) => (
		<tr key={product.id} className='productsTable__body--row'>
			<td className='productsTable__body--col pl-3 text-left mx-auto block leading-5'>{product.name}</td>
			<td className='productsTable__body--col'>{formatCurrency(product.price)}</td>
			<td className='productsTable__body--col'>{product.category.name}</td>
			<td className='relative productsTable__body--col'>
				<Link className='productsTable__edit' href={`products/${product.id}/edit`}>
					Edit <span className='sr-only'>,{product.name}</span>
				</Link>
			</td>
		</tr>
	));

	return (
		<div className='productsTable'>
			<table className='productsTable__table'>
				<thead className='productsTable__head' id='table-head'>
					<tr>
						<th scope='col' className='pl-3 py-4 productsTable__head--col'>
							Product
						</th>
						<th scope='col' className='productsTable__head--col'>
							Price
						</th>
						<th scope='col' className='productsTable__head--col'>
							Category
						</th>
						<th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
							<span className='sr-only'>Actions</span>
						</th>
					</tr>
				</thead>
				<tbody className='productsTable__body'>{renderProducts}</tbody>
			</table>
		</div>
	);
}
