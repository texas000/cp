import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Row, Col, Card, CardBody } from "reactstrap";
import useSWR from "swr";
import moment from "moment";
const fetcher = async (...args) => {
	const res = await fetch(...args);
	return res.json();
};
export default function page(props) {
	const router = useRouter();

	var current = [
		{ label: "Quotes", path: "/quotes", active: false },
		{ label: props.refNo, path: "/quotes/detail", active: true },
	];
	const { data: invoice } = useSWR(
		`/api/quote/getQuote?id=${props.refNo}`,
		fetcher
	);

	useEffect(() => {
		console.log(invoice);
	}, [invoice]);
	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>{props.refNo}</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title={props.refNo} />
				{/* {JSON.stringify(invoice)} */}
				{!invoice ? (
					<div className="preloader">
						<div className="status">
							<div className="bouncing-loader">
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					</div>
				) : invoice.length == 0 ? (
					<h1>NOT FOUND</h1>
				) : (
					<Row>
						<Col>
							<Card>
								<CardBody>{JSON.stringify(invoice)}</CardBody>
							</Card>
						</Col>
					</Row>
				)}
			</Layout>
		</div>
	);
}
export async function getServerSideProps({ req, query }) {
	const cookies = cookie.parse(
		req ? req.headers.cookie || "" : window.document.cookie
	);
	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		return {
			props: {
				token,
				refNo: query.id,
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
