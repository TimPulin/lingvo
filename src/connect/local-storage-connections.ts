export function setLocalStorageUserToken(token:string) {
  localStorage.setItem('userToken', token);
}

export function getLocalStorageUserToken() {
  return localStorage.getItem('userToken');
}
