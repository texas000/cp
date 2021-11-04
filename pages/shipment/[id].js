import Layout from '../../Component/Layout';
import ShipmentDetails from '../../Component/Shipment/ShipmentDetails';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import useSWR from 'swr';
import Error from '../../Component/Error';
import FileUploader from '../../Component/Dashboard/Project/FileUploader';

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
    const { data } = useSWR(`/api/shipment/${query.id}?q=${query.id.substring(0, 3)}`, fetcher);
    const { data: files } = useSWR(`/api/shipment/getFiles?ref=${query.id}`, fetcher);
    return (
        <Layout token={token} title={query.id}>
            {!data ? (
                <></>
            ) : data.error ? (
                <Error status={data.status} title={data.msg} />
            ) : (
                <>
                    <ShipmentDetails
                        master={data ? data.master : null}
                        house={data ? data.house : null}
                        title={query.id}
                        files={files}
                    />

                    {/* <FileUploader /> */}
                </>
            )}
        </Layout>
    );
}
