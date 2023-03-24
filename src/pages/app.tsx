import AppRoot from "@/components/layouts/AppRoot";
import MyStack from "@/components/stack/MyStack";
import StackSteps from "@/components/stack/StackSteps";
import { withSessionSsr } from "@/config/withsession";
import { getUserDetails } from "@/network/getUserDetails";
import { User } from "@/types/user";
import { GetServerSideProps } from "next";

export default function App({ userDetails }: { userDetails: User }) {
	return (
		<AppRoot>
			<div className="flex flex-col items-center grow">
				{userDetails.published_stack ? (
					<MyStack userDetails={userDetails} />
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

		const userDetails = await getUserDetails(address);

		return { props: { userDetails } };
	}
);
