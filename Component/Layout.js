// @flow
import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import LeftSidebar from './Sidebar/LeftSidebar';
import Topbar from './Top/Topbar';
import Footer from './Sidebar/Footer';
import Head from 'next/head';
import router from 'next/router';
// actions
// import { changeLayout } from '../redux/actions';

// import * as layoutConstants from '../constants/layout';

// components

const loading = () => <div className="text-center"></div>;

const Layout = ({ children, token, title }) => {
    // const dispatch = useDispatch();
    // const { leftSideBarTheme, leftSideBarType } = useSelector((state) => ({
    //     layoutWidth: state.Layout.layoutWidth,
    //     leftSideBarTheme: state.Layout.leftSideBarTheme,
    //     leftSideBarType: state.Layout.leftSideBarType,
    //     showRightSidebar: state.Layout.showRightSidebar,
    // }));

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    /**
     * Open the menu when having mobile screen
     */
    const openMenu = (e) => {
        setIsMenuOpened((prevState) => {
            setIsMenuOpened(!prevState);
        });
        if (document.body) {
            document.body.classList.add('show');
            if (isMenuOpened) {
                document.body.classList.add('sidebar-enable');
                document.body.setAttribute('data-leftbar-compact-mode', 'condensed');
                document.getElementsByClassName('navbar-custom')[0].setAttribute('style', 'left: 70px');
            } else {
                document.body.classList.remove('sidebar-enable');
                document.body.removeAttribute('data-leftbar-compact-mode');
                document.getElementsByClassName('navbar-custom')[0].setAttribute('style', 'left: 260px');
            }
        }
    };

    // useEffect(() => {
    //     dispatch(changeLayout(layoutConstants.LAYOUT_DETACHED));
    // }, [dispatch]);

    // const isCondensed = leftSideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED;
    // const isLight = leftSideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_LIGHT;
    const [loading, setLoading] = useState(false);
    router.events.on('routeChangeStart', () => {
        setLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
        setLoading(false);
    });
    return (
        <>
            <Head>
                <title>{title || 'JWITRACKING'}</title>
            </Head>
            <Topbar
                isMenuOpened={isMenuOpened}
                openLeftMenuCallBack={openMenu}
                navCssClasses="topnav-navbar topnav-navbar-dark"
                // navCssClasses="topnav-navbar"
                topbarDark={true}
                user={token}
                userProfile={token.photoURL}
            />

            <Container fluid className="px-0">
                <div className="wrapper">
                    <LeftSidebar
                        isMenuOpened={isMenuOpened}
                        isCondensed={false}
                        isLight={true}
                        hideLogo={true}
                        hideUserProfile={false}
                        token={token}
                    />
                    {/* <Suspense fallback={loading()}>
                        <LeftSidebar
                            isMenuOpened={isMenuOpened}
                            isCondensed={isCondensed}
                            isLight={isLight}
                            hideLogo={true}
                            hideUserProfile={false}
                        />
                    </Suspense> */}

                    <div className="content-page">
                        {loading ? (
                            <div
                                className="preloader"
                                style={{
                                    verticalAlign: 'middle',
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                }}>
                                <div className="status">
                                    <div className="bouncing-loader">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="content">
                                <div className="container-fluid">{children}</div>
                            </div>
                        )}
                        <Footer />
                    </div>
                </div>
            </Container>
            {/* <Suspense fallback={loading()}>
                <RightSidebar>
                    <ThemeCustomizer />
                </RightSidebar>
            </Suspense> */}
        </>
    );
};

export default Layout;
