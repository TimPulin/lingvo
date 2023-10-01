import { axiosInstanceVk as axios } from './axios-instance';

/* eslint-disable-next-line */
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoi0KLQtdC50LzRg9GA0LDQtyDQn9GD0LvQuNC9IiwiZW1haWwiOiJ0aW1wdXZrY29tQGdtYWlsLmNvbSIsImlhdCI6MTY5NjEwODQ4NywiZXhwIjoxNjk2MTk0ODg3fQ.o4qgqoZ7q_ZK6Jv6qjDUrG6P8_mn9vf7c0f8Wu38sho';
const url = `https://api.vk.com/method/users.get?access_token=${token}&v=5.103`;

export async function getVkUserInfo() {
  return axios
    .get(url)
    .then((response) => console.log(response));
}
