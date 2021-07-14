import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import {
	Row,
	Col,
	Card,
	CardBody,
	Button,
	CardTitle,
	CardSubtitle,
} from "reactstrap";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import useSWR from "swr";
import Link from "next/link";
import { useEffect } from "react";

export default function page(props) {
	// const { data } = useSWR("/api/photo/getPhoto");
	// useEffect(() => {
	// 	console.log(cities);
	// }, []);
	const router = useRouter();
	var current = [
		{
			label: "Quote",
			path: "/",
			active: true,
		},
	];

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>Quote</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title="Quote" />
				<Row>
					<Col>
						<Card className="mb-0">
							<CardBody>
								<CardTitle tag="h5">Ocean Shipment Quotation</CardTitle>
								<CardSubtitle className="mt-2">
									Get an instant quotation for ocean shipment
								</CardSubtitle>
								{/* <image src="http://localhost:8080/api/photo/getPhoto" /> */}
								<Link href="/quote/request">
									<button className="btn btn-primary mt-4">Continue</button>
								</Link>
							</CardBody>
						</Card>
					</Col>
				</Row>
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
