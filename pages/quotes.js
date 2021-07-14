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
	const { data } = useSWR("/api/admin/getQuotes", fetcher);
	var current = [{ label: "Quotes", path: "/quotes", active: true }];

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>Quotes</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title="Quotes" />
				<Card className="py-2 px-2">
					<Table size="sm">
						<thead>
							<tr>
								<th>FROM</th>
								<th>TO</th>
								<th>EXPECTED</th>
								<th>CREATED</th>
							</tr>
						</thead>
						<tbody>
							{data &&
								data.map((ga) => (
									<tr key={ga.id}>
										<td>
											{ga.fromCityName} ({ga.fromType})
										</td>
										<td>
											{ga.toCityName} ({ga.toType})
										</td>
										<td>
											{new Date(ga.expectedDate).toISOString().substring(0, 10)}
										</td>
										<td>
											{new Date(ga.createDate).toISOString().substring(0, 10)}
										</td>
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
