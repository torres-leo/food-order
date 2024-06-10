export interface CloudflareImages {
	result: Result;
	success: boolean;
	errors: any[];
	messages: any[];
}

export interface Result {
	images: Image[];
}

export interface Image {
	id: string;
	filename: string;
	uploaded: Date;
	requireSignedURLs: boolean;
	variants: string[];
}
