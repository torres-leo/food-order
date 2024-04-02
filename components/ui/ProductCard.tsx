import { Product } from '@prisma/client';

function ProductCard({ product }: { product: Product }) {
	return (
		<article>
			<h3>{product.name}</h3>
			<p>{product.price}</p>
		</article>
	);
}

export default ProductCard;
