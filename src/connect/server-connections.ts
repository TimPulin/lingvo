import { axiosInstanceLingvo as axios } from './axios-instance';
import { CollectionFormType } from '../utils/types';

export function getAuthorizationVKToken() {
  return axios
    .get('/auth/login/')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => { throw new Error(error); });
}

export function getCollectionsList(token:string) {
  return axios
    .get('/collections', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => { throw new Error(error); });
}

export function getLanguagesList(token:string) {
  return axios
    .get('/languages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => { throw new Error(error); });
}

export function addCollection(token:string, collectionData:CollectionFormType) {
  console.log('key', token);

  return axios
    .post(
      'collections',
      {
        ...collectionData,
      },
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
}
