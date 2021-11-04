import Layout from '../../Component/Layout';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import useSWR from 'swr';
import Error from '../../Component/Error';
import InvoiceFormat from '../../Component/Invoice/Format';
import PageTitle from '../../Component/PageTitle';

export async function getServerSideProps({ req, query }) {
    const cookies = cookie.parse(req ? req.headers.cookie || '' : window.document.cookie);
    try {
        const token = jwt.verify(cookies.jwitracking, process.env.JWT_KEY);
        return {
            props: {
                token: token,
                query: query,
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

export default function index({ token, query }) {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data } = useSWR(`/api/invoice/${query.id}`, fetcher);
    // const { data: files } = useSWR(`/api/shipment/getFiles?ref=${query.id}`, fetcher);
    return (
        <Layout token={token} title={query.id}>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Invoice', path: '/apps/ecommerce/order/details' },
                    { label: 'Invoice Details', path: '/apps/ecommerce/order/details', active: true },
                ]}
                title={query.id}
            />
            {!data ? (
                <></>
            ) : data.error ? (
                <Error status={data.status} title={data.msg} />
            ) : (
                <>
                    <InvoiceFormat
                        detail={data.Detail}
                        invoice={data.Invoice}
                        master={data.Master}
                        house={data.House}
                    />
                </>
            )}
        </Layout>
    );
}
