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
const Invoice = ({ data }) => {
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

				<h4 className="header-title mb-3">Invoice</h4>

				<p>
					<b>107</b> Tasks completed out of 195
				</p>
				{!data ? (
					<Loader />
				) : (
					<Table
						responsive
						className="table-centered table-nowrap table-hover mb-0"
					>
						<tbody>
							{data &&
								data.map((ga) => (
									<Link key={ga.F_ID} href={`/invoice/${ga.F_InvoiceNo}`}>
										<tr>
											<td>
												<h5 className="font-14 my-1">
													<a href="/" className="text-body">
														{ga.F_InvoiceNo}
													</a>
												</h5>
												<span className="text-danger font-13">
													<i className="mdi mdi-credit-card"></i> Invoice
													Overdue
												</span>
											</td>
											<td>
												<br />
												<span className="text-danger font-13">
													{ga.F_DueDate}
												</span>
											</td>
										</tr>
									</Link>
								))}
						</tbody>
					</Table>
				)}

				<Button color="primary" block className="mt-2" size="sm">
					View All
				</Button>
			</CardBody>
		</Card>
	);
};

export default Invoice;
