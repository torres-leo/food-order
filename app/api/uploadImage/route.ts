import { NextRequest, NextResponse } from 'next/server';
import { NextApiResponse } from 'next';
import axios from 'axios';

export async function POST(request: NextRequest, res: NextApiResponse) {
	const data = await request.formData();
	const file: File | null = data.get('file') as unknown as File;
	const cloudflareUrl = `https://api.cloudflare.com/client/v4/accounts/2334dad7242d80be2e13b1ea2056019b/images/v1`;

	// return NextResponse.json({ message: 'HELLLOOOOOOOOOOUUU' });

	if (!file) {
		return NextResponse.json({ success: false });
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const headers = {
		'Content-Type': 'multipart/form-data',
		Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
		'X-Auth-Email': process.env.CLOUDFLARE_EMAIL,
		'X-Auth-Key': process.env.CLOUDFLARE_KEY,
	};

	try {
		const response = await axios.post(cloudflareUrl, buffer, {
			headers: {
				...headers,
			},
		});

		if (response.status !== 200) {
			return NextResponse.json({ success: false });
		}

		return NextResponse.json({ message: 'image uploaded', success: true }.status(200));
		// return res.status(200).json({ message: 'Image uploaded successfully' });
	} catch (error) {
		console.error('Error uploading image:', error);
	}
}
