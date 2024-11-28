export const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
    throw new Error('API_URL is not defined in the environment variables.');
  }