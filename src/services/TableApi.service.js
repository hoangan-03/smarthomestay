import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";

export const getLightData = async () => {
  try {
    const { data } = await axios.get(baseUrl + "/light_level_records");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTempData = async () => {
  try {
    const { data } = await axios.get(baseUrl + "/temperature_records");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getHumidityData = async () => {
  try {
    const { data } = await axios.get(baseUrl + "/humidity_records");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};