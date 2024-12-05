import { TbUsersPlus } from "react-icons/tb";
import { MdModelTraining } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

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
  }
];
