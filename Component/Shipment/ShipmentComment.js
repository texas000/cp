// @flow
import moment from 'moment';
import React from 'react';
import { Card } from 'react-bootstrap';

const ShipmentComment = ({}) => {
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mb-3">Comments</h4>
                <textarea
                    className="form-control form-control-light mb-2"
                    placeholder="Write comment"
                    rows="3"></textarea>
                <div className="d-flex justify-content-end">
                    <div className="btn-group mb-2">
                        <button type="button" className="btn btn-link btn-sm text-muted font-18">
                            <i className="dripicons-paperclip"></i>
                        </button>
                    </div>
                    <div className="btn-group mb-2 ml-2">
                        <button type="button" className="btn btn-primary btn-sm">
                            Sumbit
                        </button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ShipmentComment;
