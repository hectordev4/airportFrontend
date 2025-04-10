import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
console.log("Flight Service Initialized");

export const flightService = {
  getFlights: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/flights`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving flights:", error);
      throw error;
    }
  },
  createFlight: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/flights`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating flight:", error);
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/flights/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving flight by ID:", error);
      throw error;
    }
  },
  updateById: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/flights/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating flight:", error);
      throw error;
    }
  },
  deleteById: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/flights/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting flight:", error);
      throw error;
    }
  },
};
