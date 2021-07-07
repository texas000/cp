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
	const { data } = useSWR(`/api/shipment/${props.refNo}`, fetcher);

	// useEffect(() => {
	// 	console.log(data);
	// }, []);

	const project = {
		title: "PO#123",
		shortDesc:
			"This card has supporting text below as a natural lead-in to additional content is a little bit longer",
		state: "Ongoing",
		totalTasks: 81,
		totalComments: 103,
		totalMembers: 6,
		startDate: "17 March 2018",
		startTime: "1:00 PM",
		endDate: "22 December 2018",
		endTime: "1:00 PM",
		totalBudget: "$15,800",
	};

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
				) : data.length === 0 ? (
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

									<h3 className="mt-0">
										{(data && data[0].F_CustRefNo) || "PO# UNDEFINED"}
									</h3>

									<Nav tabs className="nav-bordered mb-3">
										<NavItem>
											<NavLink
												className={selectedNav == 1 && "active"}
												onClick={() => setSelectedNav(1)}
												style={{ cursor: "pointer" }}
											>
												Overview
											</NavLink>
										</NavItem>
										<NavItem>
											<NavLink
												className={selectedNav == 2 && "active"}
												onClick={() => setSelectedNav(2)}
												style={{ cursor: "pointer" }}
											>
												Detail
											</NavLink>
										</NavItem>
										<NavItem>
											<NavLink
												className={selectedNav == 3 && "active"}
												onClick={() => setSelectedNav(3)}
												style={{ cursor: "pointer" }}
											>
												File
											</NavLink>
										</NavItem>
									</Nav>

									{/* <div className="badge badge-secondary mb-3">
                  {project.state}
                </div> */}
									{selectedNav == 1 && (
										<React.Fragment>
											<h5 className="mb-2">Project Overview:</h5>

											<Row>
												<Col md={3}>
													<div className="mb-4">
														<h5>MBL</h5>
														<p>
															{data[0].F_MBLNo}
															{/* <small className="text-muted">
														{project.startTime}
													</small> */}
														</p>
													</div>
												</Col>
												<Col md={3}>
													<div className="mb-4">
														<h5>VOLUME</h5>
														<p>
															{data.reduce((a, b) => a + (b.F_CBM || 0), 0)} CBM
														</p>
													</div>
												</Col>
												<Col md={3}>
													<div className="mb-4 text-uppercase">
														<h5>WEIGHT</h5>
														<p>
															{data.reduce((a, b) => a + (b.F_KGS || 0), 0)} KG
														</p>
													</div>
												</Col>
												<Col md={3}>
													<div className="mb-4 text-uppercase">
														<h5>VESSEL</h5>
														<p>
															{data[0].F_Vessel} {data[0].F_Voyage}
														</p>
													</div>
												</Col>
											</Row>

											<div className="mb-2">
												<b>CONSIGNEE</b>: {data[0].F_CName}
											</div>
											<div className="mb-2">
												<b>NOTIFY</b>: {data[0].F_NName}
											</div>
											<div className="mb-2">
												<b>SHIPPER</b>: {data[0].F_SName}
											</div>
											{/* <code className="text-muted mb-2">
												{JSON.stringify(data)}
											</code> */}
										</React.Fragment>
									)}
									{selectedNav == 2 && (
										<React.Fragment>
											<Card>
												<CardBody>
													<h5 className="card-title mb-3">Files</h5>

													{data &&
														data.map((ga) => (
															<Row>
																<Col md={4}>
																	<div className="mb-4">
																		<h5>MBL</h5>
																		<p>{ga.F_HBLNo}</p>
																	</div>
																</Col>
																<Col md={4}>
																	<div className="mb-4">
																		<h5>PACKAGES</h5>
																		<p>{ga.F_PKGS}</p>
																	</div>
																</Col>
																<Col md={4}>
																	<div className="mb-4">
																		<h5>CONTAINER</h5>
																		<p>{ga.F_SelectContainer}</p>
																	</div>
																</Col>
															</Row>
														))}
												</CardBody>
											</Card>
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

									{/* <TeamMembers /> */}
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
												<i className="mdi mdi-anchor bg-info-lighten text-info timeline-icon"></i>
												<div className="timeline-item-info">
													<a
														href="#"
														className="text-info font-weight-bold mb-1 d-block"
													>
														{data[0].F_LoadingPort}
													</a>
													<small>
														<span className="font-weight-bold">
															{moment(data[0].F_ETD).utc().format("l")}
														</span>
													</small>
													<p className="mb-0 pb-2">
														<small className="text-muted">
															{moment(data[0].F_ETD).utc().fromNow()}
														</small>
													</p>
												</div>
											</div>

											<div className="timeline-item">
												<i className="mdi mdi-ferry bg-primary-lighten text-primary timeline-icon"></i>
												<div className="timeline-item-info">
													<a
														href="#"
														className="text-primary font-weight-bold mb-1 d-block"
													>
														<span>{data[0].F_DisCharge}</span>{" "}
													</a>
													<small>
														<span className="font-weight-bold">
															{moment(data[0].F_ETA).utc().format("l")}
														</span>
													</small>
													<p className="mb-0 pb-2">
														<small className="text-muted">
															{moment(data[0].F_ETA).utc().fromNow()}
														</small>
													</p>
												</div>
											</div>

											<div className="timeline-item">
												<i className="mdi mdi-airplane bg-info-lighten text-info timeline-icon"></i>
												<div className="timeline-item-info">
													<a
														href="#"
														className="text-info font-weight-bold mb-1 d-block"
													>
														<span>{data[0].F_FinalDest[0]}</span>
													</a>
													<small>
														<span className="font-weight-bold">
															{moment(data[0].F_FETA[0]).utc().format("l")}
														</span>
													</small>
													<p className="mb-0 pb-2">
														<small className="text-muted">
															{moment(data[0].F_FETA[0]).utc().fromNow()}
														</small>
													</p>
												</div>
											</div>

											<div className="timeline-item">
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
											</div>
										</div>
									</SimpleBar>
								</CardBody>
							</Card>
							{/* <Card className="d-block">
								<CardBody>
									<h4 className="mt-0 mb-3">Route Detail</h4>
									<ul className="vertical-steps">
										<li className="step-item is-done">
											<span>{data[0].F_LoadingPort}</span>
											<br />
											<span>
												Depatrue:{" "}
												<strong>
													{moment(data[0].F_ETD).utc().format("l")}
												</strong>
											</span>
										</li>

										<li className="step-item current">
											<span>{data[0].F_DisCharge}</span>
											<br />
											<span>
												Arrival:{" "}
												<strong>
													{moment(data[0].F_ETA).utc().format("l")}
												</strong>
											</span>
										</li>

										<li className="step-item">
											<span>{data[0].F_FinalDest[0]}</span>
											<br />
											<span>
												Delivery:{" "}
												<strong>
													{moment(data[0].F_FETA[0]).utc().format("l")}
												</strong>
											</span>
										</li>
									</ul>
								</CardBody>
							</Card> */}
							{/* <ProgressChart /> */}
							{/* <Files /> */}
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
