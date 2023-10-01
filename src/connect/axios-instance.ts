import axios from 'axios';

const API_BASE_URL = 'https://api.lingvocards.space/api/v1';
const API_VK_URL = 'https://api.vk.com/method';

export const axiosInstanceLingvo = axios.create({
  baseURL: API_BASE_URL,
});

export const axiosInstanceVk = axios.create({
  baseURL: API_VK_URL,
});
