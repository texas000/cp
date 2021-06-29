import Head from "next/head";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import Quotes from "../components/Dashboard/Quotes";
import Invoice from "../components/Dashboard/Invoice";
import Shipment from "../components/Dashboard/Shipment";

export default function Index() {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>James Worldwide</title>
      </Head>
      <Layout>
        <PageTitle
          breadCrumbItems={[{ label: "Dashboard", active: true }]}
          title={"Dashboard"}
        />
        <div className="row">
          <div className="col-lg-4">
            <Shipment />
          </div>
          <div className="col-lg-4">
            <Quotes />
          </div>
          <div className="col-lg-4">
            <Invoice />
          </div>
        </div>
      </Layout>
    </div>
  );
}
