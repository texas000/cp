// @flow
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';
import router from 'next/router';

import { findAllParent, findMenuItem } from './MenuList/menu';

const MenuItemWithChildren = ({ item, linkClassName, subMenuClassNames, activeMenuItems, toggleMenu, token }) => {
    const [open, setOpen] = useState(activeMenuItems.includes(item.key));

    useEffect(() => {
        setOpen(activeMenuItems.includes(item.key));
    }, [activeMenuItems, item]);

    const toggleMenuItem = (e) => {
        e.preventDefault();
        const status = !open;
        setOpen(status);
        if (toggleMenu) toggleMenu(item, status);
        return false;
    };

    return (
        <li className={classNames('side-nav-item', { 'menuitem-active': open })}>
            <a
                href="/#"
                onClick={toggleMenuItem}
                data-menu-key={item.key}
                aria-expanded={open}
                className={classNames(
                    'has-arrow',
                    'side-sub-nav-link',
                    linkClassName,
                    {
                        'menuitem-active': activeMenuItems.includes(item.key) ? 'active' : '',
                    },
                    !item.display && 'd-none'
                )}>
                {item.icon && <i className={item.icon}></i>}
                {!item.badge ? (
                    <span className="menu-arrow"></span>
                ) : (
                    <span className={`badge bg-${item.badge.variant} float-end`}>{item.badge.text}</span>
                )}
                <span> {item.label} </span>
            </a>
            <Collapse in={open}>
                <ul className={classNames(subMenuClassNames)}>
                    {item.children.map((child, i) => {
                        return (
                            <React.Fragment key={i}>
                                {child.children ? (
                                    <>
                                        {/* parent */}
                                        <MenuItemWithChildren
                                            item={child}
                                            linkClassName={activeMenuItems.includes(child.key) ? 'active' : ''}
                                            activeMenuItems={activeMenuItems}
                                            subMenuClassNames="side-nav-third-level"
                                            toggleMenu={toggleMenu}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* child */}
                                        <MenuItem
                                            item={child}
                                            className={activeMenuItems.includes(child.key) ? 'menuitem-active' : ''}
                                            linkClassName={activeMenuItems.includes(child.key) ? 'active' : ''}
                                        />
                                    </>
                                )}
                            </React.Fragment>
                        );
                    })}
                </ul>
            </Collapse>
        </li>
    );
};

const MenuItem = ({ item, className, linkClassName }) => {
    return (
        <li className={classNames('side-nav-item', className)}>
            <MenuItemLink item={item} className={linkClassName} />
        </li>
    );
};

const MenuItemLink = ({ item, className }) => {
    return (
        <a
            style={{ cursor: 'pointer' }}
            onClick={() => router.push(item.url)}
            target={item.target}
            className={classNames('side-nav-link-ref', 'side-sub-nav-link', className, !item.display && 'd-none')}
            data-menu-key={item.key}>
            {item.icon && <i className={item.icon}></i>}
            {item.badge && (
                <span className={`badge badge-${item.badge.variant} rounded-pill font-10 float-end`}>
                    {item.badge.text}
                </span>
            )}
            <span> {item.label} </span>
        </a>
    );
};

const AppMenu = ({ menuItems, location, token }) => {
    const menuRef = useRef(null);

    const [activeMenuItems, setActiveMenuItems] = useState([]);

    /*
     * toggle the menus
     */
    const toggleMenu = (menuItem, show) => {
        if (show) setActiveMenuItems([menuItem['key'], ...findAllParent(menuItems, menuItem)]);
    };

    /**
     * activate the menuitems
     */
    // const activeMenu = useCallback(() => {
    //     const div = document.getElementById('main-side-menu');
    //     let matchingMenuItem = null;

    //     if (div) {
    //         let items = div.getElementsByClassName('side-nav-link-ref');
    //         for (let i = 0; i < items.length; ++i) {
    //             if (location.pathname === items[i].pathname) {
    //                 matchingMenuItem = items[i];
    //                 break;
    //             }
    //         }

    //         if (matchingMenuItem) {
    //             const mid = matchingMenuItem.getAttribute('data-menu-key');
    //             const activeMt = findMenuItem(menuItems, mid);
    //             if (activeMt) {
    //                 setActiveMenuItems([activeMt['key'], ...findAllParent(menuItems, activeMt)]);
    //             }
    //         }
    //     }
    // }, [location.pathname, menuItems]);

    // useEffect(() => {
    //     activeMenu();
    // }, [activeMenu]);

    return (
        <>
            <ul className="side-nav" ref={menuRef} id="main-side-menu">
                {(menuItems || []).map((item, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            {item.isTitle ? (
                                // <li className="side-nav-title side-nav-item">{item.label}</li>
                                <li
                                    className={classNames(
                                        'side-nav-title side-nav-item',
                                        !item.display && 'd-none',
                                        token.admin < item.level && 'd-none'
                                    )}>
                                    {item.label}
                                </li>
                            ) : (
                                <>
                                    {item.children ? (
                                        <MenuItemWithChildren
                                            item={item}
                                            toggleMenu={toggleMenu}
                                            subMenuClassNames={
                                                token.admin < item.level ? 'd-none' : 'side-nav-second-level'
                                            }
                                            activeMenuItems={activeMenuItems}
                                            linkClassName={token.admin < item.level ? 'd-none' : 'side-nav-link'}
                                            token={token}
                                        />
                                    ) : (
                                        <MenuItem
                                            item={item}
                                            linkClassName="side-nav-link"
                                            className={
                                                (activeMenuItems.includes(item.key) ? 'menuitem-active' : '',
                                                token.admin < item.level && 'd-none')
                                            }
                                        />
                                    )}
                                </>
                            )}
                        </React.Fragment>
                    );
                })}
            </ul>
        </>
    );
};

export default AppMenu;
