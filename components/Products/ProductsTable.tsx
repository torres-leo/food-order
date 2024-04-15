import { Category, Product } from '@prisma/client';
import Link from 'next/link';

import { prisma } from '@/src/lib/prisma';
import { formatCurrency } from '@/src/utils/formatCurrency';

import { ProductsWithCategory } from '@/app/admin/products/page';

type ProductsTableProps = {
	products: ProductsWithCategory;
};

const getCategoryProduct = async (product: Product) => {
	const category = await prisma.category.findUnique({
		where: {
			id: product.categoryId,
		},
	});

	return category;
};

export default function ProductsTable({ products }: ProductsTableProps) {
	const renderProducts = products.map((product, idx) => (
		<tr key={product.id} className='productsTable__body--row'>
			<td className='text-center border-r'>{idx + 1}</td>
			<td className='productsTable__body--col w-2/4 text-left mx-auto block leading-5'>{product.name}</td>
			<td className='productsTable__body--col'>{formatCurrency(product.price)}</td>
			<td className='productsTable__body--col'>{product.category.name}</td>
			<td className='relative productsTable__body--col'>
				<Link className='productsTable__edit' href={`admin/products/${product.id}/edit`}>
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
						<th scope='col' className='py-4 border-r productsTable__head--col w-8'>
							#
						</th>
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
