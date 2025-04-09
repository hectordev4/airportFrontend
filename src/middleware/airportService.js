import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
console.log("Airport Service Initialized");

export const airportService = {
    
  getAirports: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/airports`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving airports:", error);
      throw error;
    }
  },
  createAirport: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/airports`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating airport:", error);
      throw error;
    }
  },
  updateAirport: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/airports/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating airport:", error);
      throw error;
    }
  },
  deleteAirport: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/airports/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting airport:", error);
      throw error;
    }
  },
};