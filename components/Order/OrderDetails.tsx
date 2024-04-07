import { OrderItem } from '@/src/types/orderItem';
import { formatCurrency } from '@/src/utils/formatCurrency';
import { useGlobalStore } from '@/store/global';
import { useMemo } from 'react';

type OrderDetailsProps = {
	product: OrderItem;
};

const OrderDetails = ({ product }: OrderDetailsProps) => {
	const { increaseQuantity, decreaseQuantity, removeItem } = useGlobalStore();

	const MAX_ITEMS = 5;
	const MIN_ITEMS = 1;

	const disableDecreaseButton = useMemo(() => product.quantity === MIN_ITEMS, [product]);
	const disableIncreaseButton = useMemo(() => product.quantity === MAX_ITEMS, [product]);

	return (
		<div className='order-details'>
			<div className='order-details__wrapper'>
				<div className='order-details__header'>
					<p className='text-lg leading-6 md:text-base md:leading-5 lg:text-lg lg:leading-6 font-medium text-white'>
						{product.name}{' '}
					</p>

					<button className='order-details__remove' type='button' onClick={() => removeItem(product.id)}>
						X
					</button>
				</div>
				<p className='order-details__price'>{formatCurrency(product.price)}</p>
				<div className='flex items-center gap-x-2'>
					<div className='order-details__quantity'>
						<button
							className='order-details__button--decrease'
							type='button'
							onClick={() => decreaseQuantity(product.id)}
							disabled={disableDecreaseButton}>
							-
						</button>

						<p className='text-lg font-semibold'>{product.quantity}</p>

						<button
							className='order-details__button--increase'
							type='button'
							onClick={() => increaseQuantity(product.id)}
							disabled={disableIncreaseButton}>
							+
						</button>
					</div>
					{disableIncreaseButton && (
						<p className='text-sm text-red-400'>
							- That&apos;s the limit!
							<span className='text-lg'>😥</span>
						</p>
					)}
				</div>

				<p className='text-xl md:text-lg lg:text-xl font-semibold '>
					Subtotal:
					<span className='order-details__subtotal'>{formatCurrency(product.subtotal)}</span>
				</p>
			</div>
		</div>
	);
};

export default OrderDetails;
