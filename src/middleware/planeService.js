import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
console.log("Plane Service Initialized");

export const planeService = {
  getPlanes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/planes`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving planes:", error);
      throw error;
    }
  },
  createPlane: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/planes`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating plane:", error);
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/planes/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving plane by ID:", error);
      throw error;
    }
  },
  updateById: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/planes/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating plane:", error);
      throw error;
    }
  },
  deleteById: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/planes/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting plane:", error);
      throw error;
    }
  },
};
