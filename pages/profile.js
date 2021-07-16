import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Card, Table, Button, Row, Col, CardBody } from "reactstrap";
import useSWR from "swr";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function page(props) {
	const { data: houseCount } = useSWR("/api/profile/totalHouseCount");
	const apexLineChartWithAnnotationOpts = {
		chart: {
			height: 380,
			type: "line",
			id: "areachart-2",
		},
		labels: houseCount ? houseCount.map(({ REF }) => REF) : [],
		colors: ["#39afd1"],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: [3],
			curve: "straight",
		},
		title: {
			text: "House Line",
			align: "left",
		},
		xaxis: {
			type: "text",
		},
		grid: {
			row: {
				colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
				opacity: 0.2,
			},
			borderColor: "#f1f3fa",
		},
		responsive: [
			{
				breakpoint: 600,
				options: {
					chart: {
						toolbar: {
							show: false,
						},
					},
					legend: {
						show: false,
					},
				},
			},
		],
	};

	const apexLineChartWithAnnotationData = [
		{
			name: "House B/L",
			data: houseCount ? houseCount.map(({ CNT }) => CNT) : [],
		},
	];
	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>Profile</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle
					breadCrumbItems={[
						{ label: "Profile", path: "/profile", active: true },
					]}
					title={"Profile"}
				/>

				<Row>
					<Col sm={12}>
						<Card>
							<CardBody className="profile-user-box">
								<Row>
									<Col sm={8}>
										<div className="media">
											<span className="float-left m-2 mr-4">
												<img
													src={props.token.photoURL}
													style={{ height: "100px" }}
													alt=""
													className="rounded-circle img-thumbnail"
												/>
											</span>
											<div className="media-body">
												<h4 className="mt-1 mb-1">{props.token.displayName}</h4>
												<p className="font-13 text-dark-50">
													{props.token.email}
												</p>

												<ul className="mb-0 list-inline">
													<li className="list-inline-item mr-3">
														<h5 className="mb-1">Customer ID</h5>
														<p className="mb-0 font-13 text-dark-50">
															{props.token.customer}
														</p>
													</li>
													<li className="list-inline-item">
														<h5 className="mb-1">Account Created</h5>
														<p className="mb-0 font-13 text-dark-50">
															{new Date(props.token.created).toDateString()}
														</p>
													</li>
												</ul>
											</div>
										</div>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
					<Col sm={3}>
						<Card className="text-white bg-info overflow-hidden">
							<CardBody>
								<div className="toll-free-box text-center">
									<h4>
										{" "}
										<i className="mdi mdi-deskphone"></i> Toll Free :
										1-562-924-0800
									</h4>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col sm={9}>
						<Card>
							<CardBody>
								<Chart
									options={apexLineChartWithAnnotationOpts}
									series={apexLineChartWithAnnotationData}
									type="line"
									className="apex-charts"
									height={260}
								/>
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
