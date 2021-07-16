import { useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import Link from "next/link";
import useSWR from "swr";

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
    redirectTo: "/profile",
    class: 'active'
  },
  {
    label: "Settings",
    icon: "uil uil-cog",
    redirectTo: "/",
    class: 'disabled'
  },
  {
    label: "Support",
    icon: "uil uil-life-ring",
    redirectTo: "/",
    class: 'disabled'
  },
  {
    label: "Lock Screen",
    icon: "uil uil-lock-alt",
    redirectTo: "/",
    class: 'disabled'
  },
  {
    label: "Logout",
    icon: "uil uil-exit",
    redirectTo: "/login",
    class: 'active'
  },
];

const SearchResults = [
  {
    id: 1,
    title: "Shipment List",
    icon: "uil-notes",
    redirectTo: "/shipment",
  },
  {
    id: 2,
    title: "Invoice List",
    icon: "uil-life-ring",
    redirectTo: "/invoice",
  },
  {
    id: 3,
    icon: "uil-cog",
    title: "Chat List",
    redirectTo: "/chat",
  },
  // {
  //   id: 4,
  //   icon: "uil-user",
  //   title: "Erwin Brown (UI)",
  //   redirectTo: "/",
  // },
  // {
  //   id: 5,
  //   icon: "uil-user",
  //   title: "Jacob Deo (Dev)",
  //   redirectTo: "/",
  // },
];

export default function Topbar(props) {
  const [searchValue, setSearchValue] = useState('');
  const toggleSearch = () => setSearchValue('');
  const {data} = useSWR('/api/chat/getUnread')
  const {data: searchResult} = useSWR(setSearchValue!='' ? `/api/search?q=${searchValue}`: null)

  async function handleSearchSubmit(e) {
    e.preventDefault();
    console.log(e.target[0].value);
  }

  function TopbarSearch() {
    return (
      <Dropdown
        isOpen={searchValue!=''}
        toggle={toggleSearch}
        className="app-search d-none d-lg-block"
      >
        <DropdownToggle tag="a" className="d-none"></DropdownToggle>
        <form className="position-relative" onSubmit={handleSearchSubmit}>
          <div className="input-group" >
            <input
              className="form-control dropdown-toggle"
              placeholder="Search..."
              id="top-search"
              value={searchValue}
              type="text"
              autoFocus={true}
              autoComplete="off"
              onChange={e=>{
                var safeString = e.target.value.replace(/[^a-zA-Z0-9#]/g, '');
                setSearchValue(safeString)
              }}
              // onClick={toggleSearch}
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
            {SearchResults.map((item, i) => {
              return (
                <Link
                key={i}
                  href={item.redirectTo}
                >
                <a
                  className="dropdown-item notify-item"
                >
                  <i className={`font-16 mr-1 ${item.icon && item.icon}`}></i>
                  <span>{item.title}</span>
                </a>
                </Link>
              );
            })}

            <div className="dropdown-header noti-title">
              <h5 className="text-overflow mb-2">
                Found{" "}
                <span className="text-danger">{searchResult ? searchResult.length : '0' }</span>{" "}
                results
              </h5>
            </div>

            {searchResult && searchResult.map(ga=> (
              <Link
              key={ga.F_RefNo}
              href={`/shipment/${ga.F_RefNo}?q=${ga.Type}`}
              >
              <a
              className="dropdown-item notify-item text-truncate"
              onClick={toggleSearch}
            >
              <i className={`font-16 mr-1 ${ga.Icon}`}></i>
              <span>{ga.F_CustRefNo}</span>{" "}
              <small className="text-secondary">({ga.F_RefNo})</small>
            </a>
              </Link>
            ))}
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
              src={props.token.photoURL||"/assets/images/users/avatar-4.jpg"}
              className="rounded-circle"
              alt="user"
            />
          </span>
          <span>
            <span className="account-user-name">{props.token.displayName||'Name'}</span>
            <span className="account-position">{props.token.email}</span>
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
                  className={`dropdown-item notify-item ${item.class}`}
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
              {data && data.length>0 && data.map(ga=>(
                <a key={ga.ID} href="#" className="dropdown-item notify-item">
                  <div className={`notify-icon bg-primary`}>
                      <img src={ga.PHOTO} className="notify-icon"/>
                      {/* <i className="mdi mdi-comment-account-outline"></i> */}
                    </div>
                    <p className="notify-details">
                      {ga.NAME}
                      <small className="text-muted">{ga.MESSAGE_BODY}</small>
                    </p>
                </a>
              ))}
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
