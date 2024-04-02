import { Product } from '@prisma/client';
import Image from 'next/image';

type ProductCardProps = {
	product: Product;
};

function ProductCard({ product }: ProductCardProps) {
	return (
		<article className='product'>
			<picture className='product__image'>
				<Image fill src={`/images/products/${product.image}.jpg`} alt='product image' />
				{/* <Image className='absolute' fill src={`/images/products/${product.image}.jpg`} alt='product image' /> */}
			</picture>
			<div className='product__info'>
				<h3 className='product__info--title'>{product.name}</h3>
				<p className='product__info--price'>
					<span className='mr-1'>$</span>
					{product.price}
				</p>
			</div>
		</article>
	);
}

export default ProductCard;
