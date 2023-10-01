import { axiosInstanceLingvo as axios } from './axios-instance';

/* eslint-disable-next-line */
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoi0KLQtdC50LzRg9GA0LDQtyDQn9GD0LvQuNC9IiwiZW1haWwiOiJ0aW1wdXZrY29tQGdtYWlsLmNvbSIsImlhdCI6MTY5NjEwODQ4NywiZXhwIjoxNjk2MTk0ODg3fQ.o4qgqoZ7q_ZK6Jv6qjDUrG6P8_mn9vf7c0f8Wu38sho';

export function getAuthorizationVKToken() {
  return axios
    .get('/auth/login/')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getCollectionsList() {
  return axios
    .get('/collections', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
