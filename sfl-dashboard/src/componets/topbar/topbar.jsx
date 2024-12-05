"use client";

import React, { useContext } from "react";
import "./topbar.css";
import { Button } from "primereact/button";
import { CiLogout } from "react-icons/ci";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

const TopBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(useAuthContext);

  const goToSetting = () => {
    console.log("Go to Settings");
    navigate("/settings");
  };

  const handleLogout = async () => {
    try {
      await logout(); 
      toast.success("Logged out successfully");
      navigate("/"); 
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <div className="topbar__container">
      <Toaster position="top-right" richColors closeButton />
      <div className="flex items-center gap-1 ml-auto mx-2">
        <div className="flex items-center mx-0 md:mx-2 space-x-1 md:space-x-4">
          <Button onClick={goToSetting} className="ml-3">
            <img
              loading="lazy"
              decoding="async"
              src="/src/assets/svgs/settings.svg"
              className="h-14 w-auto md:h-[20px] md:w-[20px] text-[#717188]"
              alt="Settings"
            />
          </Button>
        </div>

        <button
          type="button"
          className="md:border-1 rounded-[10px] flex items-center gap-3 px-1.5 py-1 md:px-3 md:py-1.5 max-h-[36px]"
          onClick={goToSetting}
        >
          <img
            loading="lazy"
            decoding="async"
            src="/src/assets/images/placeholder.png"
            className="h-[24px] w-[24px] rounded-full"
            alt="User Avatar"
          />
          <p className="text-[11px] text-nowrap md:text-sm font-normal text-[#000027] hidden md:block">
            {user ? user?.lastName : "Guest"}
          </p>
        </button>

        {/* Logout button */}
        <div
          className="h-[22px] w-[26px] md:w-[35px] md:h-[35px] mr-4 cursor-pointer ml-2 flex items-center justify-center border border-[#8FD188] rounded-lg"
          onClick={handleLogout}
        >
          <CiLogout size={20} className="text-[#8FD188]" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
