import { TbUsersPlus } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

export const routes = [
  {
    title: "Dashboard",
    route: "/sfl/dashboard",
    color: '#AE3EC9',
    key: "dashboard",
    icon: MdDashboard,
    permissions: ["read", "write"],
  },
  {
    title: "User Management",
    color: '#F59F00',
    route: "/sfl/users",
    key: "users",
    icon: TbUsersPlus,
    permissions: ["read", "write"],
  },
  {
    title: "Member Management",
    color: '#1098AD',
    route: "/sfl/members",
    key: "members",
    icon: BsPeople,
    permissions: ["read", "write"],
  }
];
