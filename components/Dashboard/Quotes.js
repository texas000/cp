// @flow
import React from "react";
import Link from "next/link";
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

const Quotes = () => {
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

				<h4 className="header-title mb-3">Quotes</h4>

				<p>
					<b>107</b> Quotes active out of 195
				</p>

				<Table
					responsive
					className="table-centered table-nowrap table-hover mb-0"
				>
					<tbody>
						<tr>
							<td>
								<h5 className="font-14 my-1">
									<a href="/" className="text-body">
										JW-QUOTE-1
									</a>
								</h5>
								<span className="text-muted font-13">AEX-1234</span>
							</td>
							<td>
								<span className="text-muted font-13">Status</span> <br />
								<span className="badge badge-warning-lighten">In-progress</span>
							</td>
						</tr>
						<tr>
							<td>
								<h5 className="font-14 my-1">
									<a href="/" className="text-body">
										JW-QUOTE-2
									</a>
								</h5>
								<span className="text-muted font-13">OEX-1234</span>
							</td>
							<td>
								<span className="text-muted font-13">Status</span> <br />
								<span className="badge badge-danger-lighten">Outdated</span>
							</td>
						</tr>
						<tr>
							<td>
								<h5 className="font-14 my-1">
									<a href="/" className="text-body">
										JW-QUOTE-3
									</a>
								</h5>
								<span className="text-muted font-13">AIM-1234</span>
							</td>
							<td>
								<span className="text-muted font-13">Status</span> <br />
								<span className="badge badge-success-lighten">Completed</span>
							</td>
						</tr>
						<tr>
							<td>
								<h5 className="font-14 my-1">
									<a href="/" className="text-body">
										JW-QUOTE-4
									</a>
								</h5>
								<span className="text-muted font-13">OIM-1234</span>
							</td>
							<td>
								<span className="text-muted font-13">Status</span> <br />
								<span className="badge badge-warning-lighten">In-progress</span>
							</td>
						</tr>
					</tbody>
				</Table>
				<Link href="/quote">
					<Button color="primary" block className="mt-2" size="sm">
						View All
					</Button>
				</Link>
			</CardBody>
		</Card>
	);
};

export default Quotes;
