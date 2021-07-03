import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Label,
	FormGroup,
	Button,
	Alert,
	Form,
	InputGroup,
} from "reactstrap";
import React, { useState } from "react";
import { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

// import firebase from "../lib/firebase";

export default function Index({ API_KEY, FIREBASE_CONFIG }) {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passType, setPassType] = useState("password");
	if (!firebase.apps.length) {
		firebase.initializeApp(FIREBASE_CONFIG);
	}

	const auth = firebase.auth();

	const signInWithEmail = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(username, password)
			.then(async (credentials) => {
				const { email, displayName, photoURL, uid } = credentials.user;
				const fetchSignIn = await fetch("/api/signin", {
					body: JSON.stringify({
						email,
						displayName,
						photoURL,
						uid,
					}),
					headers: {
						authorization: API_KEY,
					},
					method: "POST",
				});
				if (fetchSignIn.status === 200) {
					const data = await fetchSignIn.json();
					document.cookie = data.token;
				}
				router.push("/dashboard");
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	useEffect(() => {
		// auth.onAuthStateChanged(async (user) => {
		// 	console.log(user);
		// });
	}, []);

	return (
		<React.Fragment>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>Login</title>
			</Head>
			<div className="authentication-bg">
				<div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
					<Container>
						<Row className="justify-content-center">
							<Col lg={5}>
								<Card>
									<div className="card-header pt-4 pb-4 text-center bg-primary">
										<a href="/">
											<span>
												<img src="/assets/images/logo.png" alt="" height="18" />
											</span>
										</a>
									</div>

									<CardBody className="p-4 position-relative">
										{/* preloader */}
										{/* {this.props.loading && (
                  <div className="preloader">
                    <div className="status">
                      <div className="bouncing-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                )} */}

										<div className="text-center w-75 m-auto">
											<h4 className="text-dark-50 text-center mt-0 font-weight-bold">
												Sign In
											</h4>
											<p className="text-muted mb-4">
												Enter your username and password to access admin panel.
											</p>
										</div>

										{/* {this.props.error && (
                  <Alert
                    color="danger"
                    isOpen={this.props.error ? true : false}
                  >
                    <div>{this.props.error}</div>
                  </Alert>
                )} */}

										<Form onSubmit={(e) => signInWithEmail(e)}>
											<div className="mb-3">
												<label htmlFor="emailaddress" className="form-label">
													Email Address
												</label>
												<input
													name="username"
													label="Username"
													placeholder="Enter your username"
													className="form-control"
													type="email"
													id="emailaddress"
													autoComplete="username"
													value={username}
													onChange={(e) => setUsername(e.target.value)}
													required
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="password" className="form-label">
													Password
												</label>
												<a
													href="/pages-recoverpw"
													className="text-muted float-right"
												>
													<small>Forgot your password?</small>
												</a>
												<div className="input-group input-group-merge">
													<input
														className="form-control"
														id="password"
														type={passType}
														placeholder="Enter your password"
														autoComplete="current-password"
														value={password}
														onChange={(e) => setPassword(e.target.value)}
														required
													/>
													<div
														className="input-group-append"
														onClick={() => {
															if (passType === "password") {
																setPassType("text");
															} else {
																setPassType("password");
															}
														}}
													>
														<div
															className={`input-group-text ${
																passType === "text" && "show-password"
															}`}
															data-password={passType === "text"}
														>
															<span className="password-eye"></span>
														</div>
													</div>
												</div>
											</div>

											<FormGroup className="text-center">
												<Button color="success">Submit</Button>
											</FormGroup>

											{/* <p>
                    <strong>Username:</strong> test &nbsp;&nbsp;{" "}
                    <strong>Password:</strong> test
                  </p> */}
										</Form>
									</CardBody>
								</Card>
							</Col>
						</Row>

						<Row className="mt-1">
							<Col className="col-12 text-center">
								<p className="text-muted">
									Don't have an account?{" "}
									<a href="/account/register" className="text-muted ml-1">
										<b>Register</b>
									</a>
								</p>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		</React.Fragment>
	);
}

export async function getServerSideProps() {
	const clientCredentials = {
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.FIREBASE_DATABASE,
		projectId: process.env.FIREBASE_PROJECT_ID,
		appId: process.env.FIREBASE_APP_ID,
		storageBucket: "jamesworldwide-52974.appspot.com",
	};
	return {
		props: {
			API_KEY: process.env.API_KEY,
			FIREBASE_CONFIG: clientCredentials,
		},
	};
}
