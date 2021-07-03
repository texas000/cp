import React from "react";
import { Row, Col } from "reactstrap";

const Footer = (props) => {
  const currentYear = new Date().getFullYear();
  return (
    <React.Fragment>
      <footer className="footer" style={props.windowDimensions.width<1030 ? {left: '0px'} : {}}>
        <div className="container-fluid">
          <Row>
            <Col md={6}>{currentYear} © James Worldwide Inc</Col>

            <Col md={6}>
              <div className="text-md-right footer-links d-none d-md-block">
                <a href="/">About</a>
                <a href="/">Support</a>
                <a href="/">Contact Us</a>
              </div>
            </Col>
          </Row>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
