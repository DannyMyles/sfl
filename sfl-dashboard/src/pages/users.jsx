import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Search from "../componets/Search";

const generateDummyUsers = () => {
  const users = [];
  for (let i = 1; i <= 20; i++) {
    users.push({
      fullName: `User ${i}`,
      role: i % 2 === 0 ? "Admin" : "User",
      dob: `199${i % 3}-01-01`,
      email: `user${i}@example.com`,
    });
  }
  return users;
};

const Users = () => {
  const [users, setUsers] = useState(generateDummyUsers());
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    role: "User",
    dob: "",
    email: "",
  });

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

  const handleCreateUser = () => {
    setUsers([...users, newUser]);
    hideDialog();
  };

  const handleSearch = () => {};

  return (
    <>
      <div className="flex items-center justify-between p-3 border-b">
        <h1 className="font-semibold text-[#0C8003] text-lg">Users</h1>
        <div className="flex items-center justify-end gap-2">
          <div className="flex flex-row items-center justify-end space-x-3">
            <Search onSearchChange={handleSearch} />
            <div>
              <Button
                onClick={showDialog}
                className=" rounded-md p-1 text-white text-sm gap-2 md:p-2 bg-[#0C8003]"
              >
                <i className="pi pi-plus"></i>
                <span>Create User</span>
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
          dataKey="locationId"
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ width: "full" }}
          scrollable
          scrollHeight="280px"
          emptyMessage="No Locations found."
          value={users}
        >
          <Column field="fullName" header="Full Name" />
          <Column field="role" header="Role" />
          <Column
            field="dob"
            header="Date of Birth"
            body={(rowData) => new Date(rowData.dob).toLocaleDateString()}
          />
          <Column field="email" header="Email" />
        </DataTable>

        {/* Dialog for Creating New User */}
        <Dialog
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
                      htmlFor="role"
                      className="text-left text-xs font-medium text-gray-600"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={newUser.role}
                      onChange={handleInputChange}
                      className="p-dropdown p-component"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Moderator">Moderator</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="dob"
                      className="text-left text-xs font-medium text-gray-600"
                    >
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      name="dob"
                      value={newUser.dob}
                      onChange={handleInputChange}
                      type="date"
                      className="w-full px-3 py-2 border-[#efefef] rounded-md my-4 outline-[#eeeeee] bg-[#e9eaeb]"
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
            Create Product
          </button>
        </Dialog>
      </div>
    </>
  );
};

export default Users;
