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

  // export async function updateUser( ){
  //   try{
  //     const response = await axios.put(`${BASE_URL}/user`,formData,
  //       {
  //         withCredentials: true,
  //       }

  //     );
  //     console.log("API Response:", response.data);
  //     return response.data;
  //   }catch (error) {
  //     console.error(error);
  //   }
  // }