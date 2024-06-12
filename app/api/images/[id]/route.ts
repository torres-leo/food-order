import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
// 	const urlToFetch = `https://imagedelivery.net/${process.env.CLOUDFLARE_ACCOUNT_HASH}/${params.id}/public`;

// 	try {
// 		const response = await axios.get(urlToFetch, {
// 			responseType: 'arraybuffer',
// 		});

// 		const imageBuffer = response.data;
// 		const contentType = response.headers['content-type'];

// 		return new NextResponse(imageBuffer, {
// 			headers: {
// 				'Content-Type': contentType,
// 				'Content-Length': imageBuffer.length,
// 			},
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		return NextResponse.json({ message: 'Error Fetching Data' });
// 	}
// }

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
	const urlToFetch = `https://imagedelivery.net/${process.env.CLOUDFLARE_ACCOUNT_HASH}/${params.id}/public`;

	try {
		const image = await axios.get(urlToFetch, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log(image.data);
		return NextResponse.json({ data: image.data });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'Error Fetching Data' });
	}
}
