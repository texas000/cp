import { useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import Link from "next/link";

const Notifications = [
  {
    id: 1,
    text: "Caleb Flakelar commented on Admin",
    subText: "1 min ago",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "primary",
  },
  {
    id: 2,
    text: "New user registered.",
    subText: "5 min ago",
    icon: "mdi mdi-account-plus",
    bgColor: "info",
  },
  {
    id: 3,
    text: "Cristina Pride",
    subText: "Hi, How are you? What about our next meeting",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "success",
  },
  {
    id: 4,
    text: "Caleb Flakelar commented on Admin",
    subText: "2 days ago",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "danger",
  },
  {
    id: 5,
    text: "Caleb Flakelar commented on Admin",
    subText: "1 min ago",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "primary",
  },
  {
    id: 6,
    text: "New user registered.",
    subText: "5 min ago",
    icon: "mdi mdi-account-plus",
    bgColor: "info",
  },
  {
    id: 7,
    text: "Cristina Pride",
    subText: "Hi, How are you? What about our next meeting",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "success",
  },
  {
    id: 8,
    text: "Caleb Flakelar commented on Admin",
    subText: "2 days ago",
    icon: "mdi mdi-comment-account-outline",
    bgColor: "danger",
  },
];

const ProfileMenus = [
  {
    label: "My Account",
    icon: "uil uil-user",
    redirectTo: "/",
  },
  {
    label: "Settings",
    icon: "uil uil-cog",
    redirectTo: "/",
  },
  {
    label: "Support",
    icon: "uil uil-life-ring",
    redirectTo: "/",
  },
  {
    label: "Lock Screen",
    icon: "uil uil-lock-alt",
    redirectTo: "/",
  },
  {
    label: "Logout",
    icon: "uil uil-exit",
    redirectTo: "/login",
  },
];

const SearchResults = [
  {
    id: 1,
    title: "Analytics Report",
    icon: "uil-notes",
    redirectTo: "/",
  },
  {
    id: 2,
    title: "How can I help you?",
    icon: "uil-life-ring",
    redirectTo: "/",
  },
  {
    id: 3,
    icon: "uil-cog",
    title: "User profile settings",
    redirectTo: "/",
  },
  {
    id: 4,
    icon: "uil-user",
    title: "Erwin Brown (UI)",
    redirectTo: "/",
  },
  {
    id: 5,
    icon: "uil-user",
    title: "Jacob Deo (Dev)",
    redirectTo: "/",
  },
];

export default function Topbar(props) {
  const [searchClick, setSearchClick] = useState(false);
  const toggleSearch = () => setSearchClick((prevState) => !prevState);

  function TopbarSearch() {
    return (
      <Dropdown
        isOpen={searchClick}
        toggle={toggleSearch}
        className="app-search d-none d-lg-block"
      >
        <DropdownToggle tag="a" className="d-none"></DropdownToggle>
        <form className="position-relative">
          <div className="input-group">
            <input
              className="form-control dropdown-toggle"
              placeholder="Search..."
              id="top-search"
              onClick={toggleSearch}
            />
            <span className="mdi mdi-magnify search-icon"></span>
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </div>
          <DropdownMenu
            right
            className="dropdown-menu-animated topbar-dropdown-menu dropdown-lg"
          >
            <div className="dropdown-header noti-title">
              <h5 className="text-overflow mb-2">
                Found{" "}
                <span className="text-danger">{SearchResults.length}</span>{" "}
                results
              </h5>
            </div>

            {SearchResults.map((item, i) => {
              return (
                <a
                  key={i}
                  href={item.redirectTo}
                  className="dropdown-item notify-item"
                >
                  <i className={`font-16 mr-1 ${item.icon && item.icon}`}></i>
                  <span>{item.title}</span>
                </a>
              );
            })}
          </DropdownMenu>
        </form>
      </Dropdown>
    );
  }

  function ProfileDropdown() {
    return (
      <UncontrolledDropdown>
        <DropdownToggle
          data-toggle="dropdown"
          tag="button"
          className="nav-link dropdown-toggle nav-user arrow-none mr-0"
        >
          <span className="account-user-avatar">
            <img
              src="/assets/images/users/avatar-4.jpg"
              className="rounded-circle"
              alt="user"
            />
          </span>
          <span>
            <span className="account-user-name">Jone</span>
            <span className="account-position">Doe</span>
          </span>
        </DropdownToggle>
        <DropdownMenu
          right
          className="dropdown-menu-animated topbar-dropdown-menu profile-dropdown"
        >
          <div>
            <div className="dropdown-header noti-title">
              <h6 className="text-overflow m-0">Welcome !</h6>
            </div>
            {ProfileMenus.map((item, i) => {
              return (
                <a
                  href={item.redirectTo}
                  className="dropdown-item notify-item"
                  key={i + "-profile-menu"}
                >
                  <i className={`${item.icon} mr-1`}></i>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  function NotificationDropdown() {
    return (
      <UncontrolledDropdown>
        <DropdownToggle
          data-toggle="dropdown"
          tag="button"
          className="nav-link dropdown-toggle arrow-none btn btn-link"
        >
          <i className="mdi mdi-bell-outline noti-icon"></i>
          <span className="noti-icon-badge"></span>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-animated dropdown-lg">
          <div>
            <div className="dropdown-item noti-title">
              <h5 className="m-0">
                <span className="float-right">
                  <a href="#" className="text-dark">
                    <small>Clear All</small>
                  </a>
                </span>
                Notification
              </h5>
            </div>
            <SimpleBar style={{ maxHeight: "230px" }}>
              {Notifications.map((item, i) => {
                return (
                  <a
                    href="#"
                    className="dropdown-item notify-item"
                    key={i + "-noti"}
                  >
                    <div className={`notify-icon bg-${item.bgColor}`}>
                      <i className={item.icon}></i>
                    </div>
                    <p className="notify-details">
                      {item.text}
                      <small className="text-muted">{item.subText}</small>
                    </p>
                  </a>
                );
              })}
            </SimpleBar>
            <Link href="/chat">
              <a className="dropdown-item text-center text-primary notify-item notify-all">
                View All
              </a>
            </Link>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  return (
    <div className="navbar-custom">
      <div className="container-fluid">
        {/* {!hideLogo && (
            <a href="/" className="topnav-logo">
                <span className="topnav-logo-lg">
                    <img src="/assets/images/logo-light.png" alt="logo" height="16" />
                </span>
                <span className="topnav-logo-sm">
                    <img src="/assets/images/logo_sm.png" alt="logo" height="16" />
                </span>
            </a>
        )} */}

        <ul className="list-unstyled topbar-right-menu float-right mb-0">
          <li className="notification-list topbar-dropdown d-lg-none">
            {/* <SearchDropdown /> */}
          </li>
          {/* <li className="notification-list topbar-dropdown">
                <button
                    className="nav-link dropdown-toggle arrow-none btn btn-link"
                    // onClick={this.handleRightSideBar}
                >
                    <i className="mdi mdi-settings-outline noti-icon"></i>
                </button>
            </li> */}
          <li className="notification-list topbar-dropdown d-none d-lg-block">
            {/* <LanguageDropdown /> */}
          </li>
          <li className="notification-list">
            <NotificationDropdown />
          </li>
          <li className="dropdown notification-list d-none d-sm-inline-block">
            {/* <AppsDropdown /> */}
          </li>
          <li className="notification-list">
            <ProfileDropdown />
            {/* <ProfileDropdown
                    // profilePic={profilePic}
                    menuItems={ProfileMenus}
                    username={'Dominic Keller'}
                    userTitle={'Founder'}
                /> */}
          </li>
        </ul>

        <button
          className="button-menu-mobile open-left disable-btn"
          onClick={props.toggleMenu}
          // onClick={props.setIsMenuOpened(true)}
        >
          <i className="mdi mdi-menu"></i>
        </button>

        <TopbarSearch items={SearchResults} />
      </div>
    </div>
  );
}
