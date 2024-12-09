import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import Search from "../componets/Search";
import { createMember, getAllMembers, getRoles } from "../api/apiService";
import { formatDate } from "../utils/dateFormat";
import { Toaster, toast } from "sonner";
import { AuthContext } from "../context/AuthContext";

const Members = () => {
  const { user } = useContext(AuthContext);

  const [members, setMembers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    dob: "",
    profilePicture: "",
    roleId: null,
  });

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

  const showDialog = () => {
    setDialogVisible(true);
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

  const handleCreateMember = async () => {
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
    formData.append("file", profilePicture);

    try {
      const response = await createMember(formData);

      if (response.status === 201) {
        setMembers([...members, response.data]);
        toast.success("Member created successfully!");
        hideDialog();
      } else {
        toast.error("Failed to create member.");
      }
    } catch (error) {
      console.error("Error creating member:", error);
      toast.error(
        "An error occurred while creating the member. Please try again."
      );
    }
  };

  const handleSearch = () => {};

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
                onClick={showDialog}
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
          value={members}
        >
          <Column field="name" header="Full Name" />
          <Column field="email" header="Email" />
          <Column field="dob" header="Date of Birth" />
          <Column
            field="createdAt"
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
        </DataTable>

        <Dialog
          visible={dialogVisible}
          onHide={hideDialog}
          header="Create New Member"
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
                  <div className="w-1/2">
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
                      className="w-full px-3 py-2 border-[#efefef] rounded-md my-4 outline-[#eeeeee] bg-[#e9eaeb] z-100"
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
                      value={newMember.roleId}
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
            onClick={handleCreateMember}
            className="w-full rounded-md px-10 md:p-2 bg-[#248E1D] text-white font-thin"
          >
            Create Member
          </button>
        </Dialog>
      </div>
    </>
  );
};

export default Members;
