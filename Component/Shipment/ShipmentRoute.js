// @flow
import moment from 'moment';
import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';

const ShipmentRoute = ({ etd, eta, feta, loading, discharge, final, isPastEtd, isPastEta, isPastFeta }) => {
    return (
        <Card>
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Sales Report</Dropdown.Item>
                        <Dropdown.Item>Export Report</Dropdown.Item>
                        <Dropdown.Item>Profit</Dropdown.Item>
                        <Dropdown.Item>Action</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mb-2">Route Detail</h4>

                <SimpleBar style={{ maxHeight: '419px', width: '100%' }}>
                    <div className="timeline-alt pb-0">
                        <div className="timeline-item">
                            <i
                                className={`mdi mdi-ferry timeline-icon ${
                                    isPastEtd || etd === null
                                        ? 'text-secondary bg-secondary-lighten'
                                        : 'text-primary bg-primary-lighten'
                                }`}></i>
                            <div className="timeline-item-info">
                                <a
                                    className={`${
                                        isPastEtd || etd === null ? 'text-secondary' : 'text-primary'
                                    }  fw-bold mb-1 d-block`}>
                                    {loading}
                                </a>
                                <small>{etd && moment(etd).utc().format('L')}</small>
                                <p className="mb-0 pb-2">
                                    <small className="text-muted">
                                        {etd &&
                                            moment([
                                                new Date(etd).getUTCFullYear(),
                                                new Date(etd).getUTCMonth(),
                                                new Date(etd).getUTCDate(),
                                            ])
                                                .utc()
                                                .fromNow()}
                                    </small>
                                </p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <i
                                className={`mdi mdi-truck-fast timeline-icon ${
                                    isPastEta
                                        ? 'text-secondary bg-secondary-lighten'
                                        : 'text-primary bg-primary-lighten'
                                }`}></i>
                            <div className="timeline-item-info">
                                <a className={`${isPastEta ? 'text-secondary' : 'text-primary'} fw-bold mb-1 d-block`}>
                                    {discharge}
                                </a>
                                <small>{eta && moment(eta).utc().format('L')}</small>
                                <p className="mb-0 pb-2">
                                    <small className="text-muted">
                                        {eta &&
                                            moment([
                                                new Date(eta).getUTCFullYear(),
                                                new Date(eta).getUTCMonth(),
                                                new Date(eta).getUTCDate(),
                                            ])
                                                .utc()
                                                .fromNow()}
                                    </small>
                                </p>
                            </div>
                        </div>
                        {feta && (
                            <div className="timeline-item">
                                <i
                                    className={`mdi mdi-check-bold timeline-icon ${
                                        isPastFeta
                                            ? 'text-secondary bg-secondary-lighten'
                                            : 'text-primary bg-primary-lighten'
                                    }`}></i>
                                <div className="timeline-item-info">
                                    <a
                                        className={`${
                                            isPastFeta ? 'text-secondary' : 'text-primary'
                                        } fw-bold mb-1 d-block`}>
                                        {final}
                                    </a>
                                    <small>{moment(feta).utc().format('L')}</small>
                                    <p className="mb-0 pb-2">
                                        <small className="text-muted">
                                            {moment([
                                                new Date(feta).getUTCFullYear(),
                                                new Date(feta).getUTCMonth(),
                                                new Date(feta).getUTCDate(),
                                            ])
                                                .utc()
                                                .fromNow()}
                                        </small>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </SimpleBar>
            </Card.Body>
        </Card>
    );
};

export default ShipmentRoute;
