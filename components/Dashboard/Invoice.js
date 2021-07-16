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
					<b>{data && data.length}</b> pending invoices
				</p>
				{!data ? (
					<Loader />
				) : (
					<Table
						responsive
						className="table-centered table-nowrap table-hover mb-0"
					>
						<tbody>
							{data.length ? (
								data.map((ga) => (
									<Link key={ga.F_ID} href={`/invoice/${ga.F_InvoiceNo}`}>
										<tr>
											<td>
												<h5 className="font-14 my-1">
													<a href="/" className="text-body">
														{ga.F_InvoiceNo}
													</a>
												</h5>
												<span
													className={`${
														moment(ga.F_DueDate).isBefore()
															? "text-danger font-13"
															: "font-13"
													}`}
												>
													<i className="mdi mdi-credit-card mr-1"></i>
													{moment(ga.F_DueDate).isBefore()
														? "Invoice Overdue"
														: "Invoice Due"}
												</span>
											</td>
											<td>
												<br />
												<span
													className={`${
														moment(ga.F_DueDate).isBefore()
															? "text-danger"
															: "text-muted"
													} font-13`}
												>
													{moment(ga.F_DueDate).utc().fromNow()}
												</span>
											</td>
										</tr>
									</Link>
								))
							) : (
								<tr>
									<td colSpan="2">NO PENDING INVOICE</td>
								</tr>
							)}
						</tbody>
					</Table>
				)}
				<Link href="/invoice">
					<Button color="primary" block className="mt-2" size="sm">
						View All
					</Button>
				</Link>
			</CardBody>
		</Card>
	);
};

export default Invoice;
