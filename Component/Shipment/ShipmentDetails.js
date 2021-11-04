// @flow
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import PageTitle from '../PageTitle';
import moment from 'moment';
import ShipmentRoute from './ShipmentRoute';
import ShipmentComment from './ShipmentComment';
// Item Table
const Items = (props) => {
    const items = props.items || [];
    return (
        <React.Fragment>
            <div className="table-responsive">
                <table className="table mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.total}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

// summary
const ShipmentFile = (props) => {
    return (
        <div>
            {props.shipment.files.length ? (
                props.shipment.files.map((ga, i) => (
                    <Row key={`${i}-file`}>
                        <Col className="col-auto">
                            <div className="avatar-sm">
                                <span className="avatar-title rounded text-uppercase">
                                    <i className="mdi mdi-file"></i>
                                </span>
                            </div>
                        </Col>
                        <Col className="ps-0 text-truncate">
                            <a
                                className="text-muted fw-bold"
                                style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    const data = await fetch(
                                        `/api/file/get?ref=${props.shipment.reference}&file=${encodeURIComponent(
                                            ga.F_FILENAME
                                        )}`
                                    );
                                    const blob = await data.blob();
                                    var file = new Blob([blob], {
                                        type: blob.type,
                                    });
                                    var fileURL = URL.createObjectURL(file);
                                    window.open(fileURL, '_blank');
                                }}>
                                {ga.F_FILENAME}
                            </a>
                            <p className="mb-0 text-uppercase">
                                <strong>{ga.F_LABEL}</strong>
                            </p>
                        </Col>
                        <Col className="text-end">
                            <a href="#" className="btn btn-link btn-lg text-muted shadow-none">
                                <i className="mdi mdi-cloud-download-outline"></i>
                            </a>
                        </Col>
                    </Row>
                ))
            ) : (
                <div className="alert alert-dark text-center fade show mb-0">
                    <small>NO ATTACHEMENT</small>
                </div>
            )}
        </div>
    );
};

// shipping info
const ShippingInfo = (props) => {
    const details = props.details || {};
    return (
        <React.Fragment>
            <h5>{details.provider}</h5>
            <table className="table mb-0 mt-2">
                <thead className="table-light">
                    <tr>
                        <th>Master BL</th>
                        <th>{details.address_1}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Carrier</td>
                        <td>{details.address_2}</td>
                    </tr>
                    <tr>
                        <td>Vessel</td>
                        <td>
                            {details.vessel} {details.voyage}
                        </td>
                    </tr>
                    <tr>
                        <td>Commodity</td>
                        <td>{details.commodity}</td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    );
};

// delivery info
const DeliveryInfo = (props) => {
    const details = props.details || {};
    return (
        <React.Fragment>
            <div className="text-center">
                <i className="mdi mdi-truck-fast h2 text-muted"></i>
                <h5>
                    <b>{details.provider}</b>
                </h5>
                <p className="mb-1">
                    <b>Order ID :</b> {details.order_id}
                </p>
                <p className="mb-0">
                    <b>Payment Mode :</b> {details.payment_mode}
                </p>
            </div>
        </React.Fragment>
    );
};

// order details
const ShipmentDetails = ({ master, title, house, files }) => {
    const order = {
        id: '#BM31',
        reference: master.F_RefNo,
        files: files || [],
        order_status: 'Packed',
        departed: master && master.F_ETD ? moment(new Date(master.F_ETD)).utc().isBefore() : null,
        arrived: master && master.F_ETA ? moment(new Date(master.F_ETA)).utc().isBefore() : null,
        delivered: master && master.F_FETA ? moment(new Date(master.F_FETA)).utc().isBefore() : null,
        items: [
            { id: 1, name: 'The Military Duffle Bag', quantity: 3, price: '$128', total: '$384' },
            { id: 2, name: 'Mountain Basket Ball', quantity: 1, price: '$199', total: '$199' },
            { id: 3, name: 'Wavex Canvas Messenger Bag', quantity: 5, price: '$180', total: '$900' },
            { id: 4, name: 'The Utility Shirt', quantity: 2, price: '$79', total: '$158' },
        ],
        gross_total: '$1641',
        shipping_charge: '$23',
        tax: '$19.22',
        net_total: '$1683.22',
        shipping: {
            provider: house[0].CUSTOMER,
            address_1: master.F_MBLNo || master.F_SMBLNo || master.F_MawbNo,
            address_2: master.CARRIER,
            vessel: master.F_Vessel || master.F_FLTno || master.F_FLTNo,
            voyage: master.F_Voyage,
            commodity: master.F_mCommodity || master.F_Commodity,
        },
        billing: {
            type: 'Credit Card',
            provider: 'Visa ending in 2851',
            valid: '02/2020',
        },
        delivery: {
            provider: 'UPS Delivery',
            order_id: '#BM31',
            payment_mode: 'COD',
        },
    };

    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Shipment', path: '/apps/ecommerce/order/details' },
                    { label: 'Shipment Details', path: '/apps/ecommerce/order/details', active: true },
                ]}
                title={title || 'Shipment Details'}
            />

            <Row>
                <Col>
                    <Row className="justify-content-center">
                        <Col lg={7} md={10} sm={11}>
                            <div className="horizontal-steps mt-4 mb-4 pb-5">
                                <div className="horizontal-steps-content">
                                    <div className="step-item">
                                        <span
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title=""
                                            data-original-title="20/08/2018 07:24 PM">
                                            Order Placed
                                        </span>
                                    </div>
                                    <div
                                        className={`step-item ${
                                            !order.delivered && !order.arrived && order.departed && 'current'
                                        }`}>
                                        <span
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title=""
                                            data-original-title="21/08/2018 11:32 AM">
                                            Departed
                                        </span>
                                    </div>
                                    <div className={`step-item ${!order.delivered && order.arrived && 'current'}`}>
                                        <span>Shipped</span>
                                    </div>
                                    {master.F_FETA && (
                                        <div className={`step-item ${order.delivered && 'current'}`}>
                                            <span>Delivered</span>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="process-line"
                                    style={
                                        master.F_FETA
                                            ? {
                                                  width: order.delivered
                                                      ? '99%'
                                                      : order.arrived
                                                      ? '66%'
                                                      : order.departed
                                                      ? '33%'
                                                      : '20%',
                                              }
                                            : {
                                                  width: order.arrived ? '99%' : order.departed ? '66%' : '33%',
                                              }
                                    }></div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="px-4">
                        <Col lg={8}>
                            <Card>
                                <Card.Body>
                                    <h4 className="header-title mb-3">Shipping Information</h4>
                                    <ShippingInfo details={order.shipping} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <ShipmentRoute
                                etd={master.F_ETD}
                                eta={master.F_ETA}
                                feta={master.F_FETA}
                                loading={master.F_LoadingPort}
                                discharge={master.F_DisCharge || master.F_Discharge}
                                final={master.F_FinalDest}
                                isPastEtd={order.departed}
                                isPastEta={order.arrived}
                                isPastFeta={order.delivered}
                            />
                        </Col>
                    </Row>

                    <Row className="px-4">
                        <Col lg={8}>
                            <ShipmentComment />
                        </Col>
                        <Col lg={4}>
                            <Card>
                                <Card.Body>
                                    <h4 className="header-title mb-3">File</h4>
                                    <ShipmentFile shipment={order} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ShipmentDetails;
