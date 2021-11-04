// @flow
import React, { useState } from 'react';

import { Dropdown } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';

// notifiaction continer styles
const notificationContainerStyle = {
    maxHeight: '230px',
    display: 'none',
};

const notificationShowContainerStyle = {
    maxHeight: '230px',
};

const NotificationDropdown = (props, state) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationContentStyle, setNotificationContentStyles] = useState(notificationContainerStyle);

    /*
     * toggle notification-dropdown
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        setNotificationContentStyles(
            notificationContentStyle === notificationContainerStyle
                ? notificationShowContainerStyle
                : notificationContainerStyle
        );
    };

    /*
     * get redirect url for notification items
     */
    const getRedirectUrl = (item) => {
        return `/notification/${item.id}`;
    };

    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-notification"
                // as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle arrow-none">
                <i className="dripicons-bell noti-icon"></i>
                <span className="noti-icon-badge"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg">
                <div onClick={toggleDropdown}>
                    <div className="dropdown-item noti-title">
                        <h5 className="m-0">
                            <span className="float-end">
                                <a href="/notifications" className="text-dark">
                                    <small>Clear All</small>
                                </a>
                            </span>
                            Notification
                        </h5>
                    </div>
                    <SimpleBar style={notificationContentStyle}>
                        {props.notifications.map((item, i) => {
                            return (
                                <a href={getRedirectUrl(item)} className="dropdown-item notify-item" key={i + '-noti'}>
                                    <div className={`notify-icon bg-${item.bgColor}`}>
                                        <i className={item.icon}></i>
                                    </div>
                                    <p className="notify-details">{item.text}</p>
                                    <p className="text-muted mb-0 user-msg">
                                        <small>{item.subText}</small>
                                    </p>
                                </a>
                            );
                        })}
                    </SimpleBar>

                    <a href="/" className="dropdown-item text-center text-primary notify-item notify-all">
                        View All
                    </a>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default NotificationDropdown;
