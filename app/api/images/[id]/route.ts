import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
	const urlToFetch = `https://imagedelivery.net/${process.env.CLOUDFLARE_ACCOUNT_HASH}/${params.id}/public`;

	try {
		const image = await axios.get(urlToFetch, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		y;
		return NextResponse.json({ data: image.data });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'Error Fetching Data' });
	}
}
