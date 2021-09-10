const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-1',
  headers: {
    'authorization': '0ce1a348-f8e4-4fce-80c6-e6b193b8791b',
    'Content-Type': 'application/json'
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

export const addCard = (cardName, cardLink) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  }).then(getResponse)
}

export const deleteCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then((res) => {
    if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
  })
}
