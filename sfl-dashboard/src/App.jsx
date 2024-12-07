import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./componets/sidebar";
import TopBar from "./componets/topbar/topbar";

function App() {
  return (
    <>
      <div className="main__wrap overflow-hidden">
        <Sidebar />
        <div >
          <div className="content__topBar">
            <TopBar />
          </div>
          <div className="flex-1 p-2 content__overflow_wrapper h-screen">
            <div className="p-2 overflow-auto bg-white  rounded-xl"><Outlet /></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
