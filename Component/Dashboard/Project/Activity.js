// @flow
import moment from 'moment';
import React from 'react';
import { Card, Dropdown, Table } from 'react-bootstrap';
import router from 'next/router';

const Activity = ({ invoice }) => {
    return (
        <Card style={{ overflowY: 'scroll', maxHeight: '660px', minHeight: '660px' }}>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Weekly Report</Dropdown.Item>
                        <Dropdown.Item>Monthly Report</Dropdown.Item>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mb-3">Pending Invoice</h4>

                <Table hover responsive className="table-centered table-nowrap table-hover mb-0">
                    <tbody>
                        {invoice.map((ga, i) => (
                            <tr
                                key={`${i}-invoice`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    router.push(`/invoice/${ga.F_InvoiceNo}`);
                                }}>
                                <td>
                                    <div className="d-flex align-items-start">
                                        <div>
                                            <h5 className="mt-0 mb-1">
                                                {ga.F_InvoiceNo}
                                                <small className="fw-normal ms-3">
                                                    {moment(ga.F_DueDate).utc().format('MM/DD/YYYY')}
                                                </small>
                                            </h5>
                                            <span className="font-13">
                                                Due{' '}
                                                {moment([
                                                    new Date(ga.F_DueDate).getUTCFullYear(),
                                                    new Date(ga.F_DueDate).getUTCMonth(),
                                                    new Date(ga.F_DueDate).getUTCDate(),
                                                ])
                                                    .utc()
                                                    .fromNow()}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-muted font-13">Prepared by</span> <br />
                                    <p className="mb-0 text-uppercase">{ga.F_U2ID}</p>
                                </td>
                                <td className="table-action" style={{ width: '50px' }}>
                                    <Dropdown className="float-end" align="end">
                                        <Dropdown.Toggle
                                            variant="link"
                                            className="arrow-none card-drop p-0 shadow-none">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Settings</Dropdown.Item>
                                            <Dropdown.Item>Action</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default Activity;
