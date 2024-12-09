import React, { useState, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
const Profile = ({ dialogVisible, hideDialog }) => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [updatedProfile, setUpdatedProfile] = useState({
    firstName: user?.name || "",
    email: user?.email || "",
    profilePicture: user?.profilePicture || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedProfile({
        ...updatedProfile,
        profilePicture: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await updateUserProfile(updatedProfile);
      toast.success("Profile updated successfully");
      hideDialog();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  return (
    <Dialog
      visible={dialogVisible}
      onHide={hideDialog}
      header="Update Profile"
      modal
      draggable
      headerClassName="border-b border-gray-300 p-2 font-semibold"
      appendTo="self"
      style={{ width: "30vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      className="bg-[#F9F9FB] z-2 p-2.5 rounded-md"
      maskClassName="bg-[#1E1F24] bg-opacity-60"
    >
      <div className="flex flex-col">
        <div className="flex flex-col justify-center p-2">
          <div className="justify-start px-3 text-sm">
            <label
              htmlFor="firstName"
              className="text-left text-xs font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              id="firstName"
              name="firstName"
              value={updatedProfile.firstName}
              onChange={handleInputChange}
              type="text"
              className="w-full px-3 py-2 border-[#efefef] rounded-md my-4 outline-[#eeeeee] bg-[#e9eaeb]"
              placeholder="Enter first name"
            />

            <label
              htmlFor="email"
              className="text-left text-xs font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              value={updatedProfile.email}
              onChange={handleInputChange}
              type="email"
              className="w-full px-3 py-2 border-[#efefef] rounded-md my-4 outline-[#eeeeee] bg-[#e9eaeb]"
              placeholder="Enter email"
            />
            <label
              htmlFor="profilePicture"
              className="text-left text-xs font-medium text-gray-600"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleProfilePictureChange}
              className="w-full px-3 py-2 border-[#efefef] rounded-md my-4 outline-[#eeeeee] bg-[#e9eaeb]"
            />
            {updatedProfile.profilePicture && (
              <div className="flex justify-center mt-4">
                <img
                  src={updatedProfile.profilePicture}
                  alt="Profile Preview"
                  className="h-32 w-32 rounded-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full rounded-md px-10 md:p-2 bg-[#248E1D] text-white font-thin"
      >
        Update Profile
      </button>
    </Dialog>
  );
};

export default Profile;
