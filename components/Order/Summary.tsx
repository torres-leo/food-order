'use client';

import { useGlobalStore } from '@/store/global';
import { useStatesStore } from '@/store/states';
import { motion, domAnimation, LazyMotion, AnimatePresence } from 'framer-motion';
import OrderDetails from './OrderDetails';
import { useMemo } from 'react';
import { formatCurrency } from '@/src/utils/formatCurrency';

function OrderSummary() {
	const { orderSideBar } = useStatesStore();
	const { order } = useGlobalStore();

	const total = useMemo(() => order.reduce((total, item) => total + item.quantity * item.price, 0), [order]);

	const motionOptions = {
		initial: { x: 50, opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: 50, opacity: 0, transition: { duration: 0.5 } },
		transition: { type: 'easeIn', duration: 0.5, scrollbars: false },
	};

	const renderEmptyOrderMessage = (
		<div className='flex flex-col items-center justify-center h-[calc(100%-82px)]'>
			<h1 className='text-4xl font-bold'>Your order is empty</h1>
			<p className='text-lg'>Add some items to your order</p>
		</div>
	);

	const renderOrder = () => {
		if (!order.length) {
			return renderEmptyOrderMessage;
		}

		return (
			<div className='flex flex-col gap-y-2 rounded justify-start h-full scrollbar overflow-y-scroll pr-4 mb-10'>
				{order.map((item) => (
					<OrderDetails key={item.id} product={item} />
				))}

				<p>Total: {formatCurrency(total)}</p>
			</div>
		);
	};

	return (
		<>
			{orderSideBar && (
				<AnimatePresence>
					<LazyMotion features={domAnimation} key='panel'>
						<motion.aside
							className='lg:h-screen md:w-72 lg:w-96 2xl:w-1/5 p-5 bg-white/10 sb-g overflow-y-hidden'
							{...motionOptions}>
							<h1 className='text-center font-bold text-4xl tracking-wide border-b-2 pb-2 mb-8 border-white/20 text-yellow-500'>
								My Order
							</h1>

							{renderOrder()}
						</motion.aside>
					</LazyMotion>
				</AnimatePresence>
			)}
		</>
	);
}

export default OrderSummary;
