import { Product } from '@prisma/client';
import { toast } from 'react-toastify';

import { useGlobalStore } from '@/store/global';

import CartIcon from '../Icons/CartIcon';

type AddProductButtonProps = {
	product: Product;
};

const AddProductButton = ({ product }: AddProductButtonProps) => {
	const { addToCart } = useGlobalStore();

	const handleAddToCart = (product: Product) => {
		try {
			addToCart(product);
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<button className='product__button' onClick={() => handleAddToCart(product)}>
			Add <CartIcon className='size-6' />
		</button>
	);
};

export default AddProductButton;
