import React, { useContext, useState } from "react";
import "./topbar.css";
import { Button } from "primereact/button";
import { CiLogout } from "react-icons/ci";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile";
import { AuthContext } from "../../context/AuthContext";

const TopBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [profileOpen, setProfileOpen] = useState(false);

  console.log("userr in topbar ->>>>>>", user)
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

  const showProfileModal = () => setProfileOpen(true);
  const hideProfileModal = () => setProfileOpen(false);

  return (
    <div className="topbar__container border-b bg-white flex justify-end w-full top-0">
      <Toaster position="top-right" richColors closeButton />
      <div className="flex items-center gap-1 ml-auto mx-2">
        <button
          type="button"
          className="md:border-1 rounded-[10px] flex items-center gap-3 px-1.5 py-1 md:px-3 md:py-1.5 max-h-[36px]"
          onClick={showProfileModal}
        >
          <img
            loading="lazy"
            decoding="async"
            src="/src/assets/images/placeholder.png"
            className="h-[24px] w-[24px] rounded-full"
            alt="User Avatar"
          />
          <p className="text-[11px] text-nowrap md:text-sm font-normal text-[#000027] hidden md:block">
            {user ? user.name : "Guest"}
          </p>
        </button>

        <div
          className="h-[22px] w-[26px] md:w-[35px] md:h-[35px] mr-4 cursor-pointer ml-2 flex items-center justify-center border border-[#8FD188] rounded-lg"
          onClick={handleLogout}
        >
          <CiLogout size={20} className="text-[#8FD188]" />
        </div>
      </div>

      <Profile dialogVisible={profileOpen} hideDialog={hideProfileModal} />
    </div>
  );
};

export default TopBar;
