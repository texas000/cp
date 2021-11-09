import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import router from 'next/router';
import useSWR from 'swr';
import Error from '../../Component/Error';
import Layout from '../../Component/Layout';
import PageTitle from '../../Component/PageTitle';
import { Row, Col, Card } from 'react-bootstrap';
import moment from 'moment';
export async function getServerSideProps({ req, query }) {
    const cookies = cookie.parse(req ? req.headers.cookie || '' : window.document.cookie);
    try {
        const token = jwt.verify(cookies.jwitracking, process.env.JWT_KEY);
        return {
            props: {
                token: token,
                page: query.page || 1,
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

export default function index({ token, page }) {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data } = useSWR(`/api/shipment/summary?page=${page}`, fetcher);

    function handlePreviousPagination() {
        if (page > 1) {
            router.push(`/shipment?page=${parseInt(page) - 1}`);
        }
    }
    function handleNextPagination() {
        router.push(`/shipment?page=${parseInt(page) + 1}`);
    }
    return (
        <Layout token={token}>
            <PageTitle
                breadCrumbItems={[{ label: 'Shipment', path: '/shipment', active: true }]}
                title={'Shipment Summary'}
            />
            {!data ? (
                <></>
            ) : data.error ? (
                <Error status={data.status} title={data.msg} />
            ) : (
                <>
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-end">
                            <li
                                className={`page-item`}
                                onClick={handlePreviousPagination}
                                style={parseInt(page) == 1 ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}>
                                <a className="page-link">Previous</a>
                            </li>
                            {parseInt(page) !== 1 && (
                                <li
                                    className={`page-item`}
                                    onClick={handlePreviousPagination}
                                    style={{ cursor: 'pointer' }}>
                                    <a className="page-link">{parseInt(page) - 1}</a>
                                </li>
                            )}
                            <li className={`page-item active`} style={{ cursor: 'pointer' }}>
                                <a className="page-link">{parseInt(page)}</a>
                            </li>
                            <li className={`page-item`} onClick={handleNextPagination} style={{ cursor: 'pointer' }}>
                                <a className="page-link">{parseInt(page) + 1}</a>
                            </li>
                            <li className={`page-item`} onClick={handleNextPagination} style={{ cursor: 'pointer' }}>
                                <a className="page-link">Next</a>
                            </li>
                        </ul>
                    </nav>
                    {data.map((ga) => (
                        <Card
                            key={ga.NUM}
                            className="p-2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => router.push(`/shipment/${ga.F_RefNo}`)}>
                            <Row>
                                <Col lg={3} sm={12}>
                                    <p>
                                        <b>
                                            {ga.Type == 'OIM' || ga.Type == 'OEX' ? (
                                                <i className="uil uil-ship"></i>
                                            ) : ga.Type == 'AIM' || ga.Type == 'AEX' ? (
                                                <i className="uil uil-plane-arrival"></i>
                                            ) : (
                                                ''
                                            )}{' '}
                                            {ga.F_RefNo}
                                        </b>
                                    </p>
                                    <p>{ga.F_CUST}</p>

                                    <small>
                                        Delivery date:{' '}
                                        {ga.F_FETA
                                            ? moment(ga.F_FETA).utc().format('LL')
                                            : moment(ga.F_ETA).utc().format('LL')}
                                    </small>
                                </Col>
                                <Col lg={6} sm={12}>
                                    <div className="horizontal-steps mb-5">
                                        <div className="horizontal-steps-content">
                                            <div className={`step-item text-center`}>
                                                <span
                                                    data-toggle="tooltip"
                                                    data-placement="bottom"
                                                    title=""
                                                    data-original-title="20/08/2018 07:24 PM">
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fillRule="evenodd"
                                                        clipRule="evenodd">
                                                        <path
                                                            fill="#6c757d"
                                                            d="M24 24h-24v-18h6v6l6-4v4.008l6-4.008v4.017l6-4.017v16zm-20-16h-2v14h20v-10l-6 4v-4l-6 4v-4l-6 4v-8zm11 12h-2v-3h2v3zm-4 0h-2v-3h2v3zm-4 0h-2v-3h2v3zm12 0h-2v-3h2v3zm-16-15h-1c.198-2.182 1.785-4 3.5-4 .246 0 .478.059.683.164.316-.687 1.011-1.164 1.817-1.164s1.501.477 1.817 1.164c.205-.105.437-.164.683-.164.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5c-.246 0-.478-.059-.683-.164-.316.687-1.011 1.164-1.817 1.164-2.345 0-3.722-2.951-5 0z"
                                                        />
                                                    </svg>
                                                    <br />
                                                    <small className="d-inline-block" style={{ maxWidth: '100px' }}>
                                                        <b>{ga.F_LOADING}</b>
                                                    </small>
                                                    <br />
                                                    <small>{moment(ga.F_ETD).utc().format('LL')}</small>
                                                </span>
                                            </div>
                                            <div
                                                className={`step-item text-center ${
                                                    ga.Type != 'OIM' &&
                                                    moment(new Date(ga.F_ETA)).utc().isBefore() &&
                                                    'current'
                                                }`}>
                                                <span
                                                    data-toggle="tooltip"
                                                    data-placement="bottom"
                                                    title=""
                                                    data-original-title="21/08/2018 11:32 AM">
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fillRule="evenodd"
                                                        clipRule="evenodd">
                                                        <path
                                                            fill="#6c757d"
                                                            d="M24 24h-11v-6h4v-4h7v10zm-12-22h9l3 3v2h-3v2h3v3h-7v-3h3v-2h-8v17h-6v-17h-1v2h-5v-7h6v-2h6v2zm5 18h-2v2h2v-2zm5 0h-3v2h3v-2zm-12 .052l-2 .952v.996h2v-1.948zm-2-1.821v1.773l2-.952v-1.774l-2 .953zm14-2.231h-3v2h3v-2zm-14-.628v1.859l2-.953v-1.858l-2 .952zm0-2.785v1.785l2-.952v-1.785l-2 .952zm0-2.768v1.768l2-.952v-1.768l-2 .952zm2-2.819h-2v1.819l2-.952v-.867zm10.017-3h-18.017v3h1v-2h18l-.983-1zm-10.017-3h-2v1h2v-1z"
                                                        />
                                                    </svg>
                                                    <br />
                                                    <small className="text-truncate">
                                                        <b>{ga.F_DISCHARGE}</b>
                                                    </small>
                                                    <br />
                                                    <small>{moment(ga.F_ETA).utc().format('LL')}</small>
                                                </span>
                                            </div>
                                            {ga.Type === 'OIM' && (
                                                <div
                                                    className={`step-item text-center ${
                                                        moment(new Date(ga.F_FETA)).utc().isBefore()
                                                            ? 'current'
                                                            : 'active'
                                                    }`}>
                                                    <span>
                                                        <svg
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fillRule="evenodd"
                                                            clipRule="evenodd">
                                                            <path
                                                                fill="#6c757d"
                                                                d="M5 23h-2v-10l8.991-8.005c1.124.998 2.25 1.997 3.378 2.996l2.255 1.997c1.127.999 2.252 2.013 3.376 3.012v10h-2v-9.118l-7.009-6.215-6.991 6.22v9.113zm2-2h10v2h-10v-2zm0-3h10v2h-10v-2zm10-3v2h-10v-2h10zm-5-14l12 10.632-1.328 1.493-10.672-9.481-10.672 9.481-1.328-1.493 12-10.632z"
                                                            />
                                                        </svg>
                                                        <br />
                                                        <small>
                                                            <small>
                                                                <b>{ga.F_FINAL}</b>
                                                            </small>
                                                        </small>
                                                        <br />
                                                        <small>{moment(ga.F_FETA).utc().format('LL')}</small>
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div
                                            className="process-line"
                                            style={
                                                ga.Type === 'OIM'
                                                    ? moment(ga.F_FETA).utc().isBefore(moment())
                                                        ? { width: '100%' }
                                                        : moment(ga.F_ETA).utc().isBefore(moment())
                                                        ? { width: '66%' }
                                                        : moment(ga.F_ETD).utc().isBefore(moment())
                                                        ? { width: '33%' }
                                                        : { width: '10%' }
                                                    : moment(ga.F_ETA).utc().isBefore(moment())
                                                    ? { width: '100%' }
                                                    : { width: '66%' }
                                            }></div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </>
            )}
        </Layout>
    );
}
