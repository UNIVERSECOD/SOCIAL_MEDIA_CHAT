import { BASE_URL } from "@/constants";
import axios from "axios";

export async function getUsers({ pageParam, search = "", sort = "" }) {
    try {
      const response = await axios.get(
        `${BASE_URL}/users?page=${pageParam}&search=${search}&sort=${sort}&limit=10`,
        {
          withCredentials: true,
        }
      );
      console.log("API Response:", response.data);

      return response.data;
     
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  export async function editUser(formData) {
    try {
      const resp = await axios.patch(`${BASE_URL}/user`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
    }
  }
  
  export async function getFriends() {
    try {
      const response = await axios.get(`${BASE_URL}/user/friends`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
  export async function getConversations() {
    try {
      const response = await axios.get(`${BASE_URL}/conversation`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
  