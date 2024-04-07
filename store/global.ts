import { OrderItem } from '@/src/types/orderItem';
import { Product } from '@prisma/client';
import { create } from 'zustand';

interface GlobalStore {
	order: OrderItem[];
	addToCart: (item: Product) => void;
	increaseQuantity: (id: Product['id']) => void;
	decreaseQuantity: (id: Product['id']) => void;
	removeItem: (id: Product['id']) => void;
}

export const useGlobalStore = create<GlobalStore>((set, get) => ({
	order: [],
	addToCart: (product) => {
		const { categoryId, image, ...rest } = product;
		let items: OrderItem[] = [];

		const productExists = get().order.find((item) => item.id === product.id);

		if (productExists) {
			items = get().order.map((item) => {
				// if (item.quantity === 5) throw new Error('You can only add 5 items of the same product');
				if (item.quantity === 5) return item;

				if (item.id === product.id)
					return {
						...item,
						quantity: item.quantity + 1,
						subtotal: (item.quantity + 1) * product.price,
					};

				return item;
			});
		} else {
			items = [
				...get().order,
				{
					...rest,
					quantity: 1,
					subtotal: 1 * product.price,
				},
			];
		}

		set(() => ({
			order: items,
		}));
	},
	increaseQuantity: (id) => {
		set((state) => ({
			order: state.order.map((item) => {
				if (item.id === id)
					return {
						...item,
						quantity: item.quantity + 1,
						subtotal: (item.quantity + 1) * item.price,
					};

				return item;
			}),
		}));
	},
	decreaseQuantity: (id) => {
		const order = get().order.map((item) => {
			if (item.id === id) return { ...item, quantity: item.quantity - 1, subtotal: (item.quantity - 1) * item.price };

			return item;
		});

		set(() => ({ order }));
	},
	removeItem: (id) => {
		set((state) => ({ order: state.order.filter((item) => item.id !== id) }));
	},
}));