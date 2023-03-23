export interface Dapp {
	name: string;
	description: string;
	appUrl: string;
	images: Images;
	minAge: number;
	isForMatureAudience: boolean;
	isSelfModerated: boolean;
	language: string;
	version: string;
	isListed: boolean;
	listDate: string;
	availableOnPlatform?: string[] | null;
	category: string;
	chains?: number[] | null;
	dappId: string;
	metrics: Metrics;
}
export interface Images {
	logo: string;
}
export interface Metrics {
	dappId: string;
	downloads: number;
	installs: number;
	uninstalls: number;
	ratingsCount: number;
	visits: number;
	rating?: null;
}
