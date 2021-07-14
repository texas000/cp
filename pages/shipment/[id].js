import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import {
	Row,
	Col,
	Card,
	CardBody,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Nav,
	NavItem,
	NavLink,
	Alert,
} from "reactstrap";
import Comments from "../../components/Project/Comment";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import useSWR from "swr";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import SimpleBar from "simplebar-react";
const fetcher = async (...args) => {
	const res = await fetch(...args);
	return res.json();
};
const Loader = () => (
	<div className="preloader">
		<div className="status">
			<div className="bouncing-loader">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
);
export default function page(props) {
	const router = useRouter();
	var current = [
		{ label: "Shipment", path: "/shipment", active: false },
		{ label: props.refNo, path: "/shipment/1", active: true },
	];
	const [selectedNav, setSelectedNav] = useState(1);
	var isQuery = props.Type.hasOwnProperty("q");
	const { data } = useSWR(
		`/api/shipment/${props.refNo}?q=${props.Type.q}`,
		fetcher
	);

	// useEffect(() => {
	// 	if (data) {
	// 		console.log(data.master.F_FETA);
	// 	}
	// }, []);

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>{props.refNo}</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title={props.refNo || ""} />
				{!data ? (
					<Loader />
				) : data.length === 0 || !props.Type.hasOwnProperty("q") ? (
					<Alert color="danger">{props.refNo} IS NOT FOUND</Alert>
				) : (
					<Row>
						<Col xl={8} lg={6}>
							<Card className="d-block">
								<CardBody>
									<UncontrolledDropdown className="card-widgets">
										<DropdownToggle tag="a" href="#" className="arrow-none">
											<i className="dripicons-dots-3"></i>
										</DropdownToggle>

										<DropdownMenu right>
											<DropdownItem>
												<i className="mdi mdi-pencil mr-1"></i>Edit
											</DropdownItem>
											<DropdownItem>
												<i className="mdi mdi-delete mr-1"></i>Delete
											</DropdownItem>
											<DropdownItem>
												<i className="mdi mdi-email-outline mr-1"></i>Invite
											</DropdownItem>
											<DropdownItem>
												<i className="mdi mdi-exit-to-app mr-1"></i>Leave
											</DropdownItem>
										</DropdownMenu>
									</UncontrolledDropdown>
									{/* {ga.F_ExpRefNo || ga.F_CustRefNo || ga.F_ExPref} */}
									<h3 className="mt-0">
										{(data.master && data.master.F_CustRefNo) ||
											data.house.map(
												(ga) =>
													ga.F_CustRefNo || ga.F_ExPref || ga.F_ExpRefNo || ""
											) ||
											"PO# UNDEFINED"}
									</h3>

									<Nav tabs className="nav-bordered mb-3">
										<NavItem>
											<NavLink
												className={selectedNav == 1 ? "active" : "inactive"}
												onClick={() => setSelectedNav(1)}
												style={{ cursor: "pointer" }}
											>
												Overview
											</NavLink>
										</NavItem>
										<NavItem>
											<NavLink
												className={selectedNav == 2 ? "active" : "inactive"}
												onClick={() => setSelectedNav(2)}
												style={{ cursor: "pointer" }}
											>
												Detail
											</NavLink>
										</NavItem>
										<NavItem>
											<NavLink
												className={selectedNav == 3 ? "active" : "inactive"}
												onClick={() => setSelectedNav(3)}
												style={{ cursor: "pointer" }}
											>
												File
											</NavLink>
										</NavItem>
									</Nav>

									{selectedNav == 1 && (
										<React.Fragment>
											<h5 className="mb-2">Project Overview:</h5>
											<Row>
												<Col md={3}>
													<div className="mb-4">
														<h5>MASTER B/L</h5>
														<p>
															{data.master.F_MBLNo ||
																data.master.F_SMBLNo ||
																data.master.F_MawbNo}
														</p>
													</div>
												</Col>
												{/* <Col md={3}>
													<div className="mb-4">
														<h5>VOLUME</h5>
														<p>
															{data.reduce((a, b) => a + (b.F_CBM || 0), 0)} CBM
														</p>
													</div>
												</Col> */}
												<Col md={3}>
													<div className="mb-4 text-uppercase">
														<h5>WEIGHT</h5>
														<p>
															{isQuery &&
																(props.Type.q === "OIM" ||
																	props.Type.q === "OEX") &&
																`${data.house.reduce(
																	(a, b) => a + (b.F_KGS || 0),
																	0
																)} KG`}
															{isQuery &&
																(props.Type.q === "AEX" ||
																	props.Type.q === "AIM") &&
																`${data.house.reduce(
																	(a, b) => a + (b.F_ChgWeight || 0),
																	0
																)} KG`}
														</p>
													</div>
												</Col>
												<Col md={3}>
													<div className="mb-4 text-uppercase">
														<h5>VESSEL</h5>
														<p>
															{data.master.F_Vessel ||
																data.master.F_FLTno ||
																data.master.F_FLTNo}{" "}
															{data.master.F_Voyage}
														</p>
													</div>
												</Col>
												<Col md={3}>
													<div className="mb-4 text-uppercase">
														<h5>CONTAINER</h5>
														<p>{data.container.length}</p>
													</div>
												</Col>
											</Row>

											{/* <div className="mb-2">
												<b>CONSIGNEE</b>: {data.master.F_CName}
											</div>
											<div className="mb-2">
												<b>NOTIFY</b>: {data.master.F_NName}
											</div>
											<div className="mb-2">
												<b>SHIPPER</b>: {data.master.F_SName}
											</div> */}
										</React.Fragment>
									)}
									{selectedNav == 2 && (
										<React.Fragment>
											<h5 className="card-title mb-2">Details</h5>

											{data.house.map((ga) => (
												<Row key={ga.F_ID}>
													<Col md={3}>
														<div className="mb-4">
															<h5>HOUSE B/L</h5>
															<p>{ga.F_HBLNo || ga.F_HawbNo || ga.F_HAWBNo}</p>
														</div>
													</Col>
													<Col md={3}>
														<div className="mb-4">
															<h5>REF</h5>
															<p>
																{ga.F_ExpRefNo || ga.F_CustRefNo || ga.F_ExPref}
															</p>
														</div>
													</Col>
													<Col md={4}>
														<div className="mb-4">
															<h5>PACKAGES</h5>
															<p>
																{ga.F_PKGS || ga.F_Pkgs}{" "}
																{ga.F_PUnit || ga.F_Punit}
															</p>
														</div>
													</Col>
												</Row>
											))}
											{data.container.map((ga) => (
												<Row key={ga.F_ID}>
													<Col md={4}>
														<div className="mb-4">
															<h5>CONTAINER NUMBER</h5>
															<p>{ga.F_ContainerNo}</p>
														</div>
													</Col>
													<Col md={4}>
														<div className="mb-4">
															<h5>TYPE</h5>
															<p>{ga.F_ConType}</p>
														</div>
													</Col>
													<Col md={4}>
														<div className="mb-4">
															<h5>SEAL</h5>
															<p>{ga.F_SealNo}</p>
														</div>
													</Col>
												</Row>
											))}
										</React.Fragment>
									)}
									{selectedNav == 3 && (
										<React.Fragment>
											<Card>
												<CardBody>
													<h5 className="card-title mb-3">Detail</h5>

													<Card className="mb-1 shadow-none border">
														<div className="p-2">
															<Row className="align-items-center">
																<div className="col-auto">
																	<div className="avatar-sm">
																		<span className="avatar-title rounded">
																			.ZIP
																		</span>
																	</div>
																</div>
																<div className="col pl-0">
																	<a
																		href="#"
																		className="text-muted font-weight-bold"
																	>
																		Hyper-admin-design.zip
																	</a>
																	<p className="mb-0">2.3 MB</p>
																</div>
																<div className="col-auto">
																	<a
																		href="#"
																		className="btn btn-link btn-lg text-muted"
																	>
																		<i className="dripicons-download"></i>
																	</a>
																</div>
															</Row>
														</div>
													</Card>
												</CardBody>
											</Card>
										</React.Fragment>
									)}
								</CardBody>
							</Card>
							<Comments />
						</Col>

						<Col xl={4} lg={6}>
							<Card>
								<CardBody>
									<h4 className="header-title mb-2">Route Detail</h4>

									<SimpleBar style={{ maxHeight: "430px", width: "100%" }}>
										<div className="timeline-alt pb-0">
											<div className="timeline-item">
												<i
													className={`mdi mdi-anchor timeline-icon ${
														moment(data.master.F_ETD)
															.utc()
															.isSameOrAfter(moment())
															? "bg-info-lighten text-info"
															: "bg-secondary-lighten text-secondary"
													}`}
												></i>
												<div className="timeline-item-info">
													<a
														href="#"
														className={`${
															moment(data.master.F_ETD)
																.utc()
																.isSameOrAfter(moment())
																? "text-info"
																: "text-secondary"
														} font-weight-bold mb-1 d-block`}
													>
														{data.master && data.master.F_LoadingPort}
													</a>
													<small>
														<span className="font-weight-bold">
															{data.master &&
																moment(data.master.F_ETD).utc().format("l")}
														</span>
													</small>
													<p className="mb-0 pb-2">
														<small className="text-muted">
															{data.master &&
																moment(data.master.F_ETD).utc().fromNow()}
														</small>
													</p>
												</div>
											</div>

											<div className="timeline-item">
												<i
													className={`mdi mdi-ferry timeline-icon ${
														moment(data.master.F_ETA)
															.utc()
															.isSameOrAfter(moment())
															? "bg-primary-lighten text-primary"
															: "bg-secondary-lighten text-secondary"
													}`}
												></i>
												<div className="timeline-item-info">
													<a
														href="#"
														className={`${
															moment(data.master.F_ETA)
																.utc()
																.isSameOrAfter(moment())
																? "text-primary"
																: "text-secondary"
														} font-weight-bold mb-1 d-block`}
													>
														<span>
															{data.master.F_DisCharge ||
																data.master.F_Discharge}
														</span>{" "}
													</a>
													<small>
														<span className="font-weight-bold">
															{moment(data.master.F_ETA).utc().format("l")}
														</span>
													</small>
													<p className="mb-0 pb-2">
														<small className="text-muted">
															{moment(data.master.F_ETA).utc().fromNow()}
														</small>
													</p>
												</div>
											</div>
											{(data.master.F_FinalDest ||
												data.house[0].F_FinalDest) && (
												<div className="timeline-item">
													{/* data.house[0].F_FinalDest */}
													<i
														className={`mdi mdi-airplane timeline-icon ${
															data.house.length
																? moment(data.house[0].F_FETA)
																		.utc()
																		.isSameOrAfter(moment())
																	? "bg-primary-lighten text-primary"
																	: "bg-secondary-lighten text-secondary"
																: moment(data.master.F_FETA)
																		.utc()
																		.isSameOrAfter(moment())
																? "bg-primary-lighten text-primary"
																: "bg-secondary-lighten text-secondary"
														}`}
													></i>
													<div className="timeline-item-info">
														<a
															href="#"
															className={`font-weight-bold mb-1 d-block ${
																data.house.length
																	? moment(data.house[0].F_FETA)
																			.utc()
																			.isSameOrAfter(moment())
																		? "text-primary"
																		: "text-secondary"
																	: moment(data.master.F_FETA)
																			.utc()
																			.isSameOrAfter(moment())
																	? "text-primary"
																	: "text-secondary"
															}`}
														>
															<span>
																{/* {data.master && data.master.F_FinalDest} */}
																{data.house.length
																	? data.house[0].F_FinalDest
																	: data.master.F_FinalDest}
															</span>
														</a>
														<small>
															<span className="font-weight-bold">
																{/* {data.master.F_FETA
																	? moment(data.master.F_FETA).utc().format("l")
																	: ""} */}
																{data.house.length
																	? moment(data.house[0].F_FETA)
																			.utc()
																			.format("l")
																	: moment(data.master.F_FETA)
																			.utc()
																			.format("l")}
															</span>
														</small>
														<p className="mb-0 pb-2">
															<small className="text-muted">
																{/* {data.master.F_FETA
																	? moment(data.master.F_FETA).utc().fromNow()
																	: ""} */}
																{data.house.length
																	? moment(data.house[0].F_FETA).utc().fromNow()
																	: moment(data.master.F_FETA).utc().fromNow()}
															</small>
														</p>
													</div>
												</div>
											)}

											{/* <div className="timeline-item">
												<i className="mdi mdi-truck-check bg-primary-lighten text-primary timeline-icon"></i>
												<div className="timeline-item-info">
													<a
														href="#"
														className="text-primary font-weight-bold mb-1 d-block"
													>
														DELIVERED
													</a>
													<small>
														<span className="font-weight-bold">
															{moment().format("l")}
														</span>{" "}
													</small>
													<p className="mb-0 pb-2">
														<small className="text-muted">
															{moment().fromNow()}
														</small>
													</p>
												</div>
											</div> */}
										</div>
									</SimpleBar>
								</CardBody>
							</Card>
							{/* <code>{JSON.stringify(data)}</code> */}
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
				Type: query,
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
