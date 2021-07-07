import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import useSWR from "swr";
import { Col, Row, Collapse, Card, CardBody } from "reactstrap";
import Link from "next/link";
import moment from "moment";
export default function page(props) {
	const { data: invoice } = useSWR("api/dashboard/invoice");
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
				<title>Invoice</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title={paths} />
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
					<h1>Not Found</h1>
				) : (
					invoice.map((ga) => (
						<Row key={ga.F_ID}>
							<Col>
								<h5 className="m-0 pb-2">
									<i className="uil-angle-down"></i>
									<span className="text-muted">{ga.F_InvoiceNo}</span>
								</h5>

								<Link href={`/invoice/${ga.F_InvoiceNo}`}>
									<a style={{ textDecoration: "none" }} className="text-muted">
										<Card className="card-shipment">
											<CardBody className="pb-1 pt-2">
												<Row className="justify-content-sm-between mt-2">
													<Col sm={4} className="mb-2 mb-sm-0">
														<p className="font-weight-bold">{ga.F_InvoiceNo}</p>
													</Col>
													<Col sm={4} className="mb-2 mb-sm-0">
														<p className="font-weight-bold">Due Date</p>
														{moment(ga.F_DueDate).utc().format("l")}
													</Col>
													<Col sm={4} className="mb-2 mb-sm-0">
														<p className="font-weight-bold">Invoice Date</p>
														{moment(ga.F_InvoiceDate).utc().format("l")}
													</Col>
												</Row>
											</CardBody>
										</Card>
									</a>
								</Link>
							</Col>
						</Row>
					))
				)}
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
