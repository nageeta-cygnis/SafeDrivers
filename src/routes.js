import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import Profile from "layouts/profile";
import Contacts from "layouts/contacts";
import Rides from "layouts/rides";
import Reporting from "layouts/reporting";
// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Requests",
    key: "Contact",
    icon: <Icon fontSize="small">phone</Icon>,
    route: "/contact",
    component: <Contacts />,
  },
  {
    type: "collapse",
    name: "Rides",
    key: "Rides",
    icon: <Icon fontSize="small">car_crash</Icon>,
    route: "/rides",
    component: <Rides />,
  },
  {
    type: "collapse",
    name: "User Reporting",
    key: "User Reporting",
    icon: <Icon fontSize="small">summarize</Icon>,
    route: "/reporting",
    component: <Reporting />,
  },
];

export default routes;
