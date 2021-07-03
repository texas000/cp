import Head from "next/head";
import { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout(props) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const toggleMenu = () => setIsMenuOpened(!isMenuOpened);
  const [windowDimensions, setWindowDimensions] = useState(false);
  useEffect(() => {
    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height
      };
    }
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="app">
      <div className="wrapper">
        <Sidebar isMenuOpened={isMenuOpened} token={props.token} windowDimensions={windowDimensions} />
        <div className="content-page" style={windowDimensions.width<1030 ? {marginLeft: '70px'} : {}}>
          <div className="content">
            <Topbar toggleMenu={toggleMenu} token={props.token} />
            <Container fluid>{props.children}</Container>
          </div>

          <Footer windowDimensions={windowDimensions}/>
        </div>
      </div>
    </div>
  );
}
