
import { baseAxiosClient } from "./apiClient"
// User Management Handlers
export const accReg = async (data) => {
  try {
    const response = await baseAxiosClient.post("/auth/register", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const accLogin = async (data) => {  
  try {
    const response = await baseAxiosClient.post("/auth/login", data);
    console.log("Login response", response)
    return response;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const response = await baseAxiosClient.post("/users", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllusers = async () => {
  try {
    const response = await baseAxiosClient.get("/users");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async () => {
  try {
    const response = await baseAxiosClient.get(`/users/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, data) => {
  try {
    const response = await baseAxiosClient.put(`/users/${userId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
}


export const deleteUser = async () => {
  try {
    const response = await baseAxiosClient.get(`/users/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};


// User Management Handlers
export const createMember = async (data) => {
  try {
    const response = await baseAxiosClient.post("/members", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export const getAllMembers = async () => {
  try {
    const response = await baseAxiosClient.get("/members");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMemberById = async () => {
  try {
    const response = await baseAxiosClient.get("/members");
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateMember= async (userId, data) => {
  try {
    const response = await baseAxiosClient.put(`/members/${userId}`, data);
    return response;
  } catch (error) {
    throw error;
  }
}


export const deleteMember = async () => {
  try {
    const response = await baseAxiosClient.get("/members");
    return response;
  } catch (error) {
    throw error;
  }
};


// Role Management Handlers
export const getRoles = async () => {
  try {
    const response = await baseAxiosClient.get("/roles");
    return response;
  } catch (error) {
    throw error;
  }
};