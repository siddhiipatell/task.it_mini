import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link} from "react-router-dom";
import logosvg from "../assets/images/logo.svg";

// const { Header, Content, Footer, Sider } = Layout;
const items1 = [
  
  {
    key: "2",
    title: "Home",
    link: "/home",
  },
  {
    key: "3",
    title: "Tasks",
    link: "/tasks",
  },
  {
    key: "4",
    title: "Projects",
    link: "/projects",
  },
  {
    key: "5",
    title: "Users",
    link: "/users",
  },
];
const Navbar = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the server
        const name = localStorage.getItem("name");
        const response = await axios.get(
          `http://localhost:3000/api/v1/tasks/users/${name}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you are storing the token in localStorage
            },
          }
        );
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };
  return (
    <header className="">
      <section className="flex items-stretch space-x-10 py-3">
        <div className="menu-open flex items-center relative">
          
          <a href="" >
            <img
              src={logosvg}
              alt="Task.it"
              width="55"
              height="50"
              className="rounded-full ml-5"
            />
          </a>
          
          {/* <p className="absolute top-0 -right-4 z-20 text-gray-500 text-sm">Beta</p> */}
        </div>
        {/* <nav className="flex-1 flex items-center text-gray-400 font-medium relative">
                    <button className="menu-close lg:hidden absolute top-4 right-4">
                    </button>
                    <ol className="list-none flex items-center gap-6">
                        <li>
                            <a
                                className="flex items-center space-x-2"
                                href="/dashboard/home"
                                activeClassName="text-gray-800"
                            >
                                <p>Home</p>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center space-x-2"
                                href="/dashboard/tasks"
                                activeClassName="text-gray-800"
                            >
                                <p>My Tasks</p>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center space-x-2"
                                href="/dashboard/projects"
                                activeClassName="text-gray-800"
                            >
                                <p>Projects</p>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center space-x-2"
                                href="/dashboard/users"
                                activeClassName="text-gray-800"
                            >
                                <p>Users</p>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center space-x-2"
                                href="/dashboard/orgs"
                                activeClassName="text-gray-800"
                            >
                                <p>Orgs</p>
                            </a>
                        </li>
                    </ol>
                </nav> */}
        <div className="flex-1 flex items-center text-gray-400 font-medium relative">
          {/* Your menu items */}
          <ul className="flex space-x-6">
                {items1.map((item) => (
                    <li key={item.key} className="menu-item">
                        <Link to={item.link}>{item.title}</Link>
                    </li>
                ))}
                <li key="logout" className="menu-item" onClick={logout}>
                    Logout
                </li>
            </ul>
        </div>
      {/* </section>
      <section className="flex space-x-6 items-center"> */}
      <div className="flex space-x-6 items-center pr-5">
        <a
          className="text-xs text-gray-500 hidden md:block"
          href=""
          title="Org you are currently logged into"
        >
          Org:{" "}
          <span className="font-medium text-sm text-gray-700">Task.it</span>
        </a>
        <div className="grid grid-cols-1 gap-4 text-gray-400">
          {/* <button title="Coming soon">
                        <rmx-icon name="add-circle-line"></rmx-icon>
                    </button> */}
          <button title="Coming soon" aria-label="Notifications">
            <i className="ri-notification-line"></i>
          </button>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          placement="bottom-start"
          variation="menu"
        >
          <img
            src="https://avatar.tobi.sh/1"
            alt="Siddhi"
            width="40"
            height="40"
            className="rounded-full"
          />
          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-end">
              <p className="text-sm font-medium">
                <a href="/profile">{user.username}</a>
              </p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            {/* <rmx-icon className="text-gray-400" style={{ width: "16px", height: "16px" }} name="arrow-down-s-line"></rmx-icon> */}
          </div>
        </div>
        </div>
      </section>
    </header>
    // <Layout>
    //   <Header
    //     style={{
    //       // display: 'flex',
    //       alignItems: "center",
    //     }}
    //   >
    //     <div className="demo-logo" />
    //     <Menu
    //       theme="dark"
    //       mode="horizontal"
    //       // style={{
    //       //   flex: 1,
    //       //   minWidth: 0,
    //       // }}
    //     >
    //       {items1.map((item) => (
    //         <Menu.Item icon={item.icon}>
    //           <Link to={item.link} key={item.key}>
    //             {item.title}
    //           </Link>
    //         </Menu.Item>
    //       ))}
    //       <Menu.Item key="7" onClick={logout}>
    //         Logout
    //       </Menu.Item>
    //     </Menu>
    //   </Header>
    //   <Content
    //     style={{
    //       padding: "0 48px",
    //     }}
    //   ></Content>
    // </Layout>
  );
};
export default Navbar;
