import Head from "next/head";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import Quotes from "../components/Dashboard/Quotes";
import Invoice from "../components/Dashboard/Invoice";
import Shipment from "../components/Dashboard/Shipment";
import { useEffect } from "react";
import cookie from "cookie";
import jwt from "jsonwebtoken";
// import firebase from "../lib/firebase";

export default function Index(props) {
	useEffect(() => {
		console.log(props.token);
		// console.log(props.token.customer.get);
		// firebase.auth().onAuthStateChanged(async (user) => {
		// 	console.log(user);
		// });
	}, []);

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>James Worldwide</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle
					breadCrumbItems={[{ label: "Dashboard", active: true }]}
					title={"Dashboard"}
				/>
				<div className="row">
					<div className="col-lg-4">
						<Shipment />
					</div>
					<div className="col-lg-4">
						<Quotes />
					</div>
					<div className="col-lg-4">
						<Invoice />
					</div>
				</div>
			</Layout>
		</div>
	);
}
export async function getServerSideProps({ req }) {
	const cookies = cookie.parse(
		req ? req.headers.cookie || "" : window.document.cookie
	);
	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		return {
			props: {
				token,
			},
		};
	} catch (err) {
		return {
			redirect: {
				permanent: false,
				destination: "/login",
			},
		};
	}
}
