import SimpleBar from "simplebar-react";
import Link from "next/link";

const Sidebar = (props) => {
  var isLight = false;

  const MenuItem = ({ item }) => {
    return (
      <li className="side-nav-item">
        <MenuItemLink item={item} />
      </li>
    );
  };
  const MenuItemLink = ({ item }) => {
    return (
      <Link href={item.path}>
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
    },
    {
      name: "Quote",
      path: "/quote",
      icon: "uil-parcel",
    },
    {
      name: "Invoice",
      path: "/invoice",
      icon: "uil-invoice",
    },
    {
      name: "Chat",
      path: "/chat",
      icon: "uil-comments-alt",
    },
    {
      name: "Login",
      path: "/login",
      icon: "uil-lock",
    },
  ];

  function SideBarContent() {
    return (
      <ul className="metismenu side-nav" id="menu-bar">
        <li className="side-nav-title side-nav-item mm-active">Navigation</li>
        <li className="side-nav-item">
          <Link href="/">
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
      </ul>
    );
  }

  return (
    <div className="left-side-menu">
      <a href="/" className="logo text-center logo-light">
        <span className="logo-lg">
          <img
            src={
              isLight
                ? "/assets/images/logo-dark.png"
                : "/assets/images/logo.png"
            }
            alt="logo"
            height="16"
          />
        </span>
        <span className="logo-sm">
          <img
            src={
              isLight
                ? "/assets/images/logo_sm.png"
                : "/assets/images/logo_sm_dark.png"
            }
            alt="logo"
            height="16"
          />
        </span>
      </a>

      <a href="/" className="logo text-center logo-dark">
        <span className="logo-lg">
          <img
            src={
              isLight
                ? "/assets/images/logo-dark.png"
                : "/assets/images/logo.png"
            }
            alt="logo"
            height="16"
          />
        </span>
        <span className="logo-sm">
          <img
            src={
              isLight
                ? "/assets/images/logo_sm.png"
                : "/assets/images/logo_sm_dark.png"
            }
            alt="logo"
            height="16"
          />
        </span>
      </a>

      <SimpleBar
        style={{ maxHeight: "100%" }}
        timeout={500}
        scrollbarMaxSize={320}
      >
        <SideBarContent />
      </SimpleBar>

      <div className="help-box text-white text-center">
        <a href="/" className="float-right close-btn text-white">
          <i className="mdi mdi-close" />
        </a>

        <img src="/assets/images/help-icon.svg" height="90" alt="Helper Icon" />
        <h5 className="mt-3">Unlimited Access</h5>
        <p className="mb-3">
          Upgrade to plan to get access to unlimited reports
        </p>
        <button className="btn btn-outline-light btn-sm">Upgrade</button>
      </div>
    </div>
  );
};

export default Sidebar;
