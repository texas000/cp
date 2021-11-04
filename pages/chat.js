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
import { Fragment, useState } from 'react';
import moment from 'moment';
import ChatUsers from '../Component/Chat/ChatUsers';
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

import { users } from '../Component/Chat/data';
import ChatArea from '../Component/Chat/ChatArea';
import ChatProfile from '../Component/Chat/ChatProfile';
export default function index({ token }) {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const [selectedUser, setSelectedUser] = useState(users[1]);
    const onUserChange = (user) => {
        setSelectedUser(user);
    };
    return (
        <Layout token={token} title="Chat">
            <PageTitle breadCrumbItems={[{ label: 'Apps', path: '/apps/chat', active: true }]} title={'Chat'} />

            <Row>
                <Col xxl={3} xl={{ span: 6, order: 1 }}>
                    <ChatUsers onUserSelect={onUserChange} />
                </Col>

                <Col xxl={6} xl={{ span: 12, order: 2 }}>
                    <ChatArea selectedUser={selectedUser} />
                </Col>

                <Col xxl={{ span: 3, order: 2 }} xl={{ span: 6, order: 1 }}>
                    <ChatProfile selectedUser={selectedUser} />
                </Col>
            </Row>
        </Layout>
    );
}
