import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import {
	Row,
	Col,
	Card,
	CardBody,
	Button,
	CardTitle,
	CardSubtitle,
} from "reactstrap";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

export default function page(props) {
	// const { data } = useSWR("/api/photo/getPhoto");
	const router = useRouter();
	var current = [
		{
			label: "Test",
			path: "/",
			active: true,
		},
	];
	if (!firebase.apps.length) {
		firebase.initializeApp(props.FIREBASE_CONFIG);
	}
	function fileUpload(e) {
		const storage = firebase.storage();
		const uploadTask = storage.ref("images").put(e.target.files[0]);
		uploadTask.on(
			"state_changed",
			(snapShot) => {
				//takes a snap shot of the process as it is happening
				console.log(snapShot);
			},
			(err) => {
				//catches the errors
				console.log(err);
			},
			() => {
				// gets the functions from storage refences the image storage in firebase by the children
				// gets the download url then sets the image from firebase as the value for the imgUrl key:
				storage
					.ref("images")
					.getDownloadURL()
					.then((fireBaseUrl) => {
						console.log(fireBaseUrl);
					});
			}
		);
	}
	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>Test</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title="Test" />
				<Row>
					<Col>
						<Card className="mb-0">
							<CardBody>
								<CardTitle tag="h5">Ocean Shipment Quotation</CardTitle>
								<CardSubtitle className="mt-2">
									Get an instant quotation for ocean shipment
								</CardSubtitle>
								<img src="https://jameswi.com/api/forwarding/test/image.png" />
								<a
									href="https://jameswi.com/api/forwarding/test/image.png"
									download
									className="btn btn-primary"
								>
									Click Me
								</a>
								<input type="file" onChange={(e) => fileUpload(e)}></input>
							</CardBody>
						</Card>
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
	const clientCredentials = {
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.FIREBASE_DATABASE,
		projectId: process.env.FIREBASE_PROJECT_ID,
		appId: process.env.FIREBASE_APP_ID,
		storageBucket: "jamesworldwide-52974.appspot.com",
	};
	try {
		const token = jwt.verify(cookies.jwitoken, process.env.API_KEY);
		return {
			props: {
				token,
				FIREBASE_CONFIG: clientCredentials,
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
