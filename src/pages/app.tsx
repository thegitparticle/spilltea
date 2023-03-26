import AppRoot from "@/components/layouts/AppRoot";
import MyStack from "@/components/stack/MyStack";
import StackSteps from "@/components/stack/StackSteps";
import { withSessionSsr } from "@/config/withsession";
import { getUserDetails } from "@/network/getUserDetails";
import { Dapp } from "@/types/dapp";
import { User } from "@/types/user";
import { GetServerSideProps } from "next";

export default function App({
	userDetails,
	myDapps,
}: {
	userDetails: User;
	myDapps: Dapp[];
}) {
	return (
		<AppRoot>
			<div className="flex flex-col items-center grow">
				{userDetails.published_stack ? (
					<MyStack userDetails={userDetails} myDapps={myDapps} />
				) : (
					<StackSteps userDetails={userDetails} />
				)}
			</div>
		</AppRoot>
	);
}

export const getServerSideProps: GetServerSideProps = withSessionSsr(
	async ({ req }: any) => {
		const address = req.session.siwe?.address;

		if (address === undefined) {
			return {
				redirect: {
					destination: "/",
					permanent: false,
				},
			};
		}

		const userDetails = await getUserDetails(address);

		let myDapps: Dapp[] = [];

		if (userDetails.top_ten_dapps !== null) {
			for (const item of userDetails.top_ten_dapps) {
				const options = {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				};

				const dappsDetails = await fetch(
					`https://api-a.meroku.store/dapp/searchById?dappId=${item}`,
					options
				);

				const res = await dappsDetails.json();

				myDapps.push(await res[0]);
			}
		}

		return {
			props: {
				userDetails: JSON.parse(JSON.stringify(userDetails)),
				myDapps,
			},
		};
	}
);
