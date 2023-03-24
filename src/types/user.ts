export interface User {
	wallet_address: string;
	user_name: string | null;
	id: number;
	top_ten_dapps: string[] | null;
	published_stack: boolean;
	created_at: string;
}
