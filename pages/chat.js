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

export default function page(props) {
	const { data } = useSWR("/api/chat/getMessage", { refreshInterval: 1000 });
	const router = useRouter();
	var current = [
		{
			label: "Chat",
			active: true,
		},
	];
	const [msg, setMsg] = useState("");

	useEffect(() => {}, []);

	const sendMessage = async () => {
		if (msg) {
			const message = {
				uid: props.token.uid,
				msg: msg,
			};
			const resp = await fetch("/api/chat/sendMessage", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(message),
			});
			console.log(resp.status);
		}
	};
	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>James Worldwide</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title="Chat" />
				<Row>
					<Col xl={3} lg={3} className="order-lg-1 order-xl-1">
						<ChatUsers />
					</Col>
					<Col xl={9} lg={9} className="order-lg-1 order-xl-1">
						<ChatArea
							setMsg={setMsg}
							msg={msg}
							sendMessage={sendMessage}
							conversation={data}
						/>
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
