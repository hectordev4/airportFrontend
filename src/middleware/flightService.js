import axios from "axios";
// This file is responsible for making API calls related to flights


const BASE_URL = import.meta.env.VITE_API_URL;

const flightService = {
  getFlights: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/flights`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving flights:", error);
      throw error;
    }
  },
};