import axios from "axios";
// This file is responsible for making API calls related to airports

const BASE_URL = import.meta.env.VITE_API_URL;

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
};