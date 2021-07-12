import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import useSWR from "swr";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Card, Table, Button } from "reactstrap";
const fetcher = async (...args) => {
	const res = await fetch(...args);
	return res.json();
};

export default function page(props) {
	const router = useRouter();
	const { data } = useSWR("/api/customer/getList", fetcher);
	var current = [{ label: "Customer", path: "/customer", active: true }];

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>Customer</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title="Customers" />
				<Card className="py-2 px-2">
					<Table size="sm">
						<thead>
							<tr>
								<th>CUSTOMER</th>
								<th>NAME</th>
								<th>EMAIL</th>
								<th>PHOTO</th>
								<th>USER ID</th>
							</tr>
						</thead>
						<tbody>
							{data &&
								data.map((ga) => (
									<tr key={ga.uid}>
										<td>{ga.companyName}</td>
										<td>{ga.displayName}</td>
										<td>{ga.email}</td>
										<td>
											<img
												src={ga.photoURL}
												className="rounded-circle img-thumbnail"
												style={{ height: "50px" }}
											/>
										</td>
										<td>{ga.uid}</td>
									</tr>
								))}
						</tbody>
					</Table>
				</Card>

				<Button>Create User</Button>
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
		if (token.admin) {
			return {
				props: {
					token,
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
