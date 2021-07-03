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
} from "reactstrap";
import Comments from "../../components/Project/Comment";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function page(props) {
	const router = useRouter();
	var current = [];
	var stringPath = "";
	const paths = router.pathname.substring(1);
	paths.split("/").map((path, i) => {
		stringPath = stringPath.concat("/", path);
		current.push({
			label: path,
			path: stringPath,
			active: i === paths.split("/").length - 1,
		});
	});
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
				<title>OIM-12345</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title={paths.split("/")[1]} />
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

								<h3 className="mt-0">{project.title}</h3>

								<Nav tabs className="nav-bordered mb-3">
									<NavItem>
										<NavLink href="#" className="active">
											Overview
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="#">Detail</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="#">File</NavLink>
									</NavItem>
								</Nav>

								{/* <div className="badge badge-secondary mb-3">
                  {project.state}
                </div> */}

								<h5>Project Overview:</h5>

								<p className="text-muted mb-2">
									With supporting text below as a natural lead-in to additional
									contenposuere erat a ante. Voluptates, illo, iste itaque
									voluptas corrupti ratione reprehenderit magni similique?
									Tempore, quos delectus asperiores libero voluptas quod
									perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit
									amet.
								</p>

								<p className="text-muted mb-4">
									Voluptates, illo, iste itaque voluptas corrupti ratione
									reprehenderit magni similique? Tempore, quos delectus
									asperiores libero voluptas quod perferendis! Voluptate, quod
									illo rerum? Lorem ipsum dolor sit amet. With supporting text
									below as a natural lead-in to additional contenposuere erat a
									ante.
								</p>

								<Row>
									<Col md={4}>
										<div className="mb-4">
											<h5>Start Date</h5>
											<p>
												{project.startDate}{" "}
												<small className="text-muted">
													{project.startTime}
												</small>
											</p>
										</div>
									</Col>
									<Col md={4}>
										<div className="mb-4">
											<h5>End Date</h5>
											<p>
												{project.endDate}{" "}
												<small className="text-muted">{project.endTime}</small>
											</p>
										</div>
									</Col>
									<Col md={4}>
										<div className="mb-4">
											<h5>Budget</h5>
											<p>{project.totalBudget}</p>
										</div>
									</Col>
								</Row>

								{/* <TeamMembers /> */}
							</CardBody>
						</Card>
						<Comments />
					</Col>

					<Col xl={4} lg={6}>
						<Card className="d-block">
							<CardBody>
								<h4 className="mt-0 mb-3">Route Detail</h4>
								{/* <div className="vertical-steps mt-4 mb-4 pb-5"> */}
								<ul className="vertical-steps">
									<li className="step-item is-done">
										<span>SAMSUNG SDS, KOREA</span>
										<br />
										<span>
											Cargo Ready: <strong>1/1/21</strong>
										</span>
									</li>

									<li className="step-item current">
										<span>BUSAN, KOREA</span>
										<br />
										<span>
											Depatrue: <strong>1/3/21</strong>
										</span>
									</li>

									<li className="step-item">
										<span>LONG BEACH, USA</span>
										<br />
										<span>
											Arrival: <strong>1/24/21</strong>
										</span>
									</li>

									<li className="step-item">
										<span>FULLERTON, USA</span>
										<br />
										<span>
											Delivery: <strong>1/26/21</strong>
										</span>
									</li>
								</ul>
								{/* <div className="vertical-steps-content">
                    
                    <div className="step-item">
                      <span
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title=""
                        data-original-title="20/08/2018 07:24 PM"
                      >
                        Order Placed
                      </span>
                    </div>
                    <div className="step-item current">
                      <span
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title=""
                        data-original-title="21/08/2018 11:32 AM"
                      >
                        Packed
                      </span>
                    </div>
                    <div className="step-item">
                      <span>Shipped</span>
                    </div>
                    <div className="step-item">
                      <span>Delivered</span>
                    </div>
                  </div> */}

								{/* <div className="process-line" style={{ width: "33%" }}></div> */}
								{/* </div> */}
							</CardBody>
						</Card>
						{/* <ProgressChart /> */}
						{/* <Files /> */}
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
