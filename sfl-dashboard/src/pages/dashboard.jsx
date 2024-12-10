import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { getAllMembers, getRoles } from "../api/apiService";

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [roles, setRoles] = useState([]);

  // Placeholder for member count over time data
  const [memberStats, setMemberStats] = useState({
    labels: [],
    data: [],
  });

  const fetchMembers = async () => {
    try {
      const response = await getAllMembers();
      setMembers(response.data);
      setMemberStats(generateMemberStats(response.data));
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

  useEffect(() => {
    fetchMembers();
    fetchRoles();
  }, []);

  const generateMemberStats = (membersData) => {
    // Replace with real member count over time data
    const labels = ["January", "February", "March", "April", "May"];
    const data = [10, 20, 30, 40, 50];
    return { labels, data };
  };

  const memberCountData = memberStats.labels.map((label, index) => ({
    month: label,
    count: memberStats.data[index],
  }));

  const roleDistribution = roles.reduce((acc, role) => {
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  const roleData = Object.keys(roleDistribution).map((role) => ({
    name: role,
    value: roleDistribution[role],
  }));

  return (
    <div className="p-3">
      <div className="mb-6 text-lg flex gap-4">
        <div className="w-64 p-4 bg-white shadow-md rounded-lg border border-gray-100">
          <h4 className="font-semibold text-md text-gray-500">
            Total Members: {members.length}
          </h4>
        </div>

        <div className="w-64 p-4 bg-white shadow-md rounded-lg border border-gray-100">
          <h4 className="font-semibold text-md text-gray-500">
            Total Roles: {roles.length}
          </h4>
        </div>
      </div>

      <div className="flex space-x-6">
        <div className="flex-1">
          <h3 className="font-semibold text-md mb-4">Member Count Over Time</h3>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <LineChart
              width={430}
              height={230}
              data={memberCountData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#338003" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        </div>

        <div className="flex-1 justify-center flex flex-col">
          <h3 className="font-semibold text-md mb-4">Roles Distribution</h3>
          <div className="bg-white rounded-lg shadow-sm py-4">
            <PieChart width={430} height={230}>
              <Pie
                data={roleData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#338003"
                label
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`#338003`} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
