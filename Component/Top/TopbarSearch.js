// @flow
import React from 'react';

import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import classNames from 'classnames';
import router from 'next/router';

const loadOptions = async (input, callback) => {
    if (input.length > 1) {
        return fetch(`/api/shipment/search?q=${input}`).then((res) => res.json());
    }
};
/*
 * get options
 */
const optionGetter = (option) => {
    switch (option.Type) {
        case 'OIM':
            return (
                <a
                    // onClick={() => router.push('/shipment/' + option.F_RefNo)}
                    className={classNames('dropdown-item', 'notify-item', 'p-0')}>
                    <i className={classNames(option.Icon, 'font-16', 'me-1')}></i>
                    <span>
                        {option.F_RefNo} {option.F_CustRefNo && `(${option.F_CustRefNo})`}
                    </span>
                </a>
            );
        case 'OEX':
            return (
                <a className={classNames('dropdown-item', 'notify-item', 'p-0')}>
                    <i className={classNames(option.Icon, 'font-16', 'me-1')}></i>
                    <span>
                        {option.F_RefNo} {option.F_ExPref && `(${option.F_ExPref})`}
                    </span>
                </a>
            );
        case 'AIM':
            return (
                <a className={classNames('dropdown-item', 'notify-item', 'p-0')}>
                    <i className={classNames(option.Icon, 'font-16', 'me-1')}></i>
                    <span>
                        {option.F_RefNo} {option.F_CustRefNo && `(${option.F_CustRefNo})`}
                    </span>
                </a>
            );
        case 'AEX':
            return (
                <a className={classNames('dropdown-item', 'notify-item', 'p-0')}>
                    <i className={classNames(option.Icon, 'font-16', 'me-1')}></i>
                    <span>
                        {option.F_RefNo} {option.F_ExpRefNo && `(${option.F_ExpRefNo})`}
                    </span>
                </a>
            );
        case 'INV':
            return (
                <a className={classNames('dropdown-item', 'notify-item', 'p-0')}>
                    <i className={classNames(option.Icon, 'font-16', 'me-1')}></i>
                    <span>
                        {option.F_RefNo} {option.F_YourRef && `(${option.F_YourRef})`}
                    </span>
                </a>
            );
        case 'users':
            return (
                <>
                    <a href="/" className="dropdown-item notify-item p-0">
                        <div className="d-flex">
                            <img
                                src={option.userDetails.avatar}
                                alt=""
                                className="d-flex me-2 rounded-circle"
                                height="32"
                            />
                            <div className="w-100">
                                <h5 className="m-0 font-14">
                                    {option.userDetails.firstname} {option.userDetails.lastname}
                                </h5>
                                <span className="font-12 mb-0">{option.userDetails.position}</span>
                            </div>
                        </div>
                    </a>
                </>
            );
        default:
            return;
    }
};

/* custon control */
const Control = ({ children, ...props }) => {
    const { handleClick } = props.selectProps;
    return (
        <components.Control {...props}>
            <span onMouseDown={handleClick} className="mdi mdi-magnify search-icon"></span>
            {children}
        </components.Control>
    );
};

/* custon indicator */
const IndicatorsContainer = (props) => {
    const { handleClick } = props.selectProps;
    return (
        <div style={{}}>
            <components.IndicatorsContainer {...props}>
                <button className="btn btn-primary" onMouseDown={handleClick}>
                    Search
                </button>
            </components.IndicatorsContainer>
        </div>
    );
};

/* custom menu list */
const MenuList = (props) => {
    const { options } = props.selectProps;

    return (
        <components.MenuList {...props}>
            {/* menu header */}
            <div className="dropdown-header noti-title">
                <h5 className="text-overflow mb-2">
                    Found <span className="text-danger">{options.length}</span> results
                </h5>
            </div>
            {props.children}
        </components.MenuList>
    );
};

/* fomates the option label */
const handleFormatOptionLabel = (option) => {
    const formattedOption = optionGetter(option);
    return <div>{formattedOption}</div>;
};

const TopbarSearch = (props) => {
    const handleChange = (e) => {
        if (e.Type == 'INV') {
            router.push('/invoice/' + e.F_RefNo);
        } else {
            router.push('/shipment/' + e.F_RefNo);
        }
        // e.stopPropagation();
    };

    return (
        <>
            <AsyncSelect
                {...props}
                loadOptions={loadOptions}
                components={{ Control, IndicatorsContainer, MenuList }}
                placeholder={'Search...'}
                formatOptionLabel={handleFormatOptionLabel}
                isOptionDisabled={(option) => option.type === 'title'}
                maxMenuHeight="350px"
                // handleClick={onClick}
                onChange={handleChange}
                isSearchable
                name="search-app"
                className="app-search dropdown"
                classNamePrefix="react-select"
            />
        </>
    );
};

export default TopbarSearch;
