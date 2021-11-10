// @flow
import React, { useState } from 'react';
import LanguageDropdown from '../LanguageDropdown';
import AppsDropdown from './AppsDropdown';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import SearchDropdown from './SearchDropdown';
import TopbarSearch from './TopbarSearch';
// import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

// actions
// import { showRightSidebar } from '../redux/actions';

// components
// import LanguageDropdown from '../LanguageDropdown';
// import NotificationDropdown from '../components/NotificationDropdown';
// import ProfileDropdown from '../components/ProfileDropdown';
// import SearchDropdown from '../components/SearchDropdown';
// import TopbarSearch from '../components/TopbarSearch';
// import AppsDropdown from '../components/AppsDropdown/';

// import profilePic from '/assets/images/users/avatar-1.jpg';

//constants
// import * as layoutConstants from '../constants/layout';

// get the notifications
const Notifications = [
    {
        id: 1,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'primary',
    },
    {
        id: 2,
        text: 'New user registered.',
        subText: '5 min ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'info',
    },
    {
        id: 3,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'success',
    },
    {
        id: 4,
        text: 'Caleb Flakelar commented on Admin',
        subText: '4 days ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'danger',
    },
    {
        id: 5,
        text: 'New user registered.',
        subText: '5 min ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'info',
    },
    {
        id: 6,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'success',
    },
    {
        id: 7,
        text: 'Carlos Crouch liked Admin',
        subText: '13 days ago',
        icon: 'mdi mdi-heart',
        bgColor: 'info',
    },
];

// get the profilemenu
const ProfileMenus = [
    {
        label: 'My Account',
        icon: 'mdi mdi-account-circle',
        redirectTo: '/',
    },
    {
        label: 'Settings',
        icon: 'mdi mdi-account-edit',
        redirectTo: '/',
    },
    {
        label: 'Support',
        icon: 'mdi mdi-lifebuoy',
        redirectTo: '/',
    },
    {
        label: 'Lock Screen',
        icon: 'mdi mdi-lock-outline',
        redirectTo: '/',
    },
    {
        label: 'Logout',
        icon: 'mdi mdi-logout',
        redirectTo: '/login',
    },
];

// dummy search results
const SearchResults = [
    {
        id: 1,
        title: 'Analytics Report',
        icon: 'uil-notes',
        redirectTo: '/',
    },
    {
        id: 2,
        title: 'How can I help you?',
        icon: 'uil-life-ring',
        redirectTo: '/',
    },
    {
        id: 3,
        icon: 'uil-cog',
        title: 'User profile settings',
        redirectTo: '/',
    },
];

// type TopbarProps = {
//     hideLogo?: boolean,
//     navCssClasses?: string,
//     openLeftMenuCallBack?: () => void,
//     topbarDark?: boolean,
// };

const Topbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack, topbarDark, userProfile, user }) => {
    // const dispatch = useDispatch();

    const [isopen, setIsopen] = useState(false);

    const navbarCssClasses = navCssClasses || '';
    const containerCssClasses = !hideLogo ? 'container-fluid' : '';

    // const { layoutType } = useSelector((state) => ({
    //     layoutType: state.Layout.layoutType,
    // }));

    /**
     * Toggle the leftmenu when having mobile screen
     */
    const handleLeftMenuCallBack = () => {
        setIsopen((prevState) => !prevState);
        if (openLeftMenuCallBack) openLeftMenuCallBack();
    };

    /**
     * Toggles the right sidebar
     */
    const handleRightSideBar = () => {
        showRightSidebar();
    };

    return (
        <React.Fragment>
            {/* <div className={`navbar-custom ${navbarCssClasses}`}> */}
            <div className={`navbar-custom`}>
                <div className={containerCssClasses}>
                    <ul className="list-unstyled topbar-menu float-end mb-0">
                        <li className="notification-list topbar-dropdown d-xl-none">
                            <SearchDropdown />
                        </li>
                        {/* TEMPORARY COMMENT OUT */}
                        {/* <li className="dropdown notification-list topbar-dropdown d-none d-lg-block">
                            <LanguageDropdown />
                        </li> */}
                        {/* TEMPORARY COMMENT OUT */}
                        {/* <li className="dropdown notification-list">
                            <NotificationDropdown notifications={Notifications} />
                        </li> */}
                        {/* TEMPORARY COMMENT OUT */}
                        {/* <li className="dropdown notification-list d-none d-sm-inline-block">
                            <AppsDropdown />
                        </li> */}
                        {/* <li className="notification-list">
                            <button
                                className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
                                // onClick={handleRightSideBar}
                            >
                                <i className="dripicons-gear noti-icon"></i>
                            </button>
                        </li> */}
                        <li className="dropdown notification-list">
                            <ProfileDropdown
                                profilePic={user.photoURL || '/assets/images/users/avatar-1.jpg'}
                                menuItems={ProfileMenus}
                                username={user.email}
                                userTitle={user.displayName}
                            />
                        </li>
                    </ul>

                    {/* toggle for vertical layout */}

                    <button className="button-menu-mobile open-left" onClick={handleLeftMenuCallBack}>
                        <i className="mdi mdi-menu" />
                    </button>

                    {/* toggle for horizontal layout */}

                    {/* <a
                        href="#"
                        className="navbar-toggle"
                        className={classNames('navbar-toggle', { open: isopen })}
                        onClick={handleLeftMenuCallBack}>
                        <div className="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </a> */}

                    {/* toggle for detached layout */}
                    {/* {layoutType === layoutConstants.LAYOUT_DETACHED && (
                        <a href="#" className="button-menu-mobile disable-btn" onClick={handleLeftMenuCallBack}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </a>
                    )} */}
                    <TopbarSearch items={SearchResults} instanceId="topbarsearch" />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Topbar;
