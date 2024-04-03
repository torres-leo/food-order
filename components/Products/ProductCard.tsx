import { Product } from '@prisma/client';
import Image from 'next/image';
import { formatCurrency } from '@/src/utils/formatCurrency';

type ProductCardProps = {
	product: Product;
};

function ProductCard({ product }: ProductCardProps) {
	return (
		<article className='product'>
			<picture className='product__image'>
				<Image fill src={`/images/products/${product.image}.webp`} alt='product image' sizes='100' quality={100} />
			</picture>
			<div className='product__info'>
				<h3 className='product__info--title'>{product.name}</h3>
				<p className='product__info--price'>{formatCurrency(product.price)}</p>
			</div>
		</article>
	);
}

export default ProductCard;
