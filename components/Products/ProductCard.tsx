import { Product } from '@prisma/client';
import Image from 'next/image';

import { formatCurrency } from '@/src/utils/formatCurrency';
import AddProductButton from './AddProductButton';
import { getImagePath } from '@/src/utils/getImagePath';

type ProductCardProps = {
	product: Product;
};

function ProductCard({ product }: ProductCardProps) {
	const { name, price, imagePath } = product;

	const renderImageProduct = () => {
		const image = getImagePath(imagePath);

		return <Image fill src={image} alt={`product ${name}`} sizes='100' quality={85} />;
	};

	return (
		<article className='product'>
			<picture className='product__image'>{renderImageProduct()}</picture>
			<div className='product__info'>
				<h3 className='product__info--title'>{name}</h3>
				<p className='product__info--price'>{formatCurrency(price)}</p>
			</div>

			<AddProductButton product={product} />
		</article>
	);
}

export default ProductCard;
