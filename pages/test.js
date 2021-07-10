import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
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

export default function page(props) {
	// const { data } = useSWR("/api/photo/getPhoto");
	const router = useRouter();
	var current = [
		{
			label: "Test",
			path: "/",
			active: true,
		},
	];

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>Test</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title="Test" />
				<Row>
					<Col>
						<Card className="mb-0">
							<CardBody>
								<CardTitle tag="h5">Ocean Shipment Quotation</CardTitle>
								<CardSubtitle className="mt-2">
									Get an instant quotation for ocean shipment
								</CardSubtitle>
								<img src="http://jameswgroup.com:49991/api/forwarding/test/image.png" />
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
