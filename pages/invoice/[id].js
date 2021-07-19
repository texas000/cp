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
import usdFormat from "../../lib/format";

const fetcher = async (...args) => {
	const res = await fetch(...args);
	return res.json();
};
export default function page(props) {
	const router = useRouter();

	var current = [
		{ label: "Invoice", path: "/invoice", active: false },
		{ label: props.refNo, path: "/invoice/1", active: true },
	];
	const { data: invoice } = useSWR(`/api/invoice/${props.refNo}`, fetcher);

	useEffect(() => {
		console.log(invoice);
	}, [invoice]);
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
				) : invoice.length == 0 ? (
					<h1>NOT FOUND</h1>
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
													<b>REF NUM: {invoice.Master.F_RefNo}</b>
												</p>
												<p className="text-muted font-13 my-1">
													CUST REF: {invoice.Main.F_YourRef}
												</p>
												<p className="text-muted font-13 my-1">
													MASTER BL:{" "}
													{invoice.Master.F_MBLNo ||
														invoice.Master.F_MawbNo ||
														invoice.Master.F_SMBLNo}
												</p>
												<p className="text-muted font-13 my-1">
													HOUSE BL:{" "}
													{invoice.House.F_HBLNo ||
														invoice.House.F_HawbNo ||
														invoice.House.F_HAWBNo}
												</p>
												<p className="text-muted font-13 my-1">
													VEESEL NO:{" "}
													{invoice.Master.F_Vessel ||
														invoice.Master.F_FLTno ||
														invoice.Master.F_FLTNo}{" "}
													{invoice.Master.F_Voyage}
												</p>
												<p className="text-muted font-13 my-1">
													POL:{" "}
													{`${invoice.Master.F_LoadingPort} / ${moment(
														invoice.Master.F_ETD
													)
														.utc()
														.format("LL")}`}
												</p>
												<p className="text-muted font-13 my-1">
													POD:{" "}
													{`${
														invoice.Master.F_DisCharge ||
														invoice.Master.F_Discharge
													} / ${moment(invoice.Master.F_ETA)
														.utc()
														.format("LL")}`}
												</p>
												{invoice.Master.F_FinalDest && (
													<p className="text-muted font-13 my-1">
														DEST:{" "}
														{`${invoice.Master.F_FinalDest} / ${moment(
															invoice.Master.F_FETA
														)
															.utc()
															.format("LL")}`}
													</p>
												)}
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
												{invoice.Bill.F_State} {invoice.Bill.F_ZipCode}{" "}
												{invoice.Bill.F_Country}
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
											</address>
										</Col>
									</Row>

									<Row>
										<Col>
											<div className="table-responsive">
												<table className="table mt-4">
													<thead>
														<tr>
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
																		<td>
																			<b>{item.F_Description}</b>
																		</td>
																		<td>{item.F_Qty}</td>
																		<td>{usdFormat(item.F_Rate)}</td>
																		<td className="text-right">
																			{usdFormat(item.F_Amount)}
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
													<br />
													{invoice.Memo && invoice.Memo.F_C1}
													{invoice.Memo && invoice.Main.F_U1ID}
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
												<h3>{usdFormat(invoice.Main.F_InvoiceAmt)} USD</h3>
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
