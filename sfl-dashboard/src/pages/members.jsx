import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import Search from "../componets/Search";
import {
  createMember,
  deleteMember,
  getAllMembers,
  getRoles,
  updateMember,
} from "../api/apiService";
import { formatDate } from "../utils/dateFormat";
import { Toaster, toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
import { GoPencil } from "react-icons/go";
import { FaTrash } from "react-icons/fa6";

const Members = () => {
  const { user } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    dob: "",
    profilePicture: "",
    roleId: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const userId = user.id;

  const fetchMembers = async () => {
    try {
      const response = await getAllMembers();
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const showDialog = (actionType = "create", member = null) => {
    setDialogVisible(true);
    setIsEdit(actionType === "edit");

    if (actionType === "edit" && member) {
      setCurrentMember(member);
      setNewMember({
        name: member.name || "",
        email: member.email || "",
        roleId: member.roleId === 1 ? "admin" : "user",
        dob: member.dob ? formatDate(member.dob) : "",
        profilePicture: member.profilePicture,
      });
    } else {
      setNewMember({
        name: "",
        email: "",
        roleId: null,
        dob: "",
        profilePicture: null,
      });
    }
  };

  const hideDialog = () => {
    setDialogVisible(false);
    setNewMember({
      name: "",
      email: "",
      dob: "",
      profilePicture: "",
      roleId: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMember({ ...newMember, profilePicture: file });
    }
  };

  const handleRoleChange = (e) => {
    setNewMember({ ...newMember, roleId: e.value });
  };

  const handleSaveMember = async () => {
    const { name, email, roleId, dob, profilePicture } = newMember;

    if (!name || !email || !roleId || !dob || !profilePicture) {
      toast.info("Please fill out all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("roleId", roleId);
    formData.append("dob", dob);
    formData.append("userId", userId);

    if (profilePicture && typeof profilePicture === "object") {
      formData.append("file", profilePicture);
    } else if (!profilePicture) {
      formData.append("file", "");
    }

    try {
      if (isEdit && currentMember) {
        const response = await updateMember(currentMember.id, formData);
        console.log("Updated member response:", response);
        if (response.status === 200) {
          setMembers((prev) =>
            prev.map((m) => (m.id === currentMember.id ? response.data : m))
          );
          toast.success(`${newMember.name} updated successfully!`);
        }
      fetchMembers();
      } else {
        const response = await createMember(formData);
        if (response.status === 201) {
          setMembers([...members, response.data]);
          toast.success(`${newMember.name} created successfully!`);
        }
      fetchMembers();
      }
      hideDialog();
    } catch (error) {
      console.error("Error saving member:", error);
      toast.error(
        `An error occurred while ${
          isEdit ? "updating" : "creating"
        } the member. Please try again.`
      );
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredMembers = members.filter((member) => {
    return (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDeleteMember = async (memberId) => {
    if (!memberId) {
      toast.error("Member ID is required to delete a member.");
      return;
    }

    try {
      await deleteMember(memberId);
      toast.success(`Member ${memberId} deleted successfully.`);
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error(
        `Failed to delete member ${memberId}. ${
          error?.response?.data?.message || error.message
        }`
      );
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchRoles();
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <div className="flex items-center justify-between p-3 border-b">
        <h1 className="font-semibold text-[#0C8003] text-lg">Members</h1>
        <div className="flex items-center justify-end gap-2">
          <div className="flex flex-row items-center justify-end space-x-3">
            <Search onSearchChange={handleSearch} />
            <div>
              <Button
                onClick={() => showDialog("create")}
                className="rounded-md p-1 text-white text-sm gap-2 md:p-2 bg-[#0C8003]"
              >
                <i className="pi pi-plus"></i>
                <span>Create Member</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <DataTable
          stripedRows
          paginator
          rows={5}
          dataKey="id"
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ width: "full" }}
          scrollable
          scrollHeight="280px"
          emptyMessage="No Members found."
          value={filteredMembers}
        >
          <Column field="name" sortable  header="Full Name" />
          <Column field="email" sortable  header="Email" />
          <Column field="dob" sortable  header="Date of Birth" />
          <Column
            field="createdAt"
            sortable 
            header="Created Date"
            body={(rowData) => formatDate(rowData.createdAt)}
          />
          <Column
            field="profilePicture"
            header="Profile Picture"
            body={(rowData) => (
              <img
                src={
                  rowData.profilePicture.startsWith("http")
                    ? rowData.profilePicture
                    : `http://localhost:8081/uploads/${rowData.profilePicture}`
                }
                alt={rowData.name}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
          />
          <Column
            field="Action"
            header="Actions"
            body={(rowData) => (
              <div className="flex items-center gap-3">
                <GoPencil
                  className="text-gray-500 cursor-pointer"
                  onClick={() => showDialog("edit", rowData)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteMember(rowData.id)}
                />
              </div>
            )}
          />
        </DataTable>

        <Dialog
          visible={isDialogVisible}
          onHide={hideDialog}
          header={isEdit ? "Edit Member" : "Create Member"}
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
                <div className="flex justify-between gap-2">
                  <div className="w-1/2">
                    <label
                      htmlFor="name"
                      className="text-left text-xs font-medium text-gray-600"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={newMember.name}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full px-3 py-2 border-[#efefef] rounded-md my-4 outline-[#eeeeee] bg-[#e9eaeb]"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="email"
                      className="text-left text-xs font-medium text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      value={newMember.email}
                      onChange={handleInputChange}
                      type="email"
                      className="w-full px-3 py-2 border-[#efefef] rounded-md my-4 outline-[#eeeeee] bg-[#e9eaeb]"
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-2">
                  <div className="w-1/2 relative">
                    <label
                      htmlFor="dob"
                      className="text-left text-xs font-medium text-gray-600"
                    >
                      Date of Birth
                    </label>
                    <Calendar
                      id="dob"
                      name="dob"
                      value={newMember.dob}
                      onChange={(e) =>
                        setNewMember({ ...newMember, dob: e.value })
                      }
                      showIcon
                      dateFormat="yy-mm-dd"
                      className="w-full px-3 py-2  rounded-md my-4 bg-[#e9eaeb]"
                      panelClassName="z-50 bg-white"
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="roleId"
                      className="text-left text-xs font-medium text-gray-600"
                    >
                      Role
                    </label>
                    <Dropdown
                      id="roleId"
                      value={newMember.roleId || ""}
                      options={roles.map((role) => ({
                        label: role.name,
                        value: role.id,
                      }))}
                      onChange={handleRoleChange}
                      placeholder="Select Role"
                      className="w-full px-3 py-2 border-[#efefef] rounded-md my-4 outline-[#eeeeee] bg-[#e9eaeb]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="profilePicture"
                    className="text-left text-xs font-medium text-gray-600"
                  >
                    Profile Picture
                  </label>
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border-[#efefef] rounded-md my-4 outline-[#eeeeee] bg-[#e9eaeb]"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleSaveMember}
            className="w-full rounded-md px-10 md:p-2 bg-[#248E1D] text-white font-thin"
          >
            {isEdit ? "Update Member" : "Create Member"}
          </button>
        </Dialog>
      </div>
    </>
  );
};

export default Members;
