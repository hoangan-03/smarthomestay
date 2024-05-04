import axios from "axios";


const baseUrl = "https://smart-homestay-backend-f109bac03e4d.herokuapp.com";


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

export const getDetectionData = async () => {
  try {
    const { data } = await axios.get(baseUrl + "/camera_records");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};


// /camera_records