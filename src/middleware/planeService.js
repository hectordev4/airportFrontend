import axios from "axios";
// This file is responsible for making API calls related to planes

const BASE_URL = import.meta.env.VITE_API_URL;

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
};