import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Layout from "../../../components/Layout";
import PageTitle from "../../../components/PageTitle";

export default function page() {
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
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>James Worldwide</title>
      </Head>
      <Layout>
        <PageTitle breadCrumbItems={current} title={router.pathname} />
      </Layout>
    </div>
  );
}
