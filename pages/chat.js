import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { Col, Row } from "reactstrap";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import ChatUsers from "../components/Chat/ChatUsers";
import ChatArea from "../components/Chat/ChatArea";
import { useEffect, useState } from "react";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import useSWR from "swr";

// WHEN CUSTOMER CHAT TO CUSTOMER SUPPORT, CUSTOMER SUPPORT WILL ANSWER
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
	const [selectedUser, setSelectedUser] = useState(
		"p7ixY3zCjOQ0Kq67ABHqySvhQVh2"
	);
	const { data } = useSWR(
		selectedUser ? `/api/chat/getMessage?user=${selectedUser}` : null,
		{
			refreshInterval: 1000,
		}
	);
	const router = useRouter();
	var current = [
		{
			label: "Chat",
			active: true,
		},
	];
	const [msg, setMsg] = useState("");

	// useEffect(() => {
	// 	console.log(selectedUser);
	// }, [selectedUser]);

	const sendMessage = async () => {
		if (!selectedUser) {
			alert("PLEASE SELECT USER");
			return;
		}
		if (msg && selectedUser) {
			const message = {
				uid: props.token.uid,
				msg: msg,
			};
			const resp = await fetch(
				`/api/chat/sendMessage?recipient=${selectedUser}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(message),
				}
			);
			if (resp.status == 200) {
				const data = await resp.json();
				console.log(data);
			}
		}
	};

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>Chat</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title="Chat" />
				<Row>
					<Col xl={3} lg={3} className="order-lg-1 order-xl-1">
						<ChatUsers
							selectedUser={selectedUser}
							setSelectedUser={setSelectedUser}
						/>
					</Col>
					<Col xl={9} lg={9} className="order-lg-1 order-xl-1 h-100">
						{selectedUser && !data ? (
							<Loader />
						) : (
							<ChatArea
								selectedUser={selectedUser}
								setMsg={setMsg}
								msg={msg}
								sendMessage={sendMessage}
								conversation={data}
								token={props.token}
							/>
						)}
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
