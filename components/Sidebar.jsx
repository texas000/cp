import SimpleBar from "simplebar-react";
import Link from "next/link";
import React from "react";

export default function Sidebar(props) {
  var isLight = false;

  const MenuItem = ({ item }) => {
    return (
      <li className={`side-nav-item ${item.admin && "d-none"}`}>
        <MenuItemLink item={item} />
      </li>
    );
  };

  const MenuItemLink = ({ item }) => {
    return (
      <Link href={{ pathname: item.path }}>
        <a className="side-nav-link-ref side-sub-nav-link side-nav-link">
          {item.icon && <i className={item.icon}></i>}
          {item.badge && (
            <span className={`badge badge-${item.badge.variant} float-right`}>
              {item.badge.text}
            </span>
          )}
          <span> {item.name} </span>
        </a>
      </Link>
    );
  };

  const apps = [
    {
      name: "Shipment",
      path: "/shipment",
      icon: "uil-ship",
      admin: false,
    },
    {
      name: "Quote",
      path: "/quote",
      icon: "uil-parcel",
      admin: false,
    },
    {
      name: "Invoice",
      path: "/invoice",
      icon: "uil-invoice",
      admin: false,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: "uil-comments-alt",
      admin: false,
    },
    // {
    //   name: "Login",
    //   path: "/login",
    //   icon: "uil-lock",
    //   admin: false,
    // },
    // {
    //   name: "Customers",
    //   path: "/customers",
    //   icon: "uil-user-square",
    //   admin: !props.token.admin,
    // },
  ];

  const admins = [
    {
      name: "Customers",
      path: "/customers",
      icon: "uil-user-square",
      admin: !props.token.admin,
    },
    {
      name: "Quotes",
      path: "/quotes",
      icon: "uil-parcel",
      admin: !props.token.admin,
    },
    {
      name: "Main",
      path: "/",
      icon: "uil-home",
      admin: !props.token.admin,
    },
  ];

  function SideBarContent() {
    return (
      <ul className="metismenu side-nav" id="menu-bar">
        <li className="side-nav-title side-nav-item mm-active">Navigation</li>
        <li className="side-nav-item">
          <Link href="/dashboard">
            <a className="side-nav-link-ref side-sub-nav-link side-nav-link">
              <i className="uil-home-alt"></i>
              <span className={`badge badge-success float-right`}>4</span>
              <span> Dashboard </span>
            </a>
          </Link>
        </li>
        <li className="side-nav-title side-nav-item mm-active">Apps</li>
        {apps.map((app, i) => (
          <MenuItem item={app} key={i} />
        ))}
        {props.token.admin != 0 && (
          <li className="side-nav-title side-nav-item mm-active">Tools</li>
        )}
        {props.token.admin != 0 &&
          admins.map((app, i) => <MenuItem item={app} key={i + "admin"} />)}
      </ul>
    );
  }

  return (
    <div
      className={`${
        props.windowDimensions.width < 1030
          ? "left-side-menu-condensed"
          : "left-side-menu"
      }`}
    >
      <Link href="/dashboard">
        <a className="logo text-center logo-light">
          <span className="logo-lg p-3">
            <img
              src="/assets/images/jwi.png"
              alt="logo"
              className="mx-auto w-9 h-9 bg-white rounded-full p-1"
            />
          </span>
          <span className="logo-sm mt-2">
            <img
              src="/assets/images/jwi.png"
              alt="logo"
              className="mx-auto w-10 h-10 bg-white rounded-full p-1"
            />
          </span>
        </a>
      </Link>

      {/* <a href="/" className="logo text-center logo-dark">
        <span className="logo-lg">
          <img
            src="/assets/images/jwi.png"
            alt="logo"
            className="w-8 h-8 bg-white rounded-full p-1"
          />
        </span>
        <span className="logo-sm">
          <img
            src="/assets/images/jwi.png"
            alt="logo"
            className="w-8 h-8 bg-white rounded-full p-1"
          />
        </span>
      </a> */}

      <SimpleBar
        style={{ maxHeight: "100%" }}
        timeout={500}
        scrollbarMaxSize={320}
      >
        <SideBarContent />
      </SimpleBar>

      {/* <div className="help-box text-white text-center">
        <a href="/" className="float-right close-btn text-white">
          <i className="mdi mdi-close" />
        </a>

        <img src="/assets/images/help-icon.svg" height="90" alt="Helper Icon" />
        <h5 className="mt-3">Unlimited Access</h5>
        <p className="mb-3">
          Upgrade to plan to get access to unlimited reports
        </p>
        <button className="btn btn-outline-light btn-sm">Upgrade</button>
      </div> */}
    </div>
  );
}
