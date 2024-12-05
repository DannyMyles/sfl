import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./componets/sidebar";
import TopBar from "./componets/topbar/topbar";

function App() {
  return (
    <>
      <div className="items-center navbar-header d-flex">
        <div className="content__topBar">
          <TopBar />
        </div>
      </div>
      <div className="flex relative h-screen">
        <Sidebar />
        <div className="flex-1 relative overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
