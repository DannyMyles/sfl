// components/Sidebar/Sidebar.js

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { routes } from "../utils/routes";

const Sidebar = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="sidebar__wrap  border-r-2">
      <div className="drawer__header" style={{ height: 100 }}>
        <img
          loading="lazy"
          decoding="async"
          className="w-[150px] h-[150px] nodrag"
          src="/src/assets/sfl_bxbwqe.svg"
          alt="Logo"
        />
      </div>
      <SimpleBar className="h-100vh" id="my-element">
        <div id="sidebar-menu" className="white">
          <ul id="side-menu" className="metismenu">
            {routes.map((item) => (
              <li
                key={item.key}
                className={item.route === location.pathname ? "mm-active" : ""}
              >
                <Link to={item.route || ""} className="side-nav-link-ref">
                  <span
                    className="dl__drawer_list_icon"
                    style={{ color: item.color }}
                  >
                    <item.icon className="h-[19px] w-[19px]" />
                  </span>
                  <span className="item-title">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SimpleBar>
    </div>
  );
};

export default Sidebar;
