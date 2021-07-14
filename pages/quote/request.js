import Head from "next/head";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import {
	Row,
	Col,
	Card,
	CardBody,
	Button,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Label,
	CustomInput,
	Input,
} from "reactstrap";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import useSWR from "swr";
import Link from "next/link";
import { useEffect, useState } from "react";
import DatePicker from "react-flatpickr";

export default function page(props) {
	const [searchFrom, setSearchFrom] = useState(false);
	const [searchTo, setSearchTo] = useState(false);
	const [from, setFrom] = useState(false);
	const [to, setTo] = useState(false);
	const [isDG, setIsDG] = useState(false);
	const [startDate, setStartDate] = useState(new Date());

	const { data: fromData } = useSWR(
		searchFrom ? `/api/quote/getCities?name=${searchFrom}` : null
	);
	const { data: toData } = useSWR(
		searchTo ? `/api/quote/getCities?name=${searchTo}` : null
	);

	// useEffect(() => {
	// 	console.log(fromData);
	// }, [from]);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!from) {
			alert("PLASE SELECT FROM CITY");
			return;
		}
		if (!to) {
			alert("PLASE SELECT TO CITY");
			return;
		}
		if (
			e.target[6].checked ? e.target[13].value == "" : e.target[11].value == ""
		) {
			alert("PLASE ENTER DATE");
			return;
		}
		const fetchs = await fetch("/api/quote/postQuote", {
			body: JSON.stringify({
				fromCity: from.geonameid,
				toCity: to.geonameid,
				fromType: e.target[1].checked ? "CY" : "SD",
				toType: e.target[4].checked ? "CY" : "SD",
				commodity: e.target[6].value,
				isDG: e.target[7].checked ? "1" : "0",
				class: e.target[7].checked ? e.target[8].value : "",
				un: e.target[7].checked ? e.target[9].value : "",
				containerType: e.target[7].checked
					? e.target[10].value
					: e.target[8].value,
				containerQty: e.target[7].checked
					? e.target[11].value
					: e.target[9].value,
				containerWeight: e.target[7].checked
					? e.target[12].value
					: e.target[10].value,
				expectedDate: e.target[7].checked
					? e.target[13].value
					: e.target[11].value,
			}),
			method: "POST",
		});
		const res = await fetchs.json();
		console.log(res);
	}
	var current = [
		{
			label: "Quote",
			path: "/quote",
			active: false,
		},
		{
			label: "Request",
			path: "/",
			active: true,
		},
	];

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>Quote Request</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title="Request" />
				<Row>
					<Col>
						<Card>
							<CardBody>
								<form onSubmit={handleSubmit}>
									<Row>
										<Col>
											<Dropdown
												isOpen={searchFrom != false}
												toggle={() => {
													return;
												}}
											>
												<DropdownToggle
													tag="a"
													className="d-none"
												></DropdownToggle>
												<div className="form-group">
													<label htmlFor="from">From (City)</label>
													<input
														type="text"
														required
														placeholder="From"
														id="from"
														className="form-control"
														autoComplete="off"
														autoCorrect="off"
														value={
															from
																? `${from.name}, ${from.country}`
																: searchFrom
																? searchFrom
																: ""
														}
														onChange={(e) => {
															setSearchFrom(e.target.value);
														}}
														onKeyDown={(e) => {
															if (e.keyCode == 8) {
																setFrom(false);
															}
														}}
													/>
												</div>
												{!from && fromData && (
													<DropdownMenu
														className="dropdown-menu-animated topbar-dropdown-menu dropdown-lg w-100"
														style={{ overflowY: "scroll", maxHeight: "200px" }}
													>
														{fromData.length > 0 &&
															fromData.map((ga) => (
																<DropdownItem
																	key={ga.geonameid}
																	onClick={() => {
																		setFrom(ga);
																	}}
																>
																	{ga.name}, {ga.country}
																</DropdownItem>
															))}
													</DropdownMenu>
												)}
											</Dropdown>
											<div>
												<CustomInput
													type="radio"
													id="fromCY"
													name="from"
													label="CY"
													defaultChecked
												/>
												<CustomInput
													type="radio"
													name="from"
													id="fromSD"
													label="SD"
												/>
											</div>
										</Col>
										<Col>
											<Dropdown
												isOpen={searchTo != false}
												toggle={() => {
													return;
												}}
											>
												<DropdownToggle
													tag="a"
													className="d-none"
												></DropdownToggle>
												<div className="form-group">
													<label htmlFor="to">To (City)</label>
													<input
														type="text"
														required
														placeholder="To"
														id="to"
														className="form-control"
														autoComplete="off"
														autoCorrect="off"
														value={
															to
																? `${to.name}, ${to.country}`
																: searchTo
																? searchTo
																: ""
														}
														onChange={(e) => {
															setSearchTo(e.target.value);
														}}
														onKeyDown={(e) => {
															if (e.keyCode == 8) {
																setTo(false);
															}
														}}
													/>
												</div>
												{!to && toData && (
													<DropdownMenu
														className="dropdown-menu-animated topbar-dropdown-menu dropdown-lg w-100"
														style={{ overflowY: "scroll", maxHeight: "200px" }}
													>
														{toData.length > 0 &&
															toData.map((ga) => (
																<DropdownItem
																	key={ga.geonameid}
																	onClick={() => setTo(ga)}
																>
																	{ga.name}, {ga.country}
																</DropdownItem>
															))}
													</DropdownMenu>
												)}
											</Dropdown>
											<div>
												<CustomInput
													type="radio"
													id="toCY"
													name="to"
													label="CY"
													defaultChecked
												/>
												<CustomInput
													type="radio"
													name="to"
													id="toSD"
													label="SD"
												/>
											</div>
										</Col>
									</Row>
									<hr />
									<Row className="mt-1">
										<Col>
											<div className="form-group">
												<label htmlFor="commodity">Commodity</label>
												<input
													type="text"
													required
													placeholder="Commodity"
													id="commodity"
													className="form-control"
													autoComplete="off"
													autoCorrect="off"
												/>
											</div>
											<div>
												<CustomInput
													type="checkbox"
													id="dg"
													label="Dangerous Cargo"
													onChange={(e) => setIsDG(e.target.checked)}
												/>
											</div>
										</Col>
									</Row>
									{isDG && (
										<Row className="mt-1">
											<Col>
												<div className="form-group">
													<label htmlFor="classnum">Class #</label>
													<input
														type="text"
														placeholder="Class Number"
														id="classnum"
														className="form-control"
														autoComplete="off"
														autoCorrect="off"
													/>
												</div>
											</Col>
											<Col>
												<div className="form-group">
													<label htmlFor="un">UN #</label>
													<input
														type="text"
														placeholder="UN Number"
														id="un"
														className="form-control"
														autoComplete="off"
														autoCorrect="off"
													/>
												</div>
											</Col>
										</Row>
									)}
									<hr />
									<Row className="mt-1">
										<Col sm="6">
											<Label for="container">Container Type</Label>
											<Input
												type="select"
												name="select"
												id="container"
												className="custom-select"
												required
											>
												<option>20 Dry Standard</option>
												<option>40 Dry Standard</option>
												<option>40 Dry High</option>
												<option>45 Dry High</option>
												<option>20 Reefer Standard</option>
												<option>40 Reefer High</option>
											</Input>
										</Col>
										<Col sm="3">
											<Label for="container-qty">Container Quantity</Label>
											<Input
												type="number"
												name="number"
												id="container-qty"
												placeholder="0"
												required
											/>
										</Col>
										<Col sm="3">
											<Label for="container-weight">Weight (Lbs)</Label>
											<Input
												type="number"
												name="number"
												id="container-weight"
												defaultValue={40000}
												required
											/>
										</Col>
									</Row>
									<hr />
									<Row className="mt-1">
										<Col sm="6">
											<div>
												<Label for="date">Expected Departure Date</Label>
												<DatePicker
													required
													selected={startDate}
													onChange={(date) => setStartDate(date)}
													className="form-control form-control-light"
													id="dash-daterange"
													hideaddon="true"
													mindate={new Date()}
													maxdate={
														new Date(
															new Date().setMonth(new Date().getMonth() + 7)
														)
													}
												/>
											</div>
										</Col>
									</Row>

									<Button type="submit" color="primary" className="float-right">
										Submit
									</Button>
								</form>
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
