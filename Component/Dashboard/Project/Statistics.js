// @flow
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Statistics = ({ shipment, invoice, pendingShipment, pendingInvoice }) => {
    return (
        <>
            <Row>
                <Col>
                    <Card className="widget-inline">
                        <Card.Body className="p-0">
                            <Row className="g-0">
                                <Col sm={6} xl={3}>
                                    <Card className="shadow-none m-0">
                                        <Card.Body className="text-center">
                                            <i className="mdi mdi-truck-check-outline text-muted font-24"></i>
                                            <h3>
                                                <span>{shipment || 0}</span>
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Active Shipment</p>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col sm={6} xl={3}>
                                    <Card className="card shadow-none m-0 border-start">
                                        <Card.Body className="text-center">
                                            <i className="mdi mdi-truck-fast-outline text-muted font-24"></i>
                                            <h3>
                                                <span>{pendingShipment.filter(Boolean).length}</span>
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Pending Shipment</p>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col sm={6} xl={3}>
                                    <Card className="card shadow-none m-0 border-start">
                                        <Card.Body className="text-center">
                                            <i className="mdi mdi-file-document-multiple-outline text-muted font-24"></i>
                                            <h3>
                                                <span>{invoice || 0}</span>
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Active Invoice</p>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col sm={6} xl={3}>
                                    <Card className="card shadow-none m-0 border-start">
                                        <Card.Body className="text-center">
                                            <i className="mdi mdi-alert text-muted font-24"></i>
                                            <h3>
                                                <span>{pendingInvoice.filter(Boolean).length}</span>
                                                {/* <i className="mdi mdi-arrow-up text-success"></i> */}
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Past Due Invoice</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Statistics;
