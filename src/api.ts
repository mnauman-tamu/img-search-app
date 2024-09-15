const BASE_URL = 'https://api.imgur.com';

const getHeader = () => ({
  Authorization: `Client-ID ${import.meta.env.VITE_CLIENT_ID}`,
})

export const fetchData = async (endpoint: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        headers: getHeader(),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};