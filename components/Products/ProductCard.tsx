import { Product } from '@prisma/client';
import Image from 'next/image';
import { formatCurrency } from '@/src/utils/formatCurrency';
import AddProductButton from './AddProductButton';
import { useGlobalStore } from '@/store/global';

type ProductCardProps = {
	product: Product;
};

function ProductCard({ product }: ProductCardProps) {
	const { images } = useGlobalStore();

	console.log(images);

	return (
		<article className='product'>
			<picture className='product__image'>
				<Image
					fill
					src={`/images/products/${product.image_name}.webp`}
					alt={`product ${product.name}`}
					sizes='100'
					quality={85}
				/>
			</picture>
			<div className='product__info'>
				<h3 className='product__info--title'>{product.name}</h3>
				<p className='product__info--price'>{formatCurrency(product.price)}</p>
			</div>

			<AddProductButton product={product} />
		</article>
	);
}

export default ProductCard;
