const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-1',
  headers: {
    'authorization': '0ce1a348-f8e4-4fce-80c6-e6b193b8791b'
  }
}

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserData = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  }).then(getResponse)
}

export const getUserCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  }).then(getResponse)
}
