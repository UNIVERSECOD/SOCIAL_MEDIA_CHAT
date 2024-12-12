import { BASE_URL } from "@/constants";
import axios from "axios";

export async function getAllFriends({ pageParam, search = "", sort = "" }) {
  try {
    const response = await axios.get(`${BASE_URL}/friendship`, {
      params: {
        page: pageParam,
        search,
        sort,
        limit: 3,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error.message }; 
  }
}

export const sendFriendRequest = async (friendId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/friendship/add/${friendId}`, {},
      { withCredentials: true }
    );
    console.log('Friend request sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending friend request:', error.response?.data || error.message);
    throw error; 
  }
};

export async function getFriendRequests(pageParam) {
  try {
    const response = await axios.get(
      `${BASE_URL}/friendship/requests?page=${pageParam}`,  
      {
        withCredentials: true,
      }
    );
    console.log("Friend Requests:", response.data);
    return response.data;  
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred while fetching friend requests.";
    console.error('Error fetching friend requests:', errorMessage);
    return { error: errorMessage };  
  }
}


export const acceptFriendRequest = async (requestId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/friendship/${requestId}/accept`, 
      {},
      { withCredentials: true }
    );
    if (!requestId) {
      throw new Error("Invalid requestId");
    }
    console.log('Friend request accepted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error accepting friend request:', error.response?.data || error.message);
    throw error; 
  }
};


export const rejectFriendRequest = async (requestId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/friendship/${requestId}/reject`,
      {},
      { withCredentials: true }
    );
    console.log('Friend request rejected:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error rejecting friend request:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to reject friend request");
  }
};

export const removeFromFriends = async (userId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/friendship/remove/${userId}`, 
      {},
      { withCredentials: true }
    );
    console.log('Friendship removed:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error removing friendship:', error.response?.data || error.message);
    throw error;
  }
};

export const retractFriendRequest = async (friendId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/friendship/${friendId}/retract`,
      { withCredentials: true }
    );
    console.log('Friend request retracted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retracting friend request:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to retract friend request");
  }
};
