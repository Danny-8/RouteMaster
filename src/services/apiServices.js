import api from '../api';

export const getData = async () => {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postItem = async (data) => {
  try {
    const response = await api.post("/data", data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/data/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const identifyItem = async (id) => {
  try {
    const response = await api.get(`/identify/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};