import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar"; // For Date Picker
import Search from "../componets/Search";
import { createUser, getAllusers } from "../api/apiService";
import { formatDate } from "../utils/dateFormat";

const roleMapping = {
  1: "Admin",
  2: "User",
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    dob: null,
    email: "",
    roleId: null,
  });

  // Role options for the dropdown
  const roleOptions = [
    { label: "Admin", value: 1 },
    { label: "User", value: 2 },
  ];

  const fetchUsers = async () => {
    try {
      const response = await getAllusers();
      const fetchedUsers = response.data.map((user) => ({
        ...user,
        role: roleMapping[user.roleId],
      }));
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Open dialog
  const showDialog = () => {
    setDialogVisible(true);
  };

  // Close dialog
  const hideDialog = () => {
    setDialogVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      const userPayload = {
        name: newUser.name.trim(),
        username: newUser.username.trim(),
        email: newUser.email,
        roleId: newUser.roleId,
        dob: newUser.dob ? newUser.dob.toISOString() : null,
      };

      if (
        !userPayload.name ||
        !userPayload.username ||
        !userPayload.email ||
        !userPayload.roleId
      ) {
        console.error("Please fill in all required fields.");
        return;
      }

      const resp = await createUser(userPayload);

      if (resp && resp.data) {
        setUsers([
          ...users,
          { ...userPayload, role: roleMapping[userPayload.roleId] },
        ]);
        hideDialog();
      } else {
        console.error("User creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleSearch = () => {};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between p-3 border-b">
        <h1 className="font-semibold text-[#0C8003] text-lg">Users</h1>
        <div className="flex items-center justify-end gap-2">
          <div className="flex flex-row items-center justify-end space-x-3">
            <Search onSearchChange={handleSearch} />
            <div>
              {/* <Button
                onClick={showDialog}
                className="rounded-md p-1 text-white text-sm gap-2 md:p-2 bg-[#0C8003]"
              >
                <i className="pi pi-plus"></i>
                <span>Create User</span>
              </Button> */}
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
          emptyMessage="No Users found."
          value={users}
        >
          <Column field="name" header="Full Name" />
          <Column field="username" header="Username" />
          <Column field="role" header="Role" />
          <Column field="email" header="Email" />
          <Column
            field="createdAt"
            header="Created Date"
            body={(rowData) => formatDate(rowData.createdAt)}
          />
        </DataTable>

        {/* Dialog for Creating New User */}
        {/* <Dialog
          visible={dialogVisible}
          onHide={hideDialog}
          header="Create New User"
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
                      htmlFor="fullName"
                      className="text-left text-xs font-medium text-gray-600"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      value={newUser.fullName}
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
                      value={newUser.email}
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
                      htmlFor="username"
                      className="text-left text-xs font-medium text-gray-600"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      value={newUser.username}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full px-3 py-2 border-[#efefef] rounded-md my-4 outline-[#eeeeee] bg-[#e9eaeb]"
                      placeholder="Enter username"
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
                      name="roleId"
                      value={newUser.roleId}
                      options={roleOptions}
                      onChange={handleInputChange}
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Select Role"
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-2">
                  <div className="w-full">
                    <label
                      htmlFor="dob"
                      className="text-left text-xs font-medium text-gray-600"
                    >
                      Date of Birth
                    </label>
                    <Calendar
                      id="dob"
                      name="dob"
                      value={newUser.dob}
                      onChange={handleInputChange}
                      showIcon
                      dateFormat="yy-mm-dd"
                      className="w-full px-3 py-2  rounded-md my-4 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleCreateUser}
            className="w-full rounded-md px-10 md:p-2 bg-[#248E1D] text-white font-thin"
          >
            Create User
          </button>
        </Dialog> */}
      </div>
    </>
  );
};

export default Users;
