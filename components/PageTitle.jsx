// @flow
import React from "react";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Link from "next/link";

/**
 * PageTitle
 */
const PageTitle = (props) => {
  return (
    <Row>
      <Col>
        <div className="page-title-box">
          <div className="page-title-right">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </BreadcrumbItem>
              {props.breadCrumbItems.map((item, index) => {
                return item.active ? (
                  <BreadcrumbItem active key={index}>
                    {item.label}
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem key={index}>
                    <Link href={item.path}>{item.label}</Link>
                  </BreadcrumbItem>
                );
              })}
            </Breadcrumb>
          </div>
          <h4 className="page-title font-bold uppercase">{props.title}</h4>
        </div>
      </Col>
    </Row>
  );
};

export default PageTitle;
