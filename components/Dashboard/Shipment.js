// @flow
import Link from "next/link";
import React from "react";
import {
	Card,
	CardBody,
	UncontrolledButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Table,
	Button,
} from "reactstrap";
import moment from "moment";
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
const Shipment = ({ data }) => {
	return (
		<Card>
			<CardBody>
				<UncontrolledButtonDropdown className="float-right">
					<DropdownToggle
						tag="button"
						className="btn btn-link arrow-none card-drop p-0"
					>
						<i className="mdi mdi-dots-vertical"></i>
					</DropdownToggle>

					<DropdownMenu right>
						<DropdownItem>Export Report</DropdownItem>
						<DropdownItem>Print</DropdownItem>
					</DropdownMenu>
				</UncontrolledButtonDropdown>

				<h4 className="header-title mb-3">Shipments</h4>

				<p>
					<b>{data && data.length}</b> Tasks completed out of 200
				</p>
				{!data ? (
					<Loader />
				) : (
					<Table
						responsive
						className="table-centered table-nowrap table-hover mb-0"
					>
						<tbody>
							{data.length > 0 &&
								data.map((ga, i) => (
									<Link
										href={`/shipment/${ga.Ref}?q=${ga.Type}`}
										key={i + "shipment"}
									>
										<tr>
											<td>
												<h5 className="font-14 my-1">
													<a href="/" className="text-body">
														<span className="text-muted">{ga.Ref}</span>{" "}
														<span className="text-primary">{ga.CustRef}</span>
														{/* <small className="text-primary ml-2">
															{moment(ga.Ready).utc().fromNow()}
														</small> */}
														{ga.Type == "OIM" && (
															<i className="mdi mdi-ferry text-primary float-right"></i>
														)}
														{ga.Type == "OEX" && (
															<i className="mdi mdi-boom-gate-up-outline text-primary float-right"></i>
														)}
														{ga.Type == "AIM" && (
															<i className="mdi mdi-airplane text-primary float-right"></i>
														)}
														{ga.Type == "AEX" && (
															<i className="mdi mdi-airplane-takeoff text-primary float-right"></i>
														)}
													</a>
												</h5>
												<h5 className="font-12 my-1">
													{moment(ga.Ready).isSameOrAfter(moment())
														? `Estimate Arrival ${moment(ga.Ready)
																.utc()
																.fromNow()}`
														: `Delivered ${moment(ga.Ready).utc().fromNow()}`}
												</h5>
												<div className="mt-2 progress">
													<div
														className="progress-bar"
														role="progressbar"
														aria-valuenow="100"
														aria-valuemin="0"
														aria-valuemax="100"
														style={
															moment(ga.Ready).isSameOrAfter(moment())
																? { width: "50%" }
																: { width: "100%" }
														}
													></div>
												</div>
												{/* <span className="text-muted font-13">{ga.F_ETA}</span> */}
											</td>
											{/* <td>
												<span className="text-muted font-13">Status</span>{" "}
												<br />
												<span className="badge badge-warning-lighten">
													In-progress
												</span>
											</td>
											<td>
												<span className="text-muted font-13">Assigned to</span>
												<h5 className="font-14 mt-1 font-weight-normal">
													{ga.F_U1ID[0]}
												</h5>
											</td>
											<td>
												<span className="text-muted font-13">
													Total time spend
												</span>
												<h5 className="font-14 mt-1 font-weight-normal">
													3h 20min
												</h5>
											</td>
											<td className="table-action" style={{ width: "90px" }}>
												<a href="/" className="action-icon">
													{" "}
													<i className="mdi mdi-pencil"></i>
												</a>
												<a href="/" className="action-icon">
													{" "}
													<i className="mdi mdi-delete"></i>
												</a>
											</td> */}
										</tr>
									</Link>
								))}
						</tbody>
					</Table>
				)}
				<Link href="/shipment">
					<Button color="primary" block className="mt-2" size="sm">
						View All
					</Button>
				</Link>
			</CardBody>
		</Card>
	);
};

export default Shipment;
