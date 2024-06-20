import axios from 'axios';

const API_URL = 'https://reqres.in/api/users'; // Provided API endpoint

const fetchData = async (page = 1, perPage = 5) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page, per_page: perPage },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchData;






