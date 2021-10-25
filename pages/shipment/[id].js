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
  const { data: status } = useSWR("/api/shipment/getStatus?id=" + props.refNo);
  const { data: files } = useSWR("/api/shipment/getFiles?id=" + props.refNo);

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
                  <h3 className="mt-0 font-bold">
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
                      {/* <h5 className="mb-2">Project Overview:</h5> */}
                      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div>
                          <dl>
                            <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3">
                              <dt className="text-sm font-medium text-gray-500">
                                Customer
                              </dt>
                              <dd className="font-bold sm:col-span-2">
                                {data.house.length && data.house[0].CUSTOMER}
                              </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Master Bill of Lading
                              </dt>
                              <dd className="font-bold sm:col-span-2">
                                {data.master.F_MBLNo ||
                                  data.master.F_SMBLNo ||
                                  data.master.F_MawbNo}
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Carrier
                              </dt>
                              <dd className="font-bold sm:mt-0 sm:col-span-2">
                                {data.master.CARRIER}
                              </dd>
                            </div>
                            {/* <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
															<dt className="text-sm font-medium text-gray-500">
																Weight
															</dt>
															<dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
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
															</dd>
														</div> */}
                            <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Vessel
                              </dt>
                              <dd className="font-bold sm:mt-0 sm:col-span-2">
                                {data.master.F_Vessel ||
                                  data.master.F_FLTno ||
                                  data.master.F_FLTNo}{" "}
                                {data.master.F_Voyage}
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Commodity
                              </dt>
                              <dd className="font-bold sm:mt-0 sm:col-span-2">
                                {data.master.F_mCommodity}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                      {/* <Row>
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
											</Row> */}
                    </React.Fragment>
                  )}
                  {selectedNav == 2 && (
                    <React.Fragment>
                      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div>
                          <dl>
                            <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                House Bill of Lading
                              </dt>
                              <dd className="font-bold sm:mt-0 sm:col-span-2 mb-0">
                                <ul
                                  role="list"
                                  className={`${
                                    data.house.length > 1
                                      ? "border border-gray-200 rounded-md divide-y divide-gray-200 mb-0"
                                      : "rounded-md mb-0"
                                  }`}
                                >
                                  {data.house.map((ga, i) => (
                                    <li className="px-2" key={i + "HBL"}>
                                      {ga.F_HBLNo || ga.F_HawbNo || ga.F_HAWBNo}
                                    </li>
                                  ))}
                                </ul>
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Reference Number
                              </dt>
                              <dd className="font-bold sm:mt-0 sm:col-span-2 mb-0">
                                <ul
                                  role="list"
                                  className={`${
                                    data.house.length > 1
                                      ? "border border-gray-200 rounded-md divide-y divide-gray-200 mb-0"
                                      : "rounded-md mb-0"
                                  }`}
                                >
                                  {data.house.map((ga, i) => (
                                    <li className="px-2" key={i + "REF"}>
                                      {ga.F_ExpRefNo ||
                                        ga.F_CustRefNo ||
                                        ga.F_ExPref ||
                                        "NOT FOUND"}
                                    </li>
                                  ))}
                                </ul>
                              </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Packages
                              </dt>
                              <dd className="font-bold sm:mt-0 sm:col-span-2 mb-0">
                                <ul
                                  role="list"
                                  className={`${
                                    data.house.length > 1
                                      ? "border border-gray-200 rounded-md divide-y divide-gray-200 mb-0"
                                      : "rounded-md mb-0"
                                  }`}
                                >
                                  {data.house.map((ga, i) => (
                                    <li className="px-2" key={i + "PKG"}>
                                      {ga.F_PKGS || ga.F_Pkgs}{" "}
                                      {ga.F_PUnit || ga.F_Punit}
                                    </li>
                                  ))}
                                </ul>
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Containers
                              </dt>
                              <dd className="font-bold sm:mt-0 sm:col-span-2 mb-0">
                                <ul
                                  role="list"
                                  className="border border-gray-200 rounded-md divide-y divide-gray-200 mb-0"
                                >
                                  {data.container.map((na) => (
                                    <li
                                      className="pr-2 flex items-center justify-between text-sm"
                                      key={na.F_ContainerNo}
                                    >
                                      <div className="w-0 flex-1 flex items-center">
                                        <span className="ml-2 flex-1 w-0 truncate">
                                          {na.F_ContainerNo} - {na.F_ConType}
                                        </span>
                                      </div>
                                      <div className="ml-4 flex-shrink-0">
                                        <span className="font-medium text-indigo-600">
                                          {na.F_SealNo}
                                        </span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                  {selectedNav == 3 && (
                    <React.Fragment>
                      <Card>
                        <CardBody>
                          {/* <h5 className="mb-3">Detail</h5> */}
                          {files.length ? (
                            files.map((ga) => (
                              <Card
                                className="mb-1 shadow-none border uppercase cursor-pointer hover:bg-gray-100"
                                key={ga.F_ID}
                              >
                                <div className="p-2">
                                  <Row
                                    className="align-items-center"
                                    onClick={() => {
                                      window.location.assign(
                                        `/api/file/get?ref=${
                                          ga.F_REF
                                        }&file=${encodeURIComponent(
                                          ga.F_FILENAME
                                        )}`
                                      );
                                    }}
                                  >
                                    {/* <div className="col-auto">
                                      <div className="avatar-sm">
                                        <span className="avatar-title rounded">
                                          {ga.F_LABEL}
                                        </span>
                                      </div>
                                    </div> */}
                                    <div className="col">
                                      <span className="font-weight-bold">
                                        {ga.F_FILENAME}
                                      </span>
                                      <p className="mb-0">
                                        {moment(ga.F_UPLOADEDAT).format("ll")}
                                      </p>
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
                            ))
                          ) : (
                            <div className="shadow-md rounded-lg p-3 border uppercase text-center">
                              <span>File Not Found</span>
                            </div>
                          )}
                        </CardBody>
                      </Card>
                    </React.Fragment>
                  )}
                </CardBody>
              </Card>
              <Comments />
            </Col>

            <Col xl={4} lg={6}>
              <Card className="mb-3">
                <CardBody>
                  <h4 className="header-title mb-2">Status</h4>
                  <div className="timeline-alt pb-0">
                    <div className="timeline-item">
                      <i
                        className={`mdi mdi-check-bold timeline-icon bg-info-lighten text-info`}
                      ></i>
                      <div className="timeline-item-info">
                        <div
                          className={`${"text-info"} font-weight-bold mb-1 d-block`}
                        >
                          {status
                            ? status.STATUS
                            : moment(data.master.F_ETA)
                                .utc()
                                .isSameOrAfter(moment())
                            ? "IN TRANSIT"
                            : "DELIVERED"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

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
                                moment(data.master.F_ETD)
                                  .add("days", 1)
                                  .utc()
                                  .fromNow()}
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
                              {moment(data.master.F_ETA)
                                .add("days", 1)
                                .fromNow()}
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
                                {data.house.length
                                  ? moment(data.house[0].F_FETA)
                                      .add("days", 1)
                                      .fromNow()
                                  : moment(data.master.F_FETA)
                                      .add("days", 1)
                                      .fromNow()}
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
              {/* <div className="d-print-none mt-4">
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
              </div> */}
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
