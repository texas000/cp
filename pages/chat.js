import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { Col, Row } from "reactstrap";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import ChatUsers from "../components/Chat/ChatUsers";
import ChatArea from "../components/Chat/ChatArea";
import { useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function page(props) {
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
	const [msg, setMsg] = useState("");
	const [temp, setTemp] = useState("");
	const [conversation, setConversation] = useState([]);
	useEffect(() => {
		const socket = SocketIOClient.connect(props.base, {
			path: "/api/socketio",
		});
		socket.on("connect", () => {
			console.log("SOCKET CONNECTED!", socket.id);
			setTemp(socket.id);
		});
		socket.on("message", (message) => {
			setConversation((prev) => [...prev, message]);
			console.log({ ...message, id: temp });
		});

		if (socket) return () => socket.disconnect();
	}, []);

	const sendMessage = async () => {
		if (msg) {
			const message = {
				user: props.token.displayName,
				photo: props.token.photoURL,
				msg: msg,
			};
			const resp = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(message),
			});
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
				<PageTitle breadCrumbItems={current} title={paths} />
				<Row>
					<Col xl={3} lg={3} className="order-lg-1 order-xl-1">
						<ChatUsers />
					</Col>
					<Col xl={9} lg={9} className="order-lg-1 order-xl-1">
						<ChatArea
							setMsg={setMsg}
							msg={msg}
							sendMessage={sendMessage}
							conversation={conversation}
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
	const base = process.env.BASE_URL || "http://localhost:8080";

	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		return {
			props: {
				token,
				base,
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
