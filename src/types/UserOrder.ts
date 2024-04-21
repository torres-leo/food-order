import { Order, OrderProducts, Product } from '@prisma/client';

export type UserOrder = Order & {
	orderProducts: (OrderProducts & {
		product: Product;
	})[];
};
