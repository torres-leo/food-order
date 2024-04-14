import { completeOrder } from '@/src/lib/actions/complete-order';
import { formatCurrency } from '@/src/utils/formatCurrency';
import { UserOrder } from '@/src/types/userOrder';
import TrashIcon from '../Icons/TrashIcon';
import CheckIcon from '../Icons/CheckIcon';

type OrderCardProps = {
	order: UserOrder;
};

export default function OrderCard({ order }: OrderCardProps) {
	const renderBodyTable = order.orderProducts.map((product) => (
		<tbody key={product.productId} className='border-b border-gray-200/20 last:border-none'>
			<tr className=''>
				<td className='text-sm py-1.5 font-semibold'>({product.quantity})</td>
				<td className='text-sm py-1.5 font-semibold'>{product.product.name}</td>
				<td className='text-base py-1.5 font-semibold'>{formatCurrency(product.product.price)}</td>
			</tr>
		</tbody>
	));

	const renderTotal = (
		<div className='flex justify-between border-t border-gray-200 py-2 px-10 mb-3'>
			<p className='text-lg font-medium '>Total:</p>
			<p className='text-lg font-bold '>{formatCurrency(order.total)}</p>
		</div>
	);

	const confirmOrder = (
		<form action={completeOrder} className='w-full'>
			<div className='flex flex-nowrap items-center rounded transition border border-green-500 hover:bg-green-600 hover:border-white w-full justify-center'>
				<input type='hidden' value={order.id} name='order_id' />
				<input
					type='submit'
					className='text-white uppercase font-bold cursor-pointer text-sm tracking-wider w-full py-2.5'
					value='Complete Order'
					id={`order${order.id}`}
					name={`order${order.id}`}
				/>
				<label htmlFor={`order${order.id}`} className='hover:cursor-pointer'>
					<CheckIcon className='size-8 mr-2' />
				</label>
			</div>
		</form>
	);

	const cancelOrder = (
		<form action='' className='w-1/2'>
			<div className='flex flex-nowrap items-center border rounded border-red-400 hover:bg-red-400 hover:border-white transition'>
				<input
					type='submit'
					className='w-full uppercase font-bold cursor-pointer text-sm tracking-wider py-2.5'
					value='Cancel'
					id='cancel'
					name='cancel'
				/>
				<label htmlFor='cancel' className='hover:cursor-pointer'>
					<TrashIcon className='size-6 text-white mr-2' />
				</label>
			</div>
		</form>
	);

	return (
		<article className='rounded-lg bg-transparent px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 border border-white/10 shadow-inner shadow-white/15'>
			<p className='text-lg font-medium mb-5'>
				Client:
				<span className='text-xl ml-3'>{order.name}</span>
			</p>
			<p className='text-base mb-2 underline underline-offset-4 font-medium'>Products:</p>
			<table className='table-fixed w-full text-center mb-5'>
				<thead className='text-sm uppercase bg-gray-800 text-gray-200'>
					<tr>
						<th scope='col' className='py-2 tracking-wide'>
							Quantity
						</th>
						<th scope='col' className='py-2 tracking-wide'>
							Product Name
						</th>
						<th scope='col' className='py-2 tracking-wide'>
							Price
						</th>
					</tr>
				</thead>
				{renderBodyTable}
			</table>

			{renderTotal}

			<div className='flex justify-between gap-x-3 items-center'>
				{confirmOrder}
				{cancelOrder}
			</div>
		</article>
	);
}
