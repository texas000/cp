import Head from "next/head";
import { useState } from "react";
import { Container } from "reactstrap";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout(props) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const toggleMenu = () => setIsMenuOpened(!isMenuOpened);
  return (
    <div className="app">
      <div className="wrapper">
        <Sidebar isMenuOpened={isMenuOpened} />
        <div className="content-page">
          <div className="content">
            <Topbar toggleMenu={toggleMenu} />
            <Container fluid>{props.children}</Container>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
