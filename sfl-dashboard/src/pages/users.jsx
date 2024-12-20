import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Search from "../componets/Search";
import { getAllusers } from "../api/apiService";
import { formatDate } from "../utils/dateFormat";

const roleMapping = {
  1: "Admin",
  2: "User",
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filterUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  });


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
          value={filterUsers}
        >
          <Column field="name" sortable  header="Full Name" />
          <Column field="username" sortable  header="Username" />
          <Column field="role" sortable  header="Role" />
          <Column field="email" sortable  header="Email" />
          <Column
            field="createdAt"
            header="Created Date"
            body={(rowData) => formatDate(rowData.createdAt)}
          />
        </DataTable>
      </div>
    </>
  );
};

export default Users;
