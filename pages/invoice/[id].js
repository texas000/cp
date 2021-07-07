import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Row, Col, Card, CardBody } from "reactstrap";
import useSWR from "swr";
import moment from "moment";
const fetcher = async (...args) => {
	const res = await fetch(...args);
	return res.json();
};
export default function page(props) {
	const router = useRouter();

	var current = [
		{ label: "shipment", path: "/invoice", active: false },
		{ label: props.refNo, path: "/invoice/1", active: true },
	];
	const { data: invoice } = useSWR(`/api/invoice/${props.refNo}`, fetcher);

	var data = {
		customer: "Cooper Hobson",
		notes:
			"Please find below a cost-breakdown for the recent work completed. Please make payment at your earliest convenience, and do not hesitate to contact me with any questions.",
		order_date: "Jan 17, 2018",
		order_status: "Paid",
		order_id: "123456",
		billing_address: {
			line_1: "Lynne K. Higby",
			line_2: "795 Folsom Ave, Suite 600",
			city: "San Francisco",
			state: "CA",
			zip: 94107,
			phone: "(123) 456-7890",
		},
		shipping_address: {
			line_1: "Cooper Hobson",
			line_2: "795 Folsom Ave, Suite 600",
			city: "San Francisco",
			state: "CA",
			zip: 94107,
			phone: "(123) 456-7890",
		},
		items: [
			{
				id: 1,
				name: "Laptop",
				description: 'Brand Model VGN-TXN27N/B 11.1" Notebook PC',
				qty: 1,
				unit_cost: "$1799.00",
				total: "$1799.00",
			},
			{
				id: 2,
				name: "Warranty",
				description: "Two Year Extended Warranty - Parts and Labor",
				qty: 3,
				unit_cost: "$499.00",
				total: "$1497.00",
			},
			{
				id: 3,
				name: "LED",
				description: "80cm (32) HD Ready LED TV",
				qty: 2,
				unit_cost: "$412.00",
				total: "$824.00",
			},
		],
		sub_total: "$4120.00",
		vat: "$515.00",
		total: "$4635.00",
	};

	useEffect(() => {}, []);
	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>{props.refNo}</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title={props.refNo} />
				{/* {JSON.stringify(invoice)} */}
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
				) : (
					<Row>
						<Col>
							<Card>
								<CardBody>
									<div className="clearfix">
										<div className="float-left mb-3">
											<img
												src="/assets/images/logo-light.png"
												alt="logo"
												height="18"
											/>
										</div>
										<div className="float-right">
											<h4 className="m-0 d-print-none">Invoice</h4>
										</div>
									</div>

									<Row>
										<Col sm={6}>
											<div className="float-left mt-3">
												<p>
													<b>Hello, Customer</b>
												</p>
												<p className="text-muted font-13">Note Here</p>
											</div>
										</Col>

										<Col sm={6}>
											<div className="mt-3 float-sm-right">
												<p className="font-13">
													<strong>Post Date: </strong> &nbsp;&nbsp;&nbsp;
													{moment(invoice.Main.F_PostDate).utc().format("l")}
												</p>
												<p className="font-13">
													<strong>Invoice Date: </strong> &nbsp;&nbsp;&nbsp;
													{moment(invoice.Main.F_InvoiceDate).utc().format("l")}
												</p>
												<p className="font-13">
													<strong>Due Date: </strong> &nbsp;&nbsp;&nbsp;
													{moment(invoice.Main.F_DueDate).utc().format("l")}
												</p>
												{/* <p className="font-13">
													<strong>Order Status: </strong>{" "}
													<span className="badge badge-success float-right">
														In Progress
													</span>
												</p> */}
											</div>
										</Col>
									</Row>
									<Row className="mt-4">
										<Col sm={4}>
											<h6>Billing Address</h6>
											<h6>{invoice.Bill.F_SName}</h6>
											<address>
												{invoice.Bill.F_Addr}
												<br />
												{invoice.Bill.F_City}
												<br />
												{invoice.Bill.F_State}, {invoice.Bill.F_ZipCode}{" "}
												{invoice.Bill.F_Country}
												<br />
												{/* <abbr title="Phone">P:</abbr>{" "}
												{.phone} */}
											</address>
										</Col>
										<Col sm={4}>
											<h6>Shipping Address</h6>
											<h6>{invoice.Ship.F_SName}</h6>
											<address>
												{invoice.Ship.F_Addr}
												<br />
												{invoice.Ship.F_City}
												<br />
												{invoice.Ship.F_State} {invoice.Ship.F_ZipCode}
												{invoice.Ship.F_Country}
												<br />
												{/* <abbr title="Phone">P:</abbr>{" "}
												{.phone} */}
											</address>
										</Col>
									</Row>

									<Row>
										<Col>
											<div className="table-responsive">
												<table className="table mt-4">
													<thead>
														<tr>
															<th>#</th>
															<th>Item</th>
															<th>Quantity</th>
															<th>Unit Cost</th>
															<th className="text-right">Total</th>
														</tr>
													</thead>
													<tbody>
														{invoice &&
															invoice.Detail.map((item, idx) => {
																return (
																	<tr key={idx}>
																		<td>{item.F_ID}</td>
																		<td>
																			<b>{item.F_Description}</b>
																		</td>
																		<td>{item.F_Qty}</td>
																		<td>${item.F_Rate}</td>
																		<td className="text-right">
																			${item.F_Amount}
																		</td>
																	</tr>
																);
															})}
													</tbody>
												</table>
											</div>
										</Col>
									</Row>
									<Row>
										<Col sm={6}>
											<div className="clearfix pt-3">
												<h6 className="text-muted">Notes:</h6>
												<small>
													All accounts are to be paid within 7 days from receipt
													of invoice. To be paid by cheque or credit card or
													direct payment online. If account is not paid within 7
													days the credits details supplied as confirmation of
													work undertaken will be charged the agreed quoted fee
													noted above.
												</small>
											</div>
										</Col>
										<Col sm={6}>
											<div className="float-right mt-3 mt-sm-0">
												{/* <p>
                                    <b>Sub-total:</b>{" "}
                                    <span className="float-right">{invoice[0].F_InvoiceAmt}</span>
                                </p> */}
												{/* <p>
                                    <b>VAT (12.5):</b>{" "}
                                    <span className="float-right">{data.vat}</span>
                                </p> */}
												<h3>${invoice.Main.F_InvoiceAmt} USD</h3>
											</div>
											<div className="clearfix"></div>
										</Col>
									</Row>
									<div className="d-print-none mt-4">
										<div className="text-right">
											<button
												className="btn btn-primary"
												onClick={(e) => {
													window.print();
												}}
											>
												<i className="mdi mdi-printer"></i> Print
											</button>
										</div>
									</div>
								</CardBody>
							</Card>
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
