// @flow
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
// get the apps
const Apps = [
    {
        name: 'Slack',
        icon: '/assets/images/brands/slack.png',
        redirectTo: '/',
    },
    {
        name: 'GitHub',
        icon: '/assets/images/brands/github.png',
        redirectTo: '/',
    },
    {
        name: 'Dribbble',
        icon: '/assets/images/brands/dribbble.png',
        redirectTo: '/',
    },
    {
        name: 'Bitbucket',
        icon: '/assets/images/brands/bitbucket.png',
        redirectTo: '/',
    },
    {
        name: 'Dropbox',
        icon: '/assets/images/brands/dropbox.png',
        redirectTo: '/',
    },
    {
        name: 'G Suite',
        icon: '/assets/images/brands/g-suite.png',
        redirectTo: '/',
    },
];

const AppsDropdown = (props) => {
    const apps = Apps || [];
    const chunk_size = 3;
    const appsChunks = Array(Math.ceil(apps.length / chunk_size))
        .fill()
        .map((_, index) => index * chunk_size)
        .map((begin) => apps.slice(begin, begin + chunk_size));
    const [dropdownOpen, setDropdownOpen] = useState(false);

    /*
     * toggle apps-dropdown
     */
    const toggleDropdown = ({ dropdownOpen: boolean }) => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-apps"
                // as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle arrow-none">
                <i className="dripicons-view-apps noti-icon"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-end dropdown-menu-animated dropdown-lg p-0">
                <div className="p-2">
                    {appsChunks.map((chunk, idx) => (
                        <div className="row g-0" key={idx}>
                            {chunk.map((item, i) => (
                                <div className="col" key={i}>
                                    <a className="dropdown-icon-item" href={item.redirectTo}>
                                        <img src={item.icon} alt="" />
                                        <span>{item.name}</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default AppsDropdown;
