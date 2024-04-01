import axios from "axios";

const baseUrl = "http://127.0.0.1:6868";

export const getUser = async () => {
  try {
    const { data } = await axios.get(baseUrl + "/retrieve_lightlevelrec_table");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};