import { useGlobalStore } from '@/store/global';
import CartIcon from '../Icons/CartIcon';
import { Product } from '@prisma/client';

type AddProductButtonProps = {
	product: Product;
};

const AddProductButton = ({ product }: AddProductButtonProps) => {
	const { addToCart } = useGlobalStore();

	return (
		<button className='product__button' onClick={() => addToCart(product)}>
			Add <CartIcon className='size-6' />
		</button>
	);
};

export default AddProductButton;
