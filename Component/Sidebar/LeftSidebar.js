// @flow
import React, { useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';

import AppMenu from './Menu';
import { getMenuItems } from './MenuList/menu';

// components

/* sidebar content */
const SideBarContent = ({ hideUserProfile, token }) => {
    return (
        <>
            {/* {!hideUserProfile && (
                <div className="leftbar-user">
                    <a href="/">
                        <img
                            src={'/assets/images/users/avatar-1.jpg'}
                            alt=""
                            height="42"
                            className="rounded-circle shadow-sm"
                        />
                        <span className="leftbar-user-name">Dominic Keller</span>
                    </a>
                </div>
            )} */}

            <AppMenu menuItems={getMenuItems()} token={token} />

            <div className={classNames('help-box', 'text-center', { 'text-white': hideUserProfile })}>
                <a href="/" className="float-end close-btn text-white">
                    <i className="mdi mdi-close" />
                </a>

                <img src={'/assets/images/help-icon.svg'} height="90" alt="Helper Icon" />
                <h5 className="mt-3">Unlimited Access</h5>
                <p className="mb-3">Upgrade to plan to get access to unlimited reports</p>
                <button
                    className={classNames(
                        'btn',
                        'btn-sm',
                        hideUserProfile ? 'btn-outline-light' : 'btn-outline-primary'
                    )}>
                    Upgrade
                </button>
            </div>
            <div className="clearfix" />
        </>
    );
};

const LeftSidebar = ({ isCondensed, isLight, hideLogo, hideUserProfile, token }) => {
    const menuNodeRef = useRef(null);

    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = (e) => {
        if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target)) return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        };
    }, []);

    return (
        <React.Fragment>
            <div className="leftside-menu" ref={menuNodeRef}>
                <React.Fragment>
                    <a href="/" className="logo text-center logo-light">
                        <span className="logo-lg">
                            <img
                                src={isLight ? '/assets/images/logo-dark.png' : '/assets/images/logo.png'}
                                alt="logo"
                                height="25"
                            />
                        </span>
                        <span className="logo-sm">
                            <img
                                src={isLight ? '/assets/images/logo_sm.png' : '/assets/images/logo_sm_dark.png'}
                                alt="logo"
                                height="25"
                            />
                        </span>
                    </a>

                    <a href="/" className="logo text-center logo-dark">
                        <span className="logo-lg">
                            <img
                                src={isLight ? '/assets/images/logo-dark.png' : '/assets/images/logo.png'}
                                alt="logo"
                                height="16"
                            />
                        </span>
                        <span className="logo-sm">
                            <img
                                src={isLight ? '/assets/images/logo_sm.png' : '/assets/images/logo_sm_dark.png'}
                                alt="logo"
                                height="16"
                            />
                        </span>
                    </a>
                </React.Fragment>

                {!isCondensed && (
                    <SimpleBar style={{ maxHeight: '100%' }} timeout={500} scrollbarMaxSize={320}>
                        <SideBarContent
                            menuClickHandler={() => {
                                console.log('menu click handler');
                            }}
                            isLight={isLight}
                            hideUserProfile={hideUserProfile}
                            token={token}
                        />
                    </SimpleBar>
                )}
                {isCondensed && <SideBarContent isLight={isLight} hideUserProfile={hideUserProfile} token={token} />}
            </div>
        </React.Fragment>
    );
};

LeftSidebar.defaultProps = {
    hideLogo: false,
    hideUserProfile: false,
    isLight: false,
    isCondensed: false,
};

export default LeftSidebar;
