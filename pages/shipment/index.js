import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Col, Row, Collapse, Card, CardBody } from "reactstrap";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";

export default function page() {
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

  const [collapse, setCollapse] = useState(true);
  const toggle = () => setCollapse(!collapse);

  function CaseDetail() {
    return (
      <Row className="justify-content-sm-between mt-2">
        <Col sm={4} className="mb-2 mb-sm-0">
          <p className="font-weight-bold">In transit to final destination</p>
          <p>Delivery Date: in 2 days</p>
          <small>2 Containers</small>
        </Col>
        <Col sm={8}>
          <Row>
            <Col>
              <div
                style={{
                  background: "lightblue",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <i className="uil-home text-center"></i>
              </div>
              <small>Samsung SDS, Seoul</small>
              <br />
              <small>Cargo Ready: 1/1</small>
            </Col>
            <Col>
              <div
                style={{
                  background: "lightblue",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <i className="uil-ship"></i>
              </div>
              {/* <i className="uil-plane-fly"></i> */}
              <small>Busan, Korea</small>
              <br />
              <small>Depatrue: 1/3</small>
            </Col>
            <Col>
              <div
                style={{
                  background: "lightblue",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <i className="uil-anchor"></i>
                {/* <i className="uil-truck uil-flip"></i> */}
              </div>
              <small>Long Beach, U.S.A</small>
              <br />
              <small>Arrival: 1/24</small>
            </Col>
            <Col>
              <div
                style={{
                  background: "lightblue",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <i className="uil-home"></i>
              </div>
              <small>Fullerton WH, U.S.A</small>
              <br />
              <small>Delivery: 1/26</small>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Shipment</title>
      </Head>
      <Layout>
        <PageTitle breadCrumbItems={current} title={paths} />
        <Row>
          <Col>
            <h5 className="m-0 pb-2" onClick={toggle}>
              <i className="uil-angle-down"></i>
              OIM-12345 <span className="text-muted">PO#123</span>
            </h5>
            <Collapse isOpen={collapse}>
              <Link href="/shipment/oim-12345">
                <Card className="mb-0 card-shipment">
                  <CardBody className="pb-1 pt-2">
                    <CaseDetail />
                  </CardBody>
                </Card>
              </Link>
            </Collapse>
          </Col>
        </Row>
      </Layout>
    </div>
  );
}
