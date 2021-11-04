// @flow
import moment from 'moment';
import React from 'react';
import { Row, Col, Card, CardBody, Dropdown, Table } from 'react-bootstrap';
import usdFormat from './defaultFormat';

const InvoiceFormat = ({ detail, invoice, master, house }) => {
    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body className="p-4">
                        <div className="clearfix">
                            <div className="float-start mb-3">
                                <img src="/assets/images/logo-dark.png" alt="logo" height="30" />
                            </div>
                            <div className="float-end">
                                <h4 className="m-0">{invoice.F_InvoiceNo}</h4>
                            </div>
                        </div>

                        <Row>
                            <Col sm={6}>
                                <div className="float-start mt-3">
                                    <p>
                                        <strong>Reference: </strong>
                                        {master?.F_RefNo}
                                    </p>
                                    <p className="text-muted">
                                        <strong>Customer Reference: </strong> {invoice.F_YourRef}
                                    </p>
                                    <p className="text-muted">
                                        <strong>Master BL: </strong>
                                        {master?.F_MBLNo || master?.F_MawbNo || master?.F_SMBLNo}
                                    </p>
                                    <p className="text-muted font-13 my-1">
                                        HOUSE BL: {house[0]?.F_HBLNo || house[0]?.F_HawbNo || house[0]?.F_HAWBNo}
                                    </p>
                                    <p className="text-muted font-13 my-1">
                                        VEESEL NO: {master.F_Vessel || master.F_FLTno || master.F_FLTNo}{' '}
                                        {master.F_Voyage}
                                    </p>
                                    <p className="text-muted font-13 my-1">
                                        POL:{' '}
                                        {`${master?.F_LoadingPort} / ${moment(master?.F_ETD)
                                            .utc()
                                            .format('MM-DD-YYYY')}`}
                                    </p>
                                    <p className="text-muted font-13 my-1">
                                        POD:{' '}
                                        {`${master?.F_DisCharge || master?.F_Discharge} / ${moment(master?.F_ETA)
                                            .utc()
                                            .format('MM-DD-YYYY')}`}
                                    </p>
                                    {master.F_FinalDest && (
                                        <p className="text-muted font-13 my-1">
                                            DEST:{' '}
                                            {`${master.F_FinalDest} / ${moment(master.F_FETA)
                                                .utc()
                                                .format('MM-DD-YYYY')}`}
                                        </p>
                                    )}
                                </div>
                            </Col>

                            <Col sm={6}>
                                <div className="mt-3 float-end">
                                    <p className="font-13">
                                        <strong>Post Date: </strong> &nbsp;&nbsp;&nbsp;
                                        {moment(invoice.F_PostDate).utc().format('l')}
                                    </p>
                                    <p className="font-13">
                                        <strong>Invoice Date: </strong> &nbsp;&nbsp;&nbsp;
                                        {moment(invoice.F_InvoiceDate).utc().format('l')}
                                    </p>
                                    <p className="font-13">
                                        <strong>Due Date: </strong> &nbsp;&nbsp;&nbsp;
                                        {moment(invoice.F_DueDate).utc().format('l')}
                                    </p>
                                    {/* <p className="font-13">
													<strong>Order Status: </strong>{" "}
													<span className="badge badge-success float-right">
														In Progress
													</span>
												</p> */}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col sm={4}>
                                <h5>Billing Address</h5>
                                <h6>{invoice.BILL}</h6>
                                <address>
                                    {invoice.B_Addr}
                                    <br />
                                    {invoice.B_City}
                                    <br />
                                    {invoice.B_State} {invoice.B_ZipCode} {invoice.B_Country}
                                </address>
                            </Col>
                            <Col sm={4}>
                                <h5>Shipping Address</h5>
                                <h6>{invoice.SHIP}</h6>
                                <address>
                                    {invoice.S_Addr}
                                    <br />
                                    {invoice.S_City}
                                    <br />
                                    {invoice.S_State} {invoice.S_ZipCode} {invoice.S_Country}
                                </address>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <div className="table-responsive">
                                    <table className="table mt-4">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Unit Cost</th>
                                                <th className="text-right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {detail &&
                                                detail.map((item, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td>
                                                                <b>{item.F_Description}</b>
                                                            </td>
                                                            <td>{item.F_Qty}</td>
                                                            <td>{usdFormat(item.F_Rate)}</td>
                                                            <td className="text-right">{usdFormat(item.F_Amount)}</td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <div className="clearfix pt-3">
                                    <h6 className="text-muted">Notes:</h6>
                                    <small>
                                        All accounts are to be paid within 7 days from receipt of invoice. To be paid by
                                        cheque or credit card or direct payment online. If account is not paid within 7
                                        days the credits details supplied as confirmation of work undertaken will be
                                        charged the agreed quoted fee noted above.
                                        <br />
                                        {/* {invoice.Memo && invoice.Memo.F_C1}
													{invoice.Memo && invoice.Main.F_U1ID} */}
                                    </small>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="float-end mt-3 mt-sm-0">
                                    <h3>{usdFormat(invoice.F_InvoiceAmt)} USD</h3>
                                </div>
                                <div className="clearfix"></div>
                            </Col>
                        </Row>
                        <div className="d-print-none mt-4">
                            <div className="float-end">
                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        window.print();
                                    }}>
                                    <i className="mdi mdi-printer"></i> Print
                                </button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default InvoiceFormat;
