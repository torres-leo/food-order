import { useEffect, useState } from 'react';
import { Product } from '@prisma/client';
import Image from 'next/image';
import axios from 'axios';

import { formatCurrency } from '@/src/utils/formatCurrency';
import AddProductButton from './AddProductButton';
import PhotoIcon from '../Icons/PhotoIcon';

type ProductCardProps = {
	product: Product;
};

function ProductCard({ product }: ProductCardProps) {
	const [imageUrl, setImageUrl] = useState<string>('');
	const { name, price, imageId, image_name } = product;

	useEffect(() => {
		const checkProductImage = async () => {
			if (!product.imageId) return;

			try {
				const response = await axios.get(`/api/images/${product.imageId}`, {
					responseType: 'blob',
				});

				const imageUrl = URL.createObjectURL(response.data);
				setImageUrl(imageUrl);
			} catch (error) {
				console.error('Error fetching image:', error);
			}
		};

		checkProductImage();
	}, [product.imageId]);

	const renderImageProduct = () => {
		if (imageId) {
			if (imageUrl) {
				return <Image fill src={imageUrl} alt={`product ${name}`} sizes='100' quality={85} />;
			} else {
				return <PhotoIcon className='size-full' />;
			}
		} else if (image_name) {
			return (
				<Image fill src={`/images/products/${image_name}.webp`} alt={`product ${name}`} sizes='100' quality={85} />
			);
		} else {
			return <PhotoIcon className='size-full' />;
		}
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
