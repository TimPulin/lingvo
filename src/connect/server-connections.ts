import { axiosInstanceLingvo as axios } from './axios-instance';
import { CollectionFormType, NewWordType } from '../utils/types';

// export function getAuthorizationVKToken() {
//   return axios
//     .get('/auth/login/')
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => { throw new Error(error); });
// }

export function getUserData(token:string) {
  return axios
    .get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export function editCollection(token:string, collectionId:number, collectionData:CollectionFormType) {
  return axios
    .post(
      `/collections/${collectionId}`,
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

export function deleteCollection(token:string, collectionId:number) {
  return axios
    .delete(
      `/collections/${collectionId}`,
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

export function editCard(token:string, collectionId:number, cardId:number, newWord:NewWordType) {
  return axios
    .post(
      `/collections/${collectionId}/bind/${cardId}`,
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

export function deleteCard(token:string, cardId:number) {
  return axios
    .delete(
      `/binds/${cardId}`,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
}
