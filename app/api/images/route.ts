import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
	const cloudflareUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`;
	try {
		const images = await axios.get(cloudflareUrl, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
				'X-Auth-Key': process.env.CLOUDFLARE_KEY,
			},
		});

		console.log(images.data.result);
		return NextResponse.json({ data: images.data });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'Error Fetching Data' });
	}
}

export async function POST(request: NextRequest) {
	const cloudflareUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`;

	const data = await request.formData();
	const file: File | null = data.get('file') as File;

	if (!file) {
		return NextResponse.json({ success: false });
	}

	const formData = new FormData();
	formData.append('file', file);

	const headers = {
		'Content-Type': 'multipart/form-data',
		Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
		// 'X-Auth-Email': process.env.CLOUDFLARE_EMAIL,
		'X-Auth-Key': process.env.CLOUDFLARE_KEY,
	};

	try {
		const response = await axios.post(cloudflareUrl, formData, {
			headers: {
				...headers,
			},
		});

		if (response.status !== 200) {
			return NextResponse.json({ success: false });
		}

		return NextResponse.json({ message: 'image uploaded', success: true, data: response.data.result });
	} catch (error) {
		console.error('Error uploading image:', error);
		return NextResponse.json({ message: 'Uploaded failed', success: false });
	}
}
