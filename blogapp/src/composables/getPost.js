import axios from 'axios';

const API_URL = 'http://localhost:3000/posts';

export const usePost = () => {
  const fetchPost = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error; // This will propagate the error
    }
  };

  return {
    fetchPost
  };
};
