import React, { useState, useEffect } from "react";
import { deleteActivityLog, getAllActivityLog } from "../api/apiService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatDate } from "../utils/dateFormat";
import { Toaster, toast } from "sonner";
import { FaTrash } from "react-icons/fa6";

const ActivityLogs = () => {
  const [activities, setActivities] = useState([]);

  // Fetching activity logs from API
  const fetchActivityLogs = async () => {
    try {
      const response = await getAllActivityLog();
      const data = response.data; 
      setActivities(data);
    } catch (error) {
      toast.error("Failed to fetch activity logs.");
    }
  };

  // Handle deleting an activity log
  const handleDeleteActivityLog = async (actId) => {
    if (!actId) {
      toast.error("Activity ID is required to delete an activity.");
      return;
    }
    try {
      await deleteActivityLog(actId); 
      toast.success(`Activity ${actId} deleted successfully.`);
      fetchActivityLogs();
    } catch (error) {
      toast.error("Failed to delete the activity log.");
    }
  };

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <div className="flex items-center justify-between p-3 border-b">
        <h1 className="font-semibold text-[#0C8003] text-lg">Activity Logs</h1>
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
          emptyMessage="No activity logs found."
          value={activities}
        >
          <Column field="id" sortable header="Activity Id" />
          <Column field="userId" sortable header="User Id" />
          <Column field="action" sortable header="Action Description" />
          <Column
            field="timestamp"
            header="Timestamp"
            body={(rowData) => formatDate(rowData.timestamp)}
          />
          <Column
            field="createdAt"
            header="Created At"
            body={(rowData) => formatDate(rowData.createdAt)}
          />
          <Column
            field="Action"
            header="Actions"
            body={(rowData) => (
              <div className="flex items-center gap-3">
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteActivityLog(rowData.id)}
                />
              </div>
            )}
          />
        </DataTable>
      </div>
    </>
  );
};

export default ActivityLogs;
