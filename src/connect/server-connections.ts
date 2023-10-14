import { axiosInstanceLingvo as axios } from './axios-instance';
import { CollectionFormType, NewWordType } from '../utils/types';

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
    });
}

export function getLanguagesList(token:string) {
  return axios
    .get('/languages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}

export function getCardsCollection(token:string, collectionId:number) {
  return axios
    .get(`/collections/${collectionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}

export function addCollection(token:string, collectionData:CollectionFormType) {
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

export function addCard(token:string, collectionId:number, newWord:NewWordType) {
  return axios
    .post(
      `/collections/${collectionId}/bind`,
      {
        ...newWord,
      },
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
}

export function editCard(token:string, id:number, newWord:NewWordType) {
  return axios
    .post(
      `/collections/${id}/bind`,
      {
        ...newWord,
      },
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
}
