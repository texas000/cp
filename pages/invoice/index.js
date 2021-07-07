import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function page(props) {
	const router = useRouter();
	var current = [];
	var stringPath = "";
	const paths = router.pathname.substring(1);
	paths.split("/").map((path, i) => {
		stringPath = stringPath.concat("/", path);
		current.push({
			label: path,
			path: stringPath,
			active: i === paths.split("/").length - 1,
		});
	});

	useEffect(() => {}, []);
	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>James Worldwide</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title={paths} />
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
