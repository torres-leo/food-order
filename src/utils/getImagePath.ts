export function getImagePath(imagePath: string) {
	const cloudflareBaseUrl = 'https://imagedelivery.net';

	if (imagePath.startsWith(cloudflareBaseUrl)) {
		return imagePath;
	} else {
		return `/images/products/${imagePath}.webp`;
	}
}
