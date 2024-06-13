import { UserOrder } from '@/src/types/UserOrder';

type LatestOrderItemProps = {
	order: UserOrder;
};

export default function LatestOrderItem({ order }: LatestOrderItemProps) {
	return (
		<article className='bg-white/20 p-3 rounded-lg flex flex-col gap-y-2'>
			<p className='font-semibold text-[20px] text-amber-400 border-b'>
				Client: <span className='text-white capitalize font-medium'>{order.name}</span>
			</p>

			<ul className='divide-y divide-gray-400 border-gray-400 text-sm font-medium text-white ps-3' role='list'>
				{order.orderProducts.map((product) => (
					<li key={product.product.id} className='flex py-2 gap-x-2 '>
						<span>({product.quantity})</span>
						<span>{product.product.name}</span>
					</li>
				))}
			</ul>
		</article>
	);
}
