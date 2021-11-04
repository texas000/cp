import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import useSWR from 'swr';
import Layout from '../../Component/Layout';

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
    const { data } = useSWR('https://jsonplaceholder.typicode.com/todos/1', fetcher);
    return <Layout token={token}>{JSON.stringify(data)}</Layout>;
}
