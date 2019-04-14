import { apiFetch } from './api'

export const getCharacters = () => {
  return apiFetch('characters')
  .then(response => response.json())
}

export const getHouses = () => {
  return apiFetch('houses')
  .then(response => response.json())
}

export const generalGet = (param) => {
  return apiFetch(param)
  .then(response => response.json())
}




