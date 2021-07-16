import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import useSWR from "swr";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import {
	Card,
	Table,
	Button,
	Row,
	Col,
	FormGroup,
	Label,
	FormText,
	Input,
	InputGroup,
	InputGroupAddon,
} from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { useState } from "react";

const fetcher = async (...args) => {
	const res = await fetch(...args);
	return res.json();
};

export default function page(props) {
	const router = useRouter();
	const { data } = useSWR("/api/customer/getCustomerList", fetcher);
	const [customer, setCustomer] = useState(false);

	if (!firebase.apps.length) {
		firebase.initializeApp(props.FIREBASE_CONFIG);
	}

	var current = [
		{ label: "Customer", path: "/customer", active: false },
		{ label: "Create", path: "/customer", active: true },
	];
	function handleInputChange(input) {
		setCustomer(input[0]);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		let mail = e.target[0].value;
		let pass = e.target[1].value;
		let name = e.target[2].value;
		// let cust = e.target[3].value;
		let file = e.target[5].files;
		if (file.length == 0) {
			alert("PLEASE ADD IMAGE FOR USER");
			return;
		}
		const storage = firebase.storage();
		const uploadTask = storage.ref("users").child(mail).put(file[0]);
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
					.ref("users")
					.child(mail)
					.getDownloadURL()
					.then(async (fireBaseUrl) => {
						var info = {
							email: mail,
							emailVerified: false,
							password: pass,
							displayName: name,
							photoURL: fireBaseUrl,
							disabled: false,
							cust: customer.id,
						};
						const fet = await fetch("/api/customer/createAccount", {
							method: "POST",
							body: JSON.stringify(info),
						});
						if (fet.status === 200) {
							alert(`${info.email} CREATED`);
						} else {
							alert(fet.statusText);
						}
					});
			}
		);
	}
	const storage = firebase.storage();

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>Create Customer</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title="Create Customer" />
				<Card className="py-2 px-2">
					<form onSubmit={handleSubmit}>
						<Row>
							<Col>
								<FormGroup>
									<Label for="exampleEmail2">Email</Label>
									<Input
										type="email"
										name="customer-mail"
										id="exampleEmail2"
										placeholder="Enter your email"
										autoComplete="off"
										autoCorrect="off"
										autoSave="off"
										required
									/>
									<FormText>
										Share email address and password to customer
									</FormText>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label for="examplePassword2">Password</Label>
									<Input
										type="password"
										name="customer-password"
										id="examplePassword2"
										autoComplete="off"
										autoCorrect="off"
										placeholder="password placeholder"
										defaultValue="123456!"
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup>
									<Label for="customerdisplay">Name</Label>
									<Input
										type="text"
										name="customer"
										id="customerdisplay"
										placeholder="Enter customer"
										autoComplete="off"
										autoCorrect="off"
										autoSave="off"
										required
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup>
									<Label for="select2">Customer</Label>
									<Typeahead
										id="select2"
										labelKey="label"
										autoComplete="off"
										autoCorrect="off"
										multiple={false}
										onChange={handleInputChange}
										options={!data ? [] : data}
										placeholder="Choose a customer"
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup className="mb-0">
									<Label for="cfile">Custom file input</Label>
									<InputGroup>
										<div className="custom-file">
											<Input
												type="file"
												name="file"
												id="exampleFile2"
												className="custom-file-input"
												onChange={(e) => {
													e.preventDefault();
													// if (e.target.files[0].type !== "image/jpeg") {
													// 	alert("PLEASE UPLOAD IMAGE FILE");
													// 	return;
													// }
													// const uploadTask = storage
													// 	.ref("users")
													// 	.child("email")
													// 	.put(e.target.files[0]);
													// uploadTask.on(
													// 	"state_changed",
													// 	(snapShot) => {
													// 		//takes a snap shot of the process as it is happening
													// 		console.log(snapShot);
													// 	},
													// 	(err) => {
													// 		//catches the errors
													// 		console.log(err);
													// 	},
													// 	() => {
													// 		// gets the functions from storage refences the image storage in firebase by the children
													// 		// gets the download url then sets the image from firebase as the value for the imgUrl key:
													// 		storage
													// 			.ref("users")
													// 			.child("email")
													// 			.getDownloadURL()
													// 			.then((fireBaseUrl) => {
													// 				setImageUrl(fireBaseUrl);
													// 			});
													// 	}
													// );
												}}
											/>
											<InputGroupAddon addonType="append">
												<label
													className="custom-file-label"
													htmlFor="custom-file"
												>
													Choose file
												</label>
											</InputGroupAddon>
										</div>
									</InputGroup>
								</FormGroup>
							</Col>
						</Row>
						{/* {JSON.stringify(setImageUrl)} */}
						<Button color="primary" type="submit" className="float-right">
							Submit
						</Button>
					</form>
				</Card>
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
		if (token.admin) {
			return {
				props: {
					token,
					FIREBASE_CONFIG: clientCredentials,
				},
			};
		} else {
			return {
				redirect: {
					permanent: false,
					destination: "/dashboard",
				},
			};
		}
	} catch (err) {
		return {
			redirect: {
				permanent: false,
				destination: "/login",
			},
		};
	}
}
