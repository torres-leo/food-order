'use client';

import { useMemo } from 'react';
import { motion, domAnimation, LazyMotion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

import { useGlobalStore } from '@/store/global';
import { useStatesStore } from '@/store/states';

import { CreateOrder } from '@/src/lib/actions/create-order';
import { formatCurrency } from '@/src/utils/formatCurrency';

import { orderSchema } from '@/src/validator/schema';

import OrderDetails from './OrderDetails';

function OrderSummary() {
	const { orderSideBar } = useStatesStore();
	const { order, clearOrder } = useGlobalStore();

	const total = useMemo(() => order.reduce((total, item) => total + item.quantity * item.price, 0), [order]);

	const motionOptions = {
		initial: { x: 50, opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: 50, opacity: 0, transition: { duration: 0.5 } },
		transition: { type: 'easeIn', duration: 0.5, scrollbars: false },
	};

	const handleConfirmOrder = async (formData: FormData) => {
		const data = {
			name: formData.get('name') as string,
			total: Math.round(total * 100) / 100,
			order,
		};

		const result = orderSchema.safeParse(data);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});

			return;
		}

		const response = await CreateOrder(data);
		if (response?.errors) {
			response.errors.forEach((error) => {
				toast.error(error.message);
			});
		}

		toast.success('Order created successfully');
		clearOrder();
	};

	const renderEmptyOrderMessage = (
		<div className='flex flex-col items-center justify-center h-[calc(100%-82px)]'>
			<h1 className='text-3xl font-bold text-center'>Your order is empty</h1>
			<p className='text-lg text-center'>Add some items to your order</p>
		</div>
	);

	const renderOrder = () => {
		if (!order.length) {
			return renderEmptyOrderMessage;
		}

		return order.map((item) => <OrderDetails key={item.id} product={item} />);
	};

	const renderTotalOrder = () => {
		if (!order.length) {
			return null;
		}

		return (
			<p className='my-10 font-bold text-4xl flex items-center'>
				Total:
				<span className='font-semibold text-amber-400 underline underline-offset-8 border-b-4 pb-2 border-amber-400 max-w-fit flex-1 mx-auto text-3xl'>
					{formatCurrency(total)}
				</span>
			</p>
		);
	};

	const renderConfirmOrderButton = () => {
		if (!order.length) {
			return null;
		}

		return (
			<form className='w-full border-t pt-5 border-white/45' action={handleConfirmOrder}>
				<input
					type='text'
					placeholder='Type your name for the order..'
					className=' border rounded border-gray-500 p-2.5 w-full mb-5 outline-none text-sm tracking-wide font-light'
					name='name'
				/>

				<input
					type='submit'
					className='rounded uppercase bg-green-500 w-full text-center py-2 font-bold cursor-pointer hover:bg-green-600 transition-colors duration-300 tracking-wider'
					value='Confirm Order'
				/>
			</form>
		);
	};

	return (
		<>
			{orderSideBar && (
				<AnimatePresence>
					<LazyMotion features={domAnimation} key='panel'>
						<motion.aside
							className='md:w-2/5 lg:w-96 2xl:max-w-[450px] 2xl:w-full p-5 pl-3 bg-white/10 sb-g overflow-y-auto scrollbar lg:h-screen'
							{...motionOptions}>
							<h1 className='text-center font-bold text-4xl tracking-wide border-b-2 pb-2 mb-8 border-white/20 text-yellow-500'>
								My Order
							</h1>

							<div
								className={`flex flex-col gap-y-2 rounded justify-start scrollbar overflow-y-auto pr-4 ${
									!order.length
										? 'h-[calc(100%-10%)] flex-shrink'
										: 'h-auto md:max-h-[calc(100%-650px)] lg:max-h-[calc(100%-350px)] mb-10'
								}`}>
								{renderOrder()}
							</div>
							{renderTotalOrder()}
							{renderConfirmOrderButton()}
						</motion.aside>
					</LazyMotion>
				</AnimatePresence>
			)}
		</>
	);
}

export default OrderSummary;
