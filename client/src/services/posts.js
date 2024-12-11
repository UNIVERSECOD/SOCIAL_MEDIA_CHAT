import { BASE_URL } from "@/constants";
import axios from "axios";

export async function getPosts({ pageParam, search = "", sort = "" }) {
  try {
    const response = await axios.get(
      `${BASE_URL}/post?page=${pageParam}&search=${search}&sort=${sort}&limit=3`,
      {
        withCredentials: true,
      }
    );
    
    return response.data;
   
  } catch (error) {
    console.error(error);
    return {};
  }
}



export async function createPost({ data }) {
  try {
    const response = await axios.post(`${BASE_URL}/post`, data, {
      withCredentials: true,
    });
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Client-side error:', error.response?.data || error.message);
    return {};
  }
}


export async function editPost({ id, data }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.put(`${BASE_URL}/post/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function deletePost({ id }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await axios.delete(`${BASE_URL}/post/${id}`,  {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function likePost({ id }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.post(`${BASE_URL}/post/${id}/like`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function dislikePost({ id }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.post(`${BASE_URL}/posts/${id}/dislike`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function getPostComments({ postId }) {
  try {
    const response = await axios.get(`${BASE_URL}/comments/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function createPostComment({ postId, content }) {
  try {
    const response = await axios.post(`${BASE_URL}/comments/${postId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function deletePostComment({ postId, commentId }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await axios.delete(
      `${BASE_URL}/comments/${postId}/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function editPostComment({ postId, commentId, content }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await axios.put(
      `${BASE_URL}/comments/${postId}/${commentId}`,
      {
        content,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
