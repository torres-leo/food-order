'use client';

import { useStatesStore } from '@/store/states';
import { motion, domAnimation, LazyMotion, AnimatePresence } from 'framer-motion';

function OrderSummary() {
	const { orderSideBar } = useStatesStore();

	const motionOptions = {
		initial: { x: 50, opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: 50, opacity: 0, transition: { duration: 0.5 } },
		transition: { type: 'easeOut', duration: 0.5 },
	};

	return (
		<>
			{orderSideBar && (
				<AnimatePresence>
					<LazyMotion features={domAnimation} key='panel'>
						<motion.aside className='lg:h-screen md:w-64 lg:w-96 p-5 overflow-y-auto bg-white/10' {...motionOptions}>
							<h1 className='text-center font-bold text-4xl tracking-wide'>My Order</h1>
						</motion.aside>
					</LazyMotion>
				</AnimatePresence>
			)}
		</>
	);
}

export default OrderSummary;
