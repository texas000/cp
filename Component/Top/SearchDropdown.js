// @flow
import React, { useState } from 'react';

import { Dropdown } from 'react-bootstrap';
import TopbarSearch from './TopbarSearch';

const SearchDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    /*
     * toggle search-dropdown
     */
    const toggleDropdown = () => {
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
                <i className="dripicons-search noti-icon"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-animated dropdown-lg p-0">
                <div className="p-3">
                    {/* <TopbarSearch items={SearchResults} instanceId="topbarsearch" /> */}
                    <input type="text" className="form-control" placeholder="Search ..." />
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SearchDropdown;
