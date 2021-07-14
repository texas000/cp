import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Col, Row, Collapse, Card, CardBody, Alert } from "reactstrap";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import useSWR from "swr";
import moment from "moment";
const fetcher = async (...args) => {
	const res = await fetch(...args);
	return res.json();
};

export default function page(props) {
	const [pagination, setPagination] = useState(1);
	const { data: shipment } = useSWR(`api/shipment/page/${pagination}`, fetcher);
	const router = useRouter();
	var current = [
		{
			label: "Shipment",
			path: "/shipment",
			active: true,
		},
	];

	const [collapse, setCollapse] = useState(true);
	const toggle = () => setCollapse(!collapse);

	function CaseDetail({ data }) {
		return (
			<Row className="justify-content-sm-between mt-2">
				<Col sm={4} className="mb-2 mb-sm-0">
					<p className="font-weight-bold mb-1">
						[AUTO STATUS]{" "}
						{moment(data.F_ETA).utc().isSameOrAfter(moment())
							? "ON SHIP"
							: "DELIVERED"}
					</p>
					<p className="font-weight-bold mb-1">{data.F_CUST}</p>
					<p>
						{moment(data.F_ETA).utc().isSameOrAfter(moment())
							? `Estimated Delivery ${moment(data.F_ETA).utc().fromNow()}`
							: `Delivered at ${moment(data.F_ETA).utc().format("l")}`}
					</p>
					{/* <small>2 Containers</small> */}
				</Col>
				<Col sm={8}>
					<div className="horizontal-steps mb-2">
						<div className="horizontal-steps-content">
							<div className="step-item">
								<span
									data-toggle="tooltip"
									data-placement="bottom"
									title=""
									data-original-title="20/08/2018 07:24 PM"
								>
									<small>
										Loading Port {moment(data.F_ETD).utc().fromNow()}
									</small>
									<br />
									<small
										className="d-inline-block text-truncate"
										style={{ maxWidth: "100px" }}
									>
										{data.F_LOADING}
									</small>
									<br />
								</span>
							</div>
							<div className="step-item">
								<span
									data-toggle="tooltip"
									data-placement="bottom"
									title=""
									data-original-title="21/08/2018 11:32 AM"
								>
									<small>
										Discharge Port {moment(data.F_ETA).utc().fromNow()}
									</small>
									<br />
									<small>{data.F_DISCHARGE}</small>
								</span>
							</div>
							{data.Type === "OIM" && (
								<div
									className={`step-item ${
										moment(data.F_FETA).isBefore(moment())
											? "current"
											: "active"
									}`}
								>
									<span>
										<small>
											Destination {moment(data.F_FETA).utc().fromNow()}
										</small>
										<br />
										<small>{data.F_FINAL}</small>
									</span>
								</div>
							)}
							{/* <div className="step-item">
								<span>
									<small>Delivered</small>
								</span>
							</div> */}
						</div>
						<div
							className="process-line"
							style={
								data.Type === "OIM"
									? moment(data.F_FETA).utc().isBefore(moment())
										? { width: "100%" }
										: moment(data.F_ETA).utc().isBefore(moment())
										? { width: "66%" }
										: moment(data.F_ETD).utc().isBefore(moment())
										? { width: "22%" }
										: { width: "10%" }
									: moment(data.F_ETA).utc().isBefore(moment())
									? { width: "100%" }
									: { width: "66%" }
							}
						></div>
					</div>
					{/* <Row>
						<Col>
							<div
								style={{
									background: "lightblue",
									borderRadius: "50%",
									width: "40px",
									height: "40px",
								}}
								className="d-flex justify-content-center align-items-center"
							>
								<i className="uil-ship"></i>
							</div>
							<small>{data.F_LoadingPort}</small>
							<br />
							<small>Depatrue: {moment(data.F_ETD).utc().format("l")}</small>
						</Col>
						<Col>
							<div
								style={{
									background: "lightblue",
									borderRadius: "50%",
									width: "40px",
									height: "40px",
								}}
								className="d-flex justify-content-center align-items-center"
							>
								<i className="uil-anchor"></i>
							</div>
							<small>{data.F_DisCharge}</small>
							<br />
							<small>Arrival: {moment(data.F_ETA).utc().format("l")}</small>
						</Col>
						<Col>
							<div
								style={{
									background: "lightblue",
									borderRadius: "50%",
									width: "40px",
									height: "40px",
								}}
								className="d-flex justify-content-center align-items-center"
							>
								<i className="uil-home"></i>
							</div>
							<small>{data.F_FinalDest}</small>
							<br />
							<small>
								Delivery: {moment(data.F_FETA[0]).utc().format("l")}
							</small>
						</Col>
					</Row> */}
				</Col>
				{/* {JSON.stringify(ga)} */}
			</Row>
		);
	}

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>Shipment</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title="Shipment" />
				<nav aria-label="Page navigation">
					<ul className="pagination justify-content-end">
						<li className={`page-item ${pagination === 1 && "disabled"}`}>
							<a
								className="page-link"
								onClick={() => setPagination(pagination - 1)}
								href="#"
							>
								Previous
							</a>
						</li>
						<li
							className={`page-item ${
								shipment && shipment.length == 0 && "disabled"
							} ${pagination === 1 && "active"}`}
						>
							<a
								className="page-link"
								href="#"
								onClick={() => {
									if (pagination != 1) {
										setPagination(pagination - 1);
									}
								}}
							>
								{pagination === 1 ? 1 : pagination - 1}
							</a>
						</li>
						<li
							className={`page-item ${
								shipment && shipment.length == 0 && "disabled"
							} ${pagination > 1 && "active"}`}
						>
							<a
								className="page-link"
								href="#"
								onClick={() => {
									if (pagination === 1) {
										setPagination(2);
									}
								}}
							>
								{pagination === 1 ? 2 : pagination}
							</a>
						</li>
						<li
							className={`page-item ${
								shipment && shipment.length != 10 && "disabled"
							}`}
						>
							<a
								className="page-link"
								href="#"
								onClick={() => {
									if (pagination === 1) {
										setPagination(3);
									} else {
										setPagination(pagination + 1);
									}
								}}
							>
								{pagination === 1 ? 3 : pagination + 1}
							</a>
						</li>
						<li
							className={`page-item ${
								shipment && shipment.length != 10 && "disabled"
							}`}
						>
							<a
								className="page-link"
								href="#"
								onClick={() => setPagination(pagination + 1)}
							>
								Next
							</a>
						</li>
					</ul>
				</nav>
				{!shipment ? (
					<div className="preloader">
						<div className="status">
							<div className="bouncing-loader">
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					</div>
				) : shipment.length == 0 ? (
					<Alert color="danger">No shipment is avaiable</Alert>
				) : (
					shipment.map((ga, i) => (
						<Row key={i}>
							<Col>
								<h5 className="m-0 pb-2" onClick={toggle}>
									<i className="uil-angle-down"></i>
									<span className="text-muted">{ga.F_RefNo}</span>{" "}
									{ga.F_CustRefNo}
								</h5>
								<Collapse isOpen={collapse}>
									<Link href={`/shipment/${ga.F_RefNo}?q=${ga.Type}`}>
										<Card className="card-shipment">
											<CardBody className="pb-1 pt-2">
												<CaseDetail data={ga} />
											</CardBody>
										</Card>
									</Link>
								</Collapse>
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
