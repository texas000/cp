import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import router from 'next/router';
import useSWR from 'swr';
import Error from '../../Component/Error';
import Layout from '../../Component/Layout';
import PageTitle from '../../Component/PageTitle';
import { Row, Col, Card } from 'react-bootstrap';
import moment from 'moment';
import usdFormat from '../../Component/Invoice/defaultFormat';
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
    const { data } = useSWR(`/api/invoice/summary?page=${page}`, fetcher);

    function handlePreviousPagination() {
        if (page > 1) {
            router.push(`/invoice?page=${parseInt(page) - 1}`);
        }
    }
    function handleNextPagination() {
        router.push(`/invoice?page=${parseInt(page) + 1}`);
    }
    return (
        <Layout token={token}>
            <PageTitle
                breadCrumbItems={[{ label: 'Invoice', path: '/invoice', active: true }]}
                title={'Invoice Summary'}
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
                            className="pt-2 px-2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => router.push(`/invoice/${ga.F_InvoiceNo}`)}>
                            <Row>
                                <Col lg={4} sm={12}>
                                    <p>
                                        <b>
                                            <i className="uil uil-bill"></i> {ga.F_InvoiceNo}
                                        </b>
                                    </p>
                                    <p>{ga.F_YourRef}</p>
                                </Col>
                                <Col lg={4} sm={12}>
                                    <p>Invoice Date: {moment(ga.F_InvoiceDate).utc().format('LL')}</p>
                                    <p>Due Date: {moment(ga.F_DueDate).utc().format('LL')}</p>
                                </Col>
                                <Col lg={4} sm={12}>
                                    <p>
                                        {usdFormat(ga.F_InvoiceAmt)} {ga.F_Currency}
                                    </p>
                                    <p>Prepared by {ga.F_U2ID}</p>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </>
            )}
        </Layout>
    );
}
