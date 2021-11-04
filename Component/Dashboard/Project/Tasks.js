// @flow
import moment from 'moment';
import React, { useState } from 'react';
import { Card, Dropdown, Table } from 'react-bootstrap';
import router from 'next/router';
const Tasks = ({ shipment }) => {
    const [loading, setLoading] = useState(false);
    router.events.on('routeChangeStart', () => {
        setLoading(true);
    });
    return (
        <Card style={{ overflowY: 'scroll', maxHeight: '660px' }}>
            {loading ? (
                <></>
            ) : (
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

                    <h4 className="header-title mb-3">Shipment</h4>

                    {/* <p>
                    <b>107</b> Tasks completed out of 195
                </p> */}

                    <Table responsive className="table table-centered table-nowrap table-hover mb-0">
                        <tbody>
                            {shipment.map((ga, i) => (
                                <tr
                                    key={`${i}-shipment`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        router.push('/shipment/' + ga.Ref);
                                    }}>
                                    <td>
                                        <h5 className="font-14 my-1">
                                            <a className="text-body">{ga.Ref}</a>
                                        </h5>
                                        <span className="text-muted font-13">
                                            {ga.Ready ? moment(ga.Ready).utc().format('MM/DD/YYYY') : ''}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-muted font-13">Status</span> <br />
                                        {moment([
                                            new Date(ga.Ready).getUTCFullYear(),
                                            new Date(ga.Ready).getUTCMonth(),
                                            new Date(ga.Ready).getUTCDate(),
                                        ]).isBefore(new Date()) ? (
                                            <span className="badge badge-success-lighten">Delivered</span>
                                        ) : (
                                            <span className="badge badge-warning-lighten">In-progress</span>
                                        )}
                                        {/* badge badge-danger-lighten */}
                                    </td>
                                    <td>
                                        <span className="text-muted font-13">Reference Number</span>
                                        <h5 className="font-14 mt-1 fw-normal">{ga.CustRef}</h5>
                                    </td>
                                    <td>
                                        <span className="text-muted font-13">Delivery</span>
                                        <h5 className="font-14 mt-1 fw-normal">
                                            {ga.Ready
                                                ? moment([
                                                      new Date(ga.Ready).getUTCFullYear(),
                                                      new Date(ga.Ready).getUTCMonth(),
                                                      new Date(ga.Ready).getUTCDate(),
                                                  ])
                                                      .utc()
                                                      .fromNow()
                                                : ''}
                                        </h5>
                                    </td>
                                    <td className="table-action" style={{ width: '90px' }}>
                                        <a className="action-icon">
                                            {' '}
                                            <i className="mdi mdi-pencil"></i>
                                        </a>
                                        <a className="action-icon">
                                            {' '}
                                            <i className="mdi mdi-delete"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            )}
        </Card>
    );
};

export default Tasks;
