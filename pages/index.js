import Layout from '../Component/Layout';
import Statistics from '../Component/Dashboard/Project/Statistics';
import Activity from '../Component/Dashboard/Project/Activity';
import FileUploader from '../Component/Dashboard/Project/FileUploader';
import PageTitle from '../Component/PageTitle';
import OsChart from '../Component/Dashboard/Project/OsChart';
import Tasks from '../Component/Dashboard/Project/Tasks';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import useSWR from 'swr';
import { Col, Row } from 'react-bootstrap';
import { Fragment } from 'react';
import moment from 'moment';
export async function getServerSideProps({ req }) {
    const cookies = cookie.parse(req ? req.headers.cookie || '' : window.document.cookie);
    try {
        const token = jwt.verify(cookies.jwitracking, process.env.JWT_KEY);
        return {
            props: {
                token: token,
            },
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/login',
            },
        };
    }
}

export default function index({ token }) {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data } = useSWR('/api/dashboard/shipment', fetcher);
    const { data: invoice } = useSWR('/api/dashboard/invoice', fetcher);
    return (
        <Layout token={token} title="Dashboard">
            {!data || !invoice ? (
                <></>
            ) : (
                <Fragment>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Dashboard', path: '/', active: true }]}
                        title={'Dashboard'}
                    />
                    <Row>
                        <Col>
                            <Statistics
                                shipment={data && data.length}
                                invoice={invoice && invoice.length}
                                pendingShipment={
                                    data
                                        ? data.map(
                                              (ga) =>
                                                  moment([
                                                      new Date(ga.Ready).getUTCFullYear(),
                                                      new Date(ga.Ready).getUTCMonth(),
                                                      new Date(ga.Ready).getUTCDate(),
                                                  ]).isBefore(new Date()) == false
                                          )
                                        : [false]
                                }
                                pendingInvoice={
                                    invoice
                                        ? invoice.map(
                                              (ga) =>
                                                  moment([
                                                      new Date(ga.F_DueDate).getUTCFullYear(),
                                                      new Date(ga.F_DueDate).getUTCMonth(),
                                                      new Date(ga.F_DueDate).getUTCDate(),
                                                  ]).isBefore(new Date()) == true
                                          )
                                        : [false]
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Tasks shipment={data ? data : []} />
                        </Col>
                        <Col lg={6}>
                            <Activity invoice={invoice ? invoice : []} />
                        </Col>
                    </Row>

                    {/* <OsChart />
                    <FileUploader /> */}
                </Fragment>
            )}
        </Layout>
    );
}
