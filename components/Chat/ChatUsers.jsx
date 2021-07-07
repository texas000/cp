import { useState } from "react";
import { Card, CardBody, Media } from "reactstrap";
import SimpleBar from "simplebar-react";

export default function ChatUsers(props) {
  const [selectedUser, setSelectedUser] = useState(false);
  const groupFilters = ["All", "Favourties", "Work"];
  return (
    <Card>
      <CardBody className="p-0">
        <ul className="nav nav-tabs nav-bordered">
          {groupFilters.map((group, index) => {
            return (
              <li key={index} className="nav-item">
                <a href="#" className="nav-link">
                  {group}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="tab-content">
          <div className="tab-pane show active p-3">
            <div className="app-search">
              <div className="form-group position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="People, groups & messages..."
                />
                <span className="mdi mdi-magnify search-icon"></span>
              </div>
            </div>
            <SimpleBar style={{ maxHeight: "556px", width: "100%" }}>
              {users.map((user, index) => {
                return (
                  <a href="#" key={index} className="text-body" onClick={()=>setSelectedUser(user.id)}>
                    <Media className={`mt-1 p-2 ${selectedUser===user.id && 'bg-light'}`}>
                      <img
                        src={user.avatar}
                        className="mr-2 rounded-circle"
                        height="48"
                        alt=""
                      />

                      <Media body>
                        <h5 className="mt-0 mb-0 font-14">
                          <span className="float-right text-muted font-12">
                            {user.lastMessageOn}
                          </span>
                          {user.name}
                        </h5>
                        <p className="mt-1 mb-0 text-muted font-14">
                          <span className="w-25 float-right text-right">
                            {user.totalUnread != 0 && (
                              <span className="badge badge-danger-lighten">
                                {user.totalUnread}
                              </span>
                            )}
                          </span>
                          <span className="w-75">{user.lastMessage}</span>
                        </p>
                      </Media>
                    </Media>
                  </a>
                );
              })}
            </SimpleBar>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

const users = [
  {
    id: 1,
    name: "Brandon Smith",
    avatar: "/assets/images/users/avatar-2.jpg",
    lastMessage: "How are you today?",
    totalUnread: 3,
    lastMessageOn: "4:30am",
    email: "support@coderthemes.com",
    phone: "+1 456 9595 9594",
    location: "California, USA",
    languages: "English, German, Spanish",
    groups: "Work, Favourties",
  },
  {
    id: 2,
    name: "Maria C",
    avatar: "/assets/images/users/avatar-5.jpg",
    lastMessage: "Hey! a reminder for tomorrow's meeting?",
    totalUnread: 0,
    lastMessageOn: "5:30am",
    email: "support@coderthemes.com",
    phone: "+1 456 9595 9594",
    location: "New York, USA",
    languages: "English, German, Spanish",
    groups: "Work, Friends",
  },
  {
    id: 3,
    name: "Dominic A",
    avatar: "/assets/images/users/avatar-5.jpg",
    lastMessage: "Are we going to have this week's planning meeting?",
    totalUnread: 2,
    lastMessageOn: "Thu",
    email: "support@coderthemes.com",
    phone: "+1 456 9595 9594",
    location: "New Jersey, USA",
    languages: "English, German, Spanish",
    groups: "Work, Favourties",
  },
  {
    id: 4,
    name: "Ronda D",
    avatar: "/assets/images/users/avatar-9.jpg",
    lastMessage: "Please check these design assets..",
    totalUnread: 0,
    lastMessageOn: "Wed",
    email: "support@coderthemes.com",
    phone: "+1 456 9595 9594",
    location: "California, USA",
    languages: "English, German, Spanish",
    groups: "Work, Friends",
  },
  {
    id: 5,
    name: "Michael H",
    avatar: "/assets/images/users/avatar-6.jpg",
    lastMessage: "Are you free for 15 mins? I would like to discuss something",
    totalUnread: 6,
    lastMessageOn: "Tue",
    email: "support@coderthemes.com",
    phone: "+1 456 9595 9594",
    location: "New York, USA",
    languages: "English, German, Spanish",
    groups: "Work, Friends",
  },
  {
    id: 6,
    name: "Thomas R",
    avatar: "/assets/images/users/avatar-7.jpg",
    lastMessage: "Let's have meeting today between me, you and Tony...",
    totalUnread: 0,
    lastMessageOn: "Tue",
    email: "support@coderthemes.com",
    phone: "+1 456 9595 9594",
    location: "New Jersey, USA",
    languages: "English, German, Spanish",
    groups: "Work, Friends",
  },
  {
    id: 7,
    name: "Thomas J",
    avatar: "/assets/images/users/avatar-8.jpg",
    lastMessage: "Howdy?",
    totalUnread: 0,
    lastMessageOn: "Tue",
    email: "support@coderthemes.com",
    phone: "+1 456 9595 9594",
    location: "New York, USA",
    languages: "English, German, Spanish",
    groups: "Work, Favourties",
  },
  {
    id: 8,
    name: "Rikcy J",
    avatar: "/assets/images/users/avatar-3.jpg",
    lastMessage: "Are you interested in learning?",
    totalUnread: 28,
    lastMessageOn: "Mon",
    email: "support@coderthemes.com",
    phone: "+1 456 9595 9594",
    location: "New Jersey, USA",
    languages: "English, German, Spanish",
    groups: "Work, Friends",
  },
];
