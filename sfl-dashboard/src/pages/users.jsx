import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

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

  return (
    <div className="p-4">
      <h1 className="font-semibold text-[#0C8003] text-lg mb-4">User List</h1>

      <Button label="Create User" icon="pi pi-plus" onClick={showDialog} className="mb-4" />

      <DataTable value={users} paginator rows={10}>
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
        footer={
          <div>
            <Button label="Cancel" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
            <Button label="Create" icon="pi pi-check" onClick={handleCreateUser} autoFocus />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              value={newUser.fullName}
              onChange={handleInputChange}
              type="text"
              className="p-inputtext p-component"
              placeholder="Enter full name"
            />
          </div>
          <div className="p-field">
            <label htmlFor="role">Role</label>
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
          <div className="p-field">
            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              name="dob"
              value={newUser.dob}
              onChange={handleInputChange}
              type="date"
              className="p-inputtext p-component"
            />
          </div>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              type="email"
              className="p-inputtext p-component"
              placeholder="Enter email"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Users;
