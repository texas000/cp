import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import useSWR from "swr";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Card, Table } from "reactstrap";
const fetcher = async (...args) => {
	const res = await fetch(...args);
	return res.json();
};

export default function page(props) {
	const router = useRouter();
	const { data } = useSWR("/api/customer/getList", fetcher);
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

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<title>Customer</title>
			</Head>
			<Layout token={props.token}>
				<PageTitle breadCrumbItems={current} title={paths} />
				<Card>
					<Table size="sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>CITY</th>
								<th>COUNTRY</th>
							</tr>
						</thead>
						<tbody>
							{data &&
								data.map((ga) => (
									<tr key={ga.F_ID}>
										<td>{ga.F_ID}</td>
										<td>{ga.F_FName}</td>
										<td>{ga.F_City}</td>
										<td>{ga.F_Country}</td>
									</tr>
								))}
						</tbody>
					</Table>
				</Card>
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
